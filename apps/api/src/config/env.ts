import dotenv from 'dotenv';
import { existsSync } from 'fs';
import path from 'path';

const envPaths = [
  process.env.DOTENV_CONFIG_PATH,
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../../.env'),
  path.resolve(__dirname, '../../../../.env'),
].filter((envPath): envPath is string => Boolean(envPath));

const existingEnvPaths = [...new Set(envPaths)].filter((candidate) => existsSync(candidate));

if (existingEnvPaths.length > 0) {
  for (const envPath of existingEnvPaths) {
    dotenv.config({ path: envPath });
  }
} else {
  dotenv.config();
}
