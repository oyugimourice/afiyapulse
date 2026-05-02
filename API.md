# AfiyaPulse API Documentation

Complete API reference for ClinicalCopilot backend services.

## Base URL

```
Development: http://localhost:3001/api
Production: https://api.afiyapulse.com/api
```

## Authentication

All API endpoints (except `/auth/login` and `/auth/register`) require authentication using JWT tokens.

### Headers

```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

---

## Authentication Endpoints

### Register User

```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "doctor@hospital.com",
  "password": "SecurePassword123!",
  "name": "Dr. John Doe",
  "role": "DOCTOR",
  "specialty": "Cardiology",
  "licenseNumber": "MD123456"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx1234567890",
      "email": "doctor@hospital.com",
      "name": "Dr. John Doe",
      "role": "DOCTOR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "doctor@hospital.com",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx1234567890",
      "email": "doctor@hospital.com",
      "name": "Dr. John Doe",
      "role": "DOCTOR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Patient Endpoints

### Create Patient

```http
POST /patients
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "dob": "1985-06-15",
  "gender": "FEMALE",
  "phone": "+1234567890",
  "email": "jane.smith@email.com",
  "address": "123 Main St, City, State 12345",
  "allergies": ["Penicillin", "Latex"]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "clx9876543210",
    "mrn": "MRN1234567890123",
    "firstName": "Jane",
    "lastName": "Smith",
    "dob": "1985-06-15T00:00:00.000Z",
    "gender": "FEMALE",
    "phone": "+1234567890",
    "email": "jane.smith@email.com",
    "address": "123 Main St, City, State 12345",
    "allergies": ["Penicillin", "Latex"],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Search Patients

```http
GET /patients/search?search=Jane&gender=FEMALE&page=1&limit=20
```

**Query Parameters:**
- `search` (optional): Search in name, MRN, phone, email
- `gender` (optional): MALE, FEMALE, OTHER, UNKNOWN
- `minAge` (optional): Minimum age
- `maxAge` (optional): Maximum age
- `hasAllergies` (optional): true/false
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sortBy` (optional): name, mrn, dob, createdAt
- `sortOrder` (optional): asc, desc

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "patients": [...],
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

### Get Patient by ID

```http
GET /patients/:id
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "clx9876543210",
    "mrn": "MRN1234567890123",
    "firstName": "Jane",
    "lastName": "Smith",
    "_count": {
      "consultations": 5,
      "prescriptions": 3,
      "referrals": 1,
      "appointments": 2
    }
  }
}
```

### Get Patient Medical History

```http
GET /patients/:id/history
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "patient": {...},
    "consultations": [...],
    "prescriptions": [...],
    "referrals": [...],
    "appointments": [...]
  }
}
```

---

## Consultation Endpoints

### Create Consultation

```http
POST /consultations
```

**Request Body:**
```json
{
  "patientId": "clx9876543210"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "clx1111111111",
    "patientId": "clx9876543210",
    "doctorId": "clx1234567890",
    "status": "IN_PROGRESS",
    "startedAt": "2024-01-15T14:30:00.000Z"
  }
}
```

### Start Recording

```http
POST /consultations/:id/start-recording
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Recording started",
  "data": {
    "uploadUrl": "https://s3.amazonaws.com/..."
  }
}
```

### Stop Recording

```http
POST /consultations/:id/stop-recording
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Recording stopped and processing started"
}
```

---

## Review Panel Endpoints

### Get Consultation Review

```http
GET /review/consultation/:consultationId
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "consultationId": "clx1111111111",
    "patientName": "Jane Smith",
    "patientMRN": "MRN1234567890123",
    "doctorName": "Dr. John Doe",
    "consultationDate": "2024-01-15T14:30:00.000Z",
    "items": {
      "soapNote": {
        "id": "clx2222222222",
        "type": "SOAP_NOTE",
        "isApproved": false,
        "content": {...}
      },
      "prescription": {...},
      "referral": {...},
      "appointment": {...}
    },
    "totalItems": 4,
    "pendingItems": 4,
    "approvedItems": 0
  }
}
```

### Approve SOAP Note

```http
POST /review/soap-note/:id/approve
```

**Request Body (optional revisions):**
```json
{
  "revisions": {
    "subjective": "Updated subjective section",
    "objective": "Updated objective section",
    "assessment": "Updated assessment",
    "plan": "Updated plan"
  }
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "SOAP note approved"
}
```

### Reject SOAP Note

```http
POST /review/soap-note/:id/reject
```

**Request Body:**
```json
{
  "reason": "Incomplete assessment section"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "SOAP note rejected"
}
```

### Batch Approve Consultation

```http
POST /review/consultation/:consultationId/batch-approve
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Batch approval completed",
  "data": {
    "approved": [
      "SOAP Note: clx2222222222",
      "Prescription: clx3333333333"
    ],
    "failed": []
  }
}
```

### Get Pending Reviews

```http
GET /review/pending?limit=10
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "reviews": [...],
    "count": 5
  }
}
```

---

## Dashboard Endpoints

### Get Dashboard Statistics

```http
GET /dashboard/stats
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "consultations": {
      "total": 150,
      "today": 5,
      "thisWeek": 23,
      "thisMonth": 87,
      "inProgress": 2,
      "completed": 148,
      "averageDuration": 25
    },
    "patients": {
      "total": 120,
      "new": 15,
      "returning": 105
    },
    "documentation": {
      "pendingReviews": 8,
      "approvedToday": 12,
      "soapNotes": 3,
      "prescriptions": 2,
      "referrals": 2,
      "appointments": 1
    },
    "performance": {
      "consultationsPerDay": 3.3,
      "averageConsultationTime": 25,
      "documentationCompletionRate": 98.7
    }
  }
}
```

### Get Recent Activity

```http
GET /dashboard/activity?limit=20
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1111111111",
      "type": "CONSULTATION",
      "title": "Consultation with Jane Smith",
      "description": "Status: COMPLETED",
      "timestamp": "2024-01-15T14:30:00.000Z",
      "metadata": {
        "patientMRN": "MRN1234567890123",
        "status": "COMPLETED"
      }
    }
  ]
}
```

### Get Consultation Trends

```http
GET /dashboard/consultations/trends?days=30
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    { "date": "2024-01-01", "count": 5 },
    { "date": "2024-01-02", "count": 7 },
    ...
  ]
}
```

### Get Patient Demographics

```http
GET /dashboard/patients/demographics
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "byGender": [
      { "gender": "MALE", "count": 60 },
      { "gender": "FEMALE", "count": 58 },
      { "gender": "OTHER", "count": 2 }
    ],
    "byAgeGroup": [
      { "ageGroup": "0-17", "count": 15 },
      { "ageGroup": "18-29", "count": 25 },
      { "ageGroup": "30-44", "count": 35 },
      { "ageGroup": "45-59", "count": 30 },
      { "ageGroup": "60+", "count": 15 }
    ]
  }
}
```

---

## Cache Management Endpoints (Admin Only)

### Get Cache Statistics

```http
GET /cache/stats
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalKeys": 1250,
    "memoryUsed": "45.2M",
    "hitRate": "87.5%"
  }
}
```

### Invalidate Cache by Prefix

```http
DELETE /cache/invalidate/:prefix
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Cache invalidated for prefix: patient"
}
```

---

## Audit Log Endpoints (Admin Only)

### Query Audit Logs

```http
GET /audit/logs?userId=clx1234567890&action=PATIENT_CREATED&startDate=2024-01-01&limit=50
```

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `action` (optional): Filter by action type
- `resourceType` (optional): Filter by resource type
- `resourceId` (optional): Filter by resource ID
- `startDate` (optional): Start date (ISO 8601)
- `endDate` (optional): End date (ISO 8601)
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "logs": [...],
    "total": 150,
    "limit": 50,
    "offset": 0
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests, please try again later",
    "retryAfter": "2024-01-15T14:35:00.000Z"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limiting

Different endpoints have different rate limits:

- **General API**: 100 requests per minute
- **Authentication**: 5 requests per minute
- **File Uploads**: 10 requests per 5 minutes
- **AI Agent Operations**: 20 requests per minute
- **Consultation Creation**: 30 requests per hour

Rate limit headers are included in all responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2024-01-15T14:35:00.000Z
```

---

## WebSocket Events

Connect to WebSocket server for real-time updates:

```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'your_jwt_token'
  }
});

// Listen for events
socket.on('transcription:update', (data) => {
  console.log('New transcription:', data);
});

socket.on('agent:progress', (data) => {
  console.log('Agent progress:', data);
});

socket.on('documentation:ready', (data) => {
  console.log('Documentation ready for review:', data);
});
```

---

## Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response Format:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

## Filtering & Sorting

Most list endpoints support filtering and sorting:

**Query Parameters:**
- `sortBy`: Field to sort by
- `sortOrder`: `asc` or `desc`
- Additional filters specific to each endpoint

---

## HIPAA Compliance

All API responses include HIPAA compliance headers:

```http
X-PHI-Protected: true
X-HIPAA-Compliant: true
Cache-Control: no-store, no-cache, must-revalidate, private
```

---

## Support

For API support:
- **Documentation**: https://docs.afiyapulse.com
- **Issues**: https://github.com/yourusername/afiyapulse/issues
- **Email**: api-support@afiyapulse.com

---

**Last Updated**: January 2024  
**API Version**: 1.0.0