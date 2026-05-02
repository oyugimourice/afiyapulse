# Consultation Recording Infrastructure

## Overview

The consultation recording infrastructure provides real-time audio capture, transcription, and WebSocket-based communication for clinical consultations in AfiyaPulse.

## Architecture

### Components

1. **Consultation Service** (`apps/api/src/services/consultation.service.ts`)
   - Manages consultation lifecycle (create, update, complete)
   - Handles transcript storage and retrieval
   - Enforces access control

2. **Storage Service** (`apps/api/src/services/storage.service.ts`)
   - AWS S3 integration for audio file storage
   - Supports both full file uploads and chunked streaming
   - Generates presigned URLs for secure access

3. **Watson Service** (`apps/api/src/services/watson.service.ts`)
   - IBM Watson Speech-to-Text integration
   - Real-time audio transcription
   - Speaker diarization support
   - Medical terminology optimization

4. **WebSocket Server** (`apps/api/src/websocket/`)
   - Real-time bidirectional communication
   - Event-based architecture
   - Authenticated connections with JWT

## API Endpoints

### REST Endpoints

#### Create Consultation
```http
POST /api/consultations
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientId": "patient_id"
}
```

#### Get Consultation
```http
GET /api/consultations/:id
Authorization: Bearer <token>
```

#### Update Consultation
```http
PATCH /api/consultations/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "COMPLETED",
  "audioUrl": "https://...",
  "duration": 1800
}
```

#### Complete Consultation
```http
POST /api/consultations/:id/complete
Authorization: Bearer <token>
```

#### Upload Audio File
```http
POST /api/consultations/:id/upload-audio
Authorization: Bearer <token>
Content-Type: multipart/form-data

audio: <audio file>
transcribe: true|false (optional)
```

#### Stream Audio Chunk
```http
POST /api/consultations/:id/stream-audio
Authorization: Bearer <token>
Content-Type: multipart/form-data

audioChunk: <audio chunk>
chunkIndex: <number>
```

#### Get Transcripts
```http
GET /api/consultations/:id/transcripts
Authorization: Bearer <token>
```

#### Add Transcript
```http
POST /api/consultations/:id/transcripts
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Patient reports headache",
  "speaker": "DOCTOR|PATIENT|SYSTEM",
  "confidence": 0.95
}
```

## WebSocket Events

### Connection

```javascript
const socket = io('http://localhost:4000', {
  auth: {
    token: 'jwt_token'
  }
});

socket.on('connected', (data) => {
  console.log('Connected:', data.userId);
});
```

### Consultation Events

#### Start Consultation
```javascript
socket.emit('consultation:start', {
  consultationId: 'consultation_id'
});

socket.on('consultation:started', (data) => {
  console.log('Consultation started:', data);
});
```

#### Stop Consultation
```javascript
socket.emit('consultation:stop', {
  consultationId: 'consultation_id'
});

socket.on('consultation:stopped', (data) => {
  console.log('Consultation stopped:', data);
});
```

#### Pause/Resume Consultation
```javascript
socket.emit('consultation:pause', {
  consultationId: 'consultation_id'
});

socket.emit('consultation:resume', {
  consultationId: 'consultation_id'
});
```

#### Get Consultation Status
```javascript
socket.emit('consultation:status', {
  consultationId: 'consultation_id'
});

socket.on('consultation:status:response', (data) => {
  console.log('Status:', data.status);
});
```

### Transcript Events

#### Stream Audio for Transcription
```javascript
socket.emit('transcript:stream-audio', {
  consultationId: 'consultation_id',
  audioChunk: arrayBuffer,
  chunkIndex: 0
});

socket.on('transcript:updated', (data) => {
  console.log('New transcript:', data.transcript);
});

socket.on('transcript:chunk-processed', (data) => {
  console.log('Chunk processed:', data.chunkIndex);
});
```

#### Add Manual Transcript
```javascript
socket.emit('transcript:add', {
  consultationId: 'consultation_id',
  text: 'Patient reports symptoms',
  speaker: 'DOCTOR'
});

socket.on('transcript:added', (data) => {
  console.log('Transcript added:', data.transcript);
});
```

#### Get All Transcripts
```javascript
socket.emit('transcript:get-all', {
  consultationId: 'consultation_id'
});

socket.on('transcript:all', (data) => {
  console.log('Transcripts:', data.transcripts);
});
```

#### Edit Transcript
```javascript
socket.emit('transcript:edit', {
  consultationId: 'consultation_id',
  transcriptId: 'transcript_id',
  newText: 'Corrected text'
});

socket.on('transcript:edited', (data) => {
  console.log('Transcript edited:', data);
});
```

### Agent Events

#### Update Agent Status
```javascript
socket.emit('agent:status-update', {
  consultationId: 'consultation_id',
  agentStatus: {
    agentId: 'scribe_agent',
    agentType: 'SCRIBE',
    status: 'PROCESSING',
    progress: 50,
    message: 'Generating SOAP note'
  }
});

socket.on('agent:status:updated', (data) => {
  console.log('Agent status:', data.agentStatus);
});
```

#### Trigger Agent
```javascript
socket.emit('agent:trigger', {
  consultationId: 'consultation_id',
  agentType: 'SCRIBE'
});

socket.on('agent:triggered', (data) => {
  console.log('Agent triggered:', data);
});
```

#### Document Generated
```javascript
socket.on('document:generated', (data) => {
  console.log('Document type:', data.documentType);
  console.log('Document:', data.document);
});
```

## Error Handling

All WebSocket events can emit errors:

```javascript
socket.on('consultation:error', (error) => {
  console.error('Consultation error:', error.message);
});

socket.on('transcript:error', (error) => {
  console.error('Transcript error:', error.message);
});

socket.on('agent:error', (error) => {
  console.error('Agent error:', error.message);
});
```

## Environment Variables

Required environment variables for consultation recording:

```env
# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=afiyapulse-audio

# IBM Watson Configuration
WATSON_API_KEY=your_watson_api_key
WATSON_SERVICE_URL=https://api.us-south.speech-to-text.watson.cloud.ibm.com
WATSON_MODEL=en-US_BroadbandModel

# JWT Configuration
JWT_SECRET=your_jwt_secret

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Security Considerations

1. **Authentication**: All endpoints and WebSocket connections require JWT authentication
2. **Authorization**: Users can only access consultations they're involved in
3. **File Upload**: Audio files are validated for type and size (max 100MB)
4. **S3 Security**: Presigned URLs expire after 1 hour by default
5. **Data Privacy**: Audio files and transcripts are stored securely in S3 and database

## Performance Optimization

1. **Chunked Upload**: Large audio files can be uploaded in chunks for better performance
2. **Real-time Transcription**: Audio chunks are transcribed as they're received
3. **WebSocket Rooms**: Efficient broadcasting to consultation participants only
4. **Connection Pooling**: Database connections are pooled for optimal performance

## Testing

### Manual Testing with cURL

```bash
# Create consultation
curl -X POST http://localhost:4000/api/consultations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"patientId": "patient_id"}'

# Upload audio
curl -X POST http://localhost:4000/api/consultations/<id>/upload-audio \
  -H "Authorization: Bearer <token>" \
  -F "audio=@recording.webm" \
  -F "transcribe=true"
```

### WebSocket Testing with Socket.IO Client

```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:4000', {
  auth: { token: 'your_jwt_token' }
});

socket.on('connect', () => {
  console.log('Connected');
  
  socket.emit('consultation:start', {
    consultationId: 'test_consultation_id'
  });
});
```

## Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Verify JWT token is valid
   - Check CORS configuration
   - Ensure server is running

2. **Audio Upload Failed**
   - Check file size (max 100MB)
   - Verify audio format is supported
   - Ensure AWS credentials are configured

3. **Transcription Not Working**
   - Verify Watson API credentials
   - Check audio format compatibility
   - Review Watson service logs

4. **Transcript Not Appearing**
   - Ensure WebSocket connection is active
   - Verify user is in consultation room
   - Check consultation status is IN_PROGRESS

## Future Enhancements

1. **Audio Compression**: Implement client-side audio compression
2. **Offline Support**: Queue audio chunks when offline
3. **Multi-language Support**: Add support for multiple languages
4. **Custom Vocabulary**: Train Watson with medical terminology
5. **Audio Quality Monitoring**: Real-time audio quality feedback
6. **Backup Transcription**: Fallback to alternative STT service

## Made with Bob