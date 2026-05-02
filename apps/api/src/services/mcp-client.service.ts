import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn, ChildProcess } from 'child_process';
import logger from '../config/logger';
import { AppError } from '../middleware/error.middleware';

export interface MCPServerConfig {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
}

export interface DrugInfo {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  category: string;
  description: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  dosageForm: string;
  strength: string;
  route: string;
  frequency: string;
  duration?: string;
  warnings: string[];
  pregnancyCategory?: string;
  lactationSafety?: string;
}

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  description: string;
  clinicalEffects: string;
  management: string;
}

export interface DosageValidation {
  valid: boolean;
  message: string;
  recommendations?: any[];
}

/**
 * MCP Client Service
 * Manages connections to MCP servers and provides methods to call their tools
 */
class MCPClientService {
  private clients: Map<string, { client: Client; process: ChildProcess }> = new Map();

  /**
   * Connect to an MCP server
   */
  async connect(config: MCPServerConfig): Promise<void> {
    if (this.clients.has(config.name)) {
      logger.warn(`MCP client already connected: ${config.name}`);
      return;
    }

    try {
      // Spawn the MCP server process
      const serverProcess = spawn(config.command, config.args, {
        env: { ...process.env, ...config.env },
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      // Handle process errors
      serverProcess.on('error', (error) => {
        logger.error(`MCP server process error (${config.name}):`, error);
      });

      serverProcess.stderr?.on('data', (data) => {
        logger.debug(`MCP server stderr (${config.name}): ${data.toString()}`);
      });

      // Create MCP client
      const client = new Client(
        {
          name: `afiyapulse-${config.name}-client`,
          version: '1.0.0',
        },
        {
          capabilities: {},
        }
      );

      // Connect via stdio transport
      const transport = new StdioClientTransport({
        command: config.command,
        args: config.args,
        env: config.env,
      });

      await client.connect(transport);

      // Store client and process
      this.clients.set(config.name, { client, process: serverProcess });

      logger.info(`Connected to MCP server: ${config.name}`);
    } catch (error) {
      logger.error(`Failed to connect to MCP server (${config.name}):`, error);
      throw new AppError(`Failed to connect to ${config.name} MCP server`, 500);
    }
  }

  /**
   * Disconnect from an MCP server
   */
  async disconnect(serverName: string): Promise<void> {
    const connection = this.clients.get(serverName);
    if (!connection) {
      return;
    }

    try {
      await connection.client.close();
      connection.process.kill();
      this.clients.delete(serverName);
      logger.info(`Disconnected from MCP server: ${serverName}`);
    } catch (error) {
      logger.error(`Error disconnecting from MCP server (${serverName}):`, error);
    }
  }

  /**
   * Disconnect from all MCP servers
   */
  async disconnectAll(): Promise<void> {
    const disconnectPromises = Array.from(this.clients.keys()).map((name) =>
      this.disconnect(name)
    );
    await Promise.all(disconnectPromises);
  }

  /**
   * Call a tool on an MCP server
   */
  private async callTool(
    serverName: string,
    toolName: string,
    args: Record<string, any>
  ): Promise<any> {
    const connection = this.clients.get(serverName);
    if (!connection) {
      throw new AppError(`MCP server not connected: ${serverName}`, 500);
    }

    try {
      const result = await connection.client.callTool({
        name: toolName,
        arguments: args,
      });

      if (result.isError) {
        throw new Error(result.content[0]?.text || 'Unknown MCP error');
      }

      // Parse JSON response
      const responseText = result.content[0]?.text;
      if (!responseText) {
        throw new Error('Empty response from MCP server');
      }

      return JSON.parse(responseText);
    } catch (error) {
      logger.error(`MCP tool call error (${serverName}.${toolName}):`, error);
      throw new AppError(`Failed to call ${toolName} on ${serverName}`, 500);
    }
  }

  /**
   * Search for drugs
   */
  async searchDrugs(
    query: string,
    category?: string,
    limit?: number
  ): Promise<DrugInfo[]> {
    const result = await this.callTool('drug-database', 'search_drugs', {
      query,
      category,
      limit,
    });
    return result.drugs || [];
  }

  /**
   * Get detailed drug information
   */
  async getDrugInfo(drugId: string): Promise<DrugInfo> {
    return await this.callTool('drug-database', 'get_drug_info', { drugId });
  }

  /**
   * Check drug interactions
   */
  async checkDrugInteractions(drugIds: string[]): Promise<{
    interactions: DrugInteraction[];
    summary: string;
  }> {
    const result = await this.callTool('drug-database', 'check_interactions', {
      drugs: drugIds,
    });
    return {
      interactions: result.interactions || [],
      summary: result.summary || 'No interactions found',
    };
  }

  /**
   * Validate dosage
   */
  async validateDosage(params: {
    drugId: string;
    dose: number;
    unit: string;
    frequency: string;
    patientAge: number;
    patientWeight?: number;
    indication?: string;
  }): Promise<DosageValidation> {
    const result = await this.callTool('drug-database', 'validate_dosage', params);
    return result.validation;
  }

  /**
   * Get drug categories
   */
  async getDrugCategories(): Promise<string[]> {
    const result = await this.callTool('drug-database', 'get_categories', {});
    return result.categories || [];
  }

  /**
   * Initialize all MCP servers
   */
  async initializeServers(): Promise<void> {
    // Drug Database MCP Server
    await this.connect({
      name: 'drug-database',
      command: 'node',
      args: [
        './apps/mcp-servers/drug-database/dist/index.js',
      ],
    });

    logger.info('All MCP servers initialized');
  }

  /**
   * Check if a server is connected
   */
  isConnected(serverName: string): boolean {
    return this.clients.has(serverName);
  }

  /**
   * Get list of connected servers
   */
  getConnectedServers(): string[] {
    return Array.from(this.clients.keys());
  }
}

export default new MCPClientService();

// Made with Bob
