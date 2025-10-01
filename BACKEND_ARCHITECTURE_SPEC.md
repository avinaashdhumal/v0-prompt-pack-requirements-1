# Backend Architecture Specification
## Compliance HealthCheck Platform

**Version:** 1.0  
**Date:** January 2024  
**Target Stack:** NestJS, MongoDB, Pinecone, LangChain, LangGraph, LangSmith, MCP

---

## 📋 Executive Summary

This document provides a comprehensive backend architecture specification for the **Compliance HealthCheck Platform** - an AI-powered compliance management system that transforms regulatory documents into actionable insights through LLM-based extraction, vector search, and intelligent gap analysis.

### System Overview
The platform enables enterprises to:
1. Upload regulatory documents, contracts, and policies
2. Process documents through OCR and AI extraction pipelines
3. Create compliance assessments using pre-built prompt packs
4. Extract requirements, controls, obligations, penalties, and timelines
5. Perform gap analysis through attestation workflows
6. Generate prioritized remediation roadmaps
7. Track progress with comprehensive audit trails

---

## 🏗️ Technology Stack

### Core Framework
- **NestJS** (v10+): Main application framework with TypeScript
- **Node.js** (v20+): Runtime environment

### Databases
- **MongoDB** (v7+): Primary database for structured data
  - Users, documents, assessments, findings, requirements, controls
  - Obligations, penalties, timelines, attestations, clarifications
  - Audit logs, prompt packs, remediation actions
  
- **Pinecone**: Vector database for semantic search
  - Document embeddings for similarity search
  - Requirement matching and gap analysis
  - Citation retrieval and context extraction

### AI/LLM Stack
- **LangChain**: LLM orchestration and prompt management
- **LangGraph**: Complex AI workflow orchestration
- **LangSmith**: Observability, tracing, and debugging
- **MCP (Model Context Protocol)**: Standardized AI integration layer

### Supporting Services
- **Redis**: Caching, session management, job queues
- **Bull Queue**: Background job processing (document processing, AI extraction)
- **AWS S3 / MinIO**: Document storage
- **Tesseract OCR**: Optical character recognition for scanned documents
- **PDF.js / pdf-parse**: PDF text extraction
- **Sharp**: Image processing
- **OpenAI API**: GPT-4, GPT-3.5-turbo for extraction
- **Anthropic Claude**: Alternative LLM provider
- **Passport.js**: Authentication middleware
- **JWT**: Token-based authentication

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── main.ts                      # Application entry point
│   ├── app.module.ts                # Root module
│   │
│   ├── common/                      # Shared utilities
│   │   ├── decorators/              # Custom decorators (@CurrentUser, @Roles)
│   │   ├── filters/                 # Exception filters
│   │   ├── guards/                  # Auth guards, role guards
│   │   ├── interceptors/            # Logging, transform interceptors
│   │   ├── pipes/                   # Validation pipes
│   │   └── utils/                   # Helper functions
│   │
│   ├── config/                      # Configuration
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── s3.config.ts
│   │   ├── pinecone.config.ts
│   │   ├── langchain.config.ts
│   │   └── app.config.ts
│   │
│   ├── auth/                        # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── refresh-token.dto.ts
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts
│   │       └── roles.guard.ts
│   │
│   ├── users/                       # User management
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── schemas/
│   │   │   └── user.schema.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       ├── update-user.dto.ts
│   │       └── user-response.dto.ts
│   │
│   ├── documents/                   # Document management
│   │   ├── documents.module.ts
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   ├── processors/
│   │   │   ├── document.processor.ts
│   │   │   ├── ocr.processor.ts
│   │   │   ├── pdf-parser.service.ts
│   │   │   └── chunking.service.ts
│   │   ├── schemas/
│   │   │   ├── document.schema.ts
│   │   │   └── document-chunk.schema.ts
│   │   └── dto/
│   │       ├── upload-document.dto.ts
│   │       ├── document-metadata.dto.ts
│   │       └── document-response.dto.ts
│   │
│   ├── assessments/                 # Assessment management
│   │   ├── assessments.module.ts
│   │   ├── assessments.controller.ts
│   │   ├── assessments.service.ts
│   │   ├── assessment-runner.service.ts
│   │   ├── schemas/
│   │   │   └── assessment.schema.ts
│   │   └── dto/
│   │       ├── create-assessment.dto.ts
│   │       ├── run-assessment.dto.ts
│   │       └── assessment-response.dto.ts
│   │
│   ├── extraction/                  # AI extraction engine
│   │   ├── extraction.module.ts
│   │   ├── extraction.service.ts
│   │   ├── extractors/
│   │   │   ├── requirements.extractor.ts
│   │   │   ├── controls.extractor.ts
│   │   │   ├── obligations.extractor.ts
│   │   │   ├── penalties.extractor.ts
│   │   │   └── timelines.extractor.ts
│   │   ├── chains/
│   │   │   ├── requirement-chain.ts
│   │   │   ├── control-chain.ts
│   │   │   └── citation-chain.ts
│   │   └── graphs/
│   │       ├── assessment-graph.ts
│   │       └── clarification-graph.ts
│   │
│   ├── requirements/                # Requirements management
│   │   ├── requirements.module.ts
│   │   ├── requirements.controller.ts
│   │   ├── requirements.service.ts
│   │   ├── schemas/
│   │   │   └── requirement.schema.ts
│   │   └── dto/
│   │       ├── create-requirement.dto.ts
│   │       └── update-requirement.dto.ts
│   │
│   ├── controls/                    # Controls management
│   │   ├── controls.module.ts
│   │   ├── controls.controller.ts
│   │   ├── controls.service.ts
│   │   ├── schemas/
│   │   │   └── control.schema.ts
│   │   └── dto/
│   │
│   ├── obligations/                 # Obligations management
│   │   ├── obligations.module.ts
│   │   ├── obligations.controller.ts
│   │   ├── obligations.service.ts
│   │   ├── schemas/
│   │   │   └── obligation.schema.ts
│   │   └── dto/
│   │
│   ├── penalties/                   # Penalties management
│   │   ├── penalties.module.ts
│   │   ├── penalties.controller.ts
│   │   ├── penalties.service.ts
│   │   ├── schemas/
│   │   │   └── penalty.schema.ts
│   │   └── dto/
│   │
│   ├── timelines/                   # Timelines management
│   │   ├── timelines.module.ts
│   │   ├── timelines.controller.ts
│   │   ├── timelines.service.ts
│   │   ├── schemas/
│   │   │   └── timeline.schema.ts
│   │   └── dto/
│   │
│   ├── attestations/                # Attestation workflow
│   │   ├── attestations.module.ts
│   │   ├── attestations.controller.ts
│   │   ├── attestations.service.ts
│   │   ├── schemas/
│   │   │   └── attestation.schema.ts
│   │   └── dto/
│   │       ├── create-attestation.dto.ts
│   │       └── update-attestation.dto.ts
│   │
│   ├── clarifications/              # Clarifications (UNCERTAIN handling)
│   │   ├── clarifications.module.ts
│   │   ├── clarifications.controller.ts
│   │   ├── clarifications.service.ts
│   │   ├── schemas/
│   │   │   └── clarification.schema.ts
│   │   └── dto/
│   │
│   ├── findings/                    # Findings & gap analysis
│   │   ├── findings.module.ts
│   │   ├── findings.controller.ts
│   │   ├── findings.service.ts
│   │   ├── gap-analyzer.service.ts
│   │   ├── risk-scorer.service.ts
│   │   ├── schemas/
│   │   │   └── finding.schema.ts
│   │   └── dto/
│   │
│   ├── remediation/                 # Remediation planning
│   │   ├── remediation.module.ts
│   │   ├── remediation.controller.ts
│   │   ├── remediation.service.ts
│   │   ├── prioritizer.service.ts
│   │   ├── schemas/
│   │   │   └── remediation-action.schema.ts
│   │   └── dto/
│   │
│   ├── scoring/                     # Compliance scoring
│   │   ├── scoring.module.ts
│   │   ├── scoring.service.ts
│   │   ├── calculators/
│   │   │   ├── residual-risk.calculator.ts
│   │   │   ├── family-breakdown.calculator.ts
│   │   │   └── maturity-scorer.ts
│   │   └── schemas/
│   │       └── score.schema.ts
│   │
│   ├── prompt-packs/                # Prompt pack management
│   │   ├── prompt-packs.module.ts
│   │   ├── prompt-packs.controller.ts
│   │   ├── prompt-packs.service.ts
│   │   ├── schemas/
│   │   │   ├── prompt-pack.schema.ts
│   │   │   └── prompt.schema.ts
│   │   └── dto/
│   │       ├── create-pack.dto.ts
│   │       └── update-pack.dto.ts
│   │
│   ├── audit-logs/                  # Audit trail
│   │   ├── audit-logs.module.ts
│   │   ├── audit-logs.controller.ts
│   │   ├── audit-logs.service.ts
│   │   ├── schemas/
│   │   │   └── audit-log.schema.ts
│   │   └── interceptors/
│   │       └── audit.interceptor.ts
│   │
│   ├── vector-store/                # Pinecone integration
│   │   ├── vector-store.module.ts
│   │   ├── vector-store.service.ts
│   │   ├── embedding.service.ts
│   │   └── similarity-search.service.ts
│   │
│   ├── mcp/                         # Model Context Protocol
│   │   ├── mcp.module.ts
│   │   ├── mcp.service.ts
│   │   ├── providers/
│   │   │   ├── openai.provider.ts
│   │   │   ├── anthropic.provider.ts
│   │   │   └── azure.provider.ts
│   │   └── middleware/
│   │       └── mcp.middleware.ts
│   │
│   └── jobs/                        # Background jobs
│       ├── jobs.module.ts
│       ├── queues/
│       │   ├── document-processing.queue.ts
│       │   ├── extraction.queue.ts
│       │   └── assessment.queue.ts
│       └── processors/
│           ├── document-job.processor.ts
│           ├── extraction-job.processor.ts
│           └── assessment-job.processor.ts
│
├── test/                            # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄️ Database Schemas (MongoDB)

### User Schema
```typescript
{
  _id: ObjectId,
  email: string,              // unique, indexed
  username: string,           // unique, indexed
  password: string,           // bcrypt hashed
  fullName: string,
  avatarUrl: string,
  bio: string,
  websiteUrl: string,
  githubUrl: string,
  twitterUrl: string,
  isVerified: boolean,
  role: 'admin' | 'user' | 'auditor',
  tenantId: ObjectId,         // Multi-tenancy support
  createdAt: Date,
  updatedAt: Date
}
```

### Document Schema
```typescript
{
  _id: ObjectId,
  tenantId: ObjectId,         // indexed
  name: string,
  type: 'regulation' | 'policy' | 'contract' | 'vendor_doc' | 'audit_letter',
  storageUri: string,         // S3 URI
  hash: string,               // SHA-256 for deduplication
  pages: number,
  status: 'uploading' | 'processing' | 'ready' | 'failed',
  metadata: {
    fileSize: number,
    mimeType: string,
    uploadedBy: ObjectId,
    description: string
  },
  processingResult: {
    ocrCompleted: boolean,
    chunksCreated: number,
    embeddingsGenerated: number,
    errorLog: string[]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### DocumentChunk Schema
```typescript
{
  _id: ObjectId,
  documentId: ObjectId,       // indexed
  tenantId: ObjectId,         // indexed
  page: number,
  sectionPath: string,        // e.g., "Section 3.2.1"
  text: string,               // Actual chunk text
  tokenCount: number,
  pineconeId: string,         // Reference to Pinecone vector
  refs: {
    startChar: number,
    endChar: number,
    coordinates: {
      x: number,
      y: number,
      width: number,
      height: number
    }
  },
  metadata: object,
  createdAt: Date
}
```

### Assessment Schema
```typescript
{
  _id: ObjectId,
  tenantId: ObjectId,         // indexed
  name: string,
  description: string,
  promptPack: string[],       // Array of framework names
  documentIds: ObjectId[],    // References to documents
  jurisdiction: string,       // Optional: US, EU, UK, etc.
  status: 'draft' | 'running' | 'completed' | 'failed',
  progress: {
    current: number,
    total: number,
    stage: string
  },
  results: {
    requirementsExtracted: number,
    controlsIdentified: number,
    obligationsFound: number,
    penaltiesIdentified: number,
    timelinesExtracted: number,
    clarificationsRaised: number
  },
  createdBy: ObjectId,
  createdAt: Date,
  completedAt: Date,
  baselineId: ObjectId,       // For comparison assessments
  updatedAt: Date
}
```

### Requirement Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,     // indexed
  tenantId: ObjectId,         // indexed
  controlFamily: 'Access' | 'Data' | 'Governance' | 'IR' | 'TPRM' | 'BCP',
  controlIdExt: string,       // e.g., "PCI-DSS-8.2.3"
  statement: string,          // The actual requirement text
  mustShould: 'MUST' | 'SHOULD',
  testProcedures: string[],
  refs: [{
    doc: ObjectId,
    page: number,
    clause: string,
    excerpt: string,
    confidence: number        // 0-1
  }],
  status: 'KNOWN' | 'UNCERTAIN',
  clarificationId: ObjectId,  // If status is UNCERTAIN
  metadata: {
    priority: number,
    impactLevel: 'low' | 'medium' | 'high' | 'critical',
    frameworkSource: string   // PCI DSS, ISO 27001, etc.
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Control Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,
  tenantId: ObjectId,
  family: 'Access Control' | 'Data Protection' | 'Governance' | 'Incident Response' | 'Third Party' | 'Business Continuity',
  controlId: string,
  title: string,
  description: string,
  implementationStatus: 'Implemented' | 'Partial' | 'Not Implemented' | 'Not Applicable',
  effectiveness: 'Effective' | 'Needs Improvement' | 'Ineffective',
  testDate: Date,
  tester: string,
  notes: string,
  refs: [DocumentReference],
  mappedRequirements: ObjectId[],
  createdAt: Date,
  updatedAt: Date
}
```

### Obligation Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,
  tenantId: ObjectId,
  legalText: string,
  jurisdiction: string,
  category: 'Compliance' | 'Reporting' | 'Data Protection' | 'Security' | 'Other',
  dueDate: Date,
  status: 'Pending' | 'In Progress' | 'Completed',
  owner: string,
  refs: [DocumentReference],
  remindersSent: Date[],
  createdAt: Date,
  updatedAt: Date
}
```

### Penalty Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,
  tenantId: ObjectId,
  text: string,
  penaltyType: 'fine' | 'sanction' | 'license' | 'civil' | 'criminal',
  maxAmount: string,
  conditions: string,
  severity: 'Low' | 'Medium' | 'High' | 'Critical',
  applicableTo: string,
  refs: [DocumentReference],
  createdAt: Date,
  updatedAt: Date
}
```

### Timeline Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,
  tenantId: ObjectId,
  dateType: string,           // 'compliance deadline', 'reporting date', etc.
  deadline: Date,
  trigger: string,            // What triggers this deadline
  status: 'Upcoming' | 'Due Soon' | 'Overdue' | 'Completed',
  owner: string,
  reminderSet: boolean,
  refs: [DocumentReference],
  createdAt: Date,
  updatedAt: Date
}
```

### Attestation Schema
```typescript
{
  _id: ObjectId,
  tenantId: ObjectId,
  subjectId: ObjectId,        // finding_id, requirement_id, etc.
  subjectType: 'finding' | 'requirement' | 'control' | 'obligation',
  status: 'Have' | 'Partial' | 'No',
  evidenceUri: string,        // S3 URI for evidence files
  evidenceDescription: string,
  owner: string,
  notes: string,
  attestedBy: ObjectId,       // User ID
  attestedAt: Date,
  reviewedBy: ObjectId,
  reviewedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Clarification Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,
  tenantId: ObjectId,
  subjectId: ObjectId,
  subjectType: 'requirement' | 'finding' | 'control' | 'obligation',
  question: string,
  context: string,
  status: 'Open' | 'Under Review' | 'Resolved' | 'Closed',
  priority: 'Low' | 'Medium' | 'High',
  resolution: string,
  resolvedBy: ObjectId,
  resolvedAt: Date,
  assignedTo: ObjectId,
  refs: [DocumentReference],
  comments: [{
    userId: ObjectId,
    text: string,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Finding Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,
  tenantId: ObjectId,
  kind: 'risk' | 'issue' | 'requirement_gap',
  title: string,
  description: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  likelihood: 'low' | 'medium' | 'high',
  impactArea: 'Financial' | 'Regulatory' | 'Operational' | 'Reputation' | 'Privacy',
  refs: [DocumentReference],
  citationConfidence: number, // 0-1
  relatedRequirements: ObjectId[],
  attestationId: ObjectId,
  remediationActionIds: ObjectId[],
  riskScore: number,          // Calculated: impact × likelihood
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed',
  createdAt: Date,
  updatedAt: Date
}
```

### Score Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,     // unique per assessment
  tenantId: ObjectId,
  totalScore: number,         // 0-100
  residualRisk: 'Low' | 'Medium' | 'High' | 'Critical',
  familyBreakdown: {
    'Access Control': number,
    'Data Protection': number,
    'Governance': number,
    'Incident Response': number,
    'Third Party': number,
    'Business Continuity': number
  },
  topGaps: string[],          // Top 5 gap areas
  quickWins: string[],        // Easy remediation items
  clarifications: string[],   // Items needing clarification
  maturityLevel: number,      // 1-5
  compliancePercentage: number,
  calculatedAt: Date,
  createdAt: Date
}
```

### RemediationAction Schema
```typescript
{
  _id: ObjectId,
  assessmentId: ObjectId,
  tenantId: ObjectId,
  title: string,
  description: string,
  priority: 'P0' | 'P1' | 'P2',
  owner: string,
  effort: 'S' | 'M' | 'L',    // Small, Medium, Large
  dependency: ObjectId,        // Another action this depends on
  dueBy: Date,
  mappedSolution: string,
  status: 'pending' | 'in_progress' | 'completed',
  refs: [DocumentReference],
  linkedFindings: ObjectId[],
  linkedRequirements: ObjectId[],
  tasks: [{
    title: string,
    status: 'pending' | 'completed',
    completedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### AuditLog Schema
```typescript
{
  _id: ObjectId,
  tenantId: ObjectId,         // indexed
  actor: ObjectId,            // User ID
  actorEmail: string,
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'EXPORT' | 'IMPORT' | 'RUN_ASSESSMENT' | 'ATTEST' | 'RESOLVE',
  target: string,             // Human-readable target name
  targetType: 'document' | 'assessment' | 'requirement' | 'finding' | 'remediation' | 'attestation' | 'clarification',
  targetId: ObjectId,
  changes: object,            // JSON diff of changes
  ipAddress: string,
  userAgent: string,
  details: object,
  timestamp: Date,
  indexed: Date               // For TTL or archival
}
```

### PromptPack Schema
```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  authorId: ObjectId,
  categoryId: ObjectId,
  tags: string[],
  isPublic: boolean,
  isFeatured: boolean,
  version: string,
  license: string,
  price: number,
  downloadCount: number,
  viewCount: number,
  likeCount: number,
  averageRating: number,
  ratingCount: number,
  thumbnailUrl: string,
  prompts: [{
    title: string,
    content: string,
    description: string,
    category: string,
    variables: object,
    exampleInput: string,
    exampleOutput: string,
    orderIndex: number
  }],
  frameworks: string[],       // PCI DSS, ISO 27001, etc.
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 Complete API Endpoints Specification

### Authentication Endpoints

#### POST `/api/auth/register`
**Request:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "username": "johndoe",
      "fullName": "John Doe",
      "isVerified": false,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST `/api/auth/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
**Response:** Same as register

#### POST `/api/auth/refresh`
**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST `/api/auth/logout`
**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Document Endpoints

#### GET `/api/documents`
**Query Params:** `?page=1&limit=10&type=regulation&status=ready`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "PCI DSS v4.0.pdf",
      "type": "regulation",
      "pages": 145,
      "status": "ready",
      "storageUri": "s3://bucket/documents/abc123.pdf",
      "hash": "sha256_hash_here",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### POST `/api/documents/upload`
**Request:** `multipart/form-data`
```
file: (binary)
type: "regulation"
description: "PCI DSS v4.0 Payment Card Industry Data Security Standard"
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "PCI DSS v4.0.pdf",
    "type": "regulation",
    "status": "processing",
    "storageUri": "s3://bucket/documents/abc123.pdf",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Document uploaded and processing started"
}
```

#### GET `/api/documents/:id`
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "PCI DSS v4.0.pdf",
    "type": "regulation",
    "pages": 145,
    "status": "ready",
    "storageUri": "s3://bucket/documents/abc123.pdf",
    "metadata": {
      "fileSize": 2457600,
      "mimeType": "application/pdf",
      "uploadedBy": "507f1f77bcf86cd799439012",
      "description": "PCI DSS v4.0"
    },
    "processingResult": {
      "ocrCompleted": true,
      "chunksCreated": 456,
      "embeddingsGenerated": 456,
      "errorLog": []
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### DELETE `/api/documents/:id`
**Response:**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

#### GET `/api/documents/:id/download`
**Response:** Binary file stream with appropriate headers

#### GET `/api/documents/:id/chunks`
**Query Params:** `?page=1&limit=20`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439013",
      "documentId": "507f1f77bcf86cd799439011",
      "page": 12,
      "sectionPath": "3.2.1",
      "text": "Multi-factor authentication must be implemented...",
      "refs": {
        "startChar": 1250,
        "endChar": 1580
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 456,
    "totalPages": 23
  }
}
```

---

### Assessment Endpoints

#### GET `/api/assessments`
**Query Params:** `?page=1&limit=10&status=completed`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439014",
      "name": "Q1 2024 PCI DSS Assessment",
      "promptPack": ["PCI DSS", "ISO 27001"],
      "documentIds": ["507f1f77bcf86cd799439011"],
      "status": "completed",
      "results": {
        "requirementsExtracted": 145,
        "controlsIdentified": 89,
        "obligationsFound": 23,
        "penaltiesIdentified": 12,
        "timelinesExtracted": 18,
        "clarificationsRaised": 5
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "completedAt": "2024-01-15T12:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8,
    "totalPages": 1
  }
}
```

#### POST `/api/assessments`
**Request:**
```json
{
  "name": "Q1 2024 PCI DSS Assessment",
  "description": "Quarterly compliance assessment",
  "promptPack": ["PCI DSS", "ISO 27001"],
  "documentIds": ["507f1f77bcf86cd799439011"],
  "jurisdiction": "US"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "name": "Q1 2024 PCI DSS Assessment",
    "status": "draft",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Assessment created successfully"
}
```

#### GET `/api/assessments/:id`
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "name": "Q1 2024 PCI DSS Assessment",
    "description": "Quarterly compliance assessment",
    "promptPack": ["PCI DSS", "ISO 27001"],
    "documentIds": ["507f1f77bcf86cd799439011"],
    "jurisdiction": "US",
    "status": "completed",
    "progress": {
      "current": 100,
      "total": 100,
      "stage": "completed"
    },
    "results": {
      "requirementsExtracted": 145,
      "controlsIdentified": 89,
      "obligationsFound": 23,
      "penaltiesIdentified": 12,
      "timelinesExtracted": 18,
      "clarificationsRaised": 5
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "completedAt": "2024-01-15T12:45:00Z"
  }
}
```

#### POST `/api/assessments/:id/run`
**Request:** (optional body for config)
```json
{
  "promptConfig": {
    "temperature": 0.1,
    "maxTokens": 4000
  }
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "assessmentId": "507f1f77bcf86cd799439014",
    "jobId": "job_abc123",
    "status": "running",
    "estimatedCompletionTime": "2024-01-15T13:00:00Z"
  },
  "message": "Assessment started"
}
```

#### DELETE `/api/assessments/:id`
**Response:**
```json
{
  "success": true,
  "message": "Assessment deleted successfully"
}
```

#### GET `/api/assessments/:id/summary`
**Response:**
```json
{
  "success": true,
  "data": {
    "assessmentId": "507f1f77bcf86cd799439014",
    "scoreTotal": 78,
    "residualRisk": "Medium",
    "familyBreakdown": {
      "Access Control": 82,
      "Data Protection": 75,
      "Governance": 88,
      "Incident Response": 70,
      "Third Party": 65,
      "Business Continuity": 80
    },
    "topGaps": [
      "Multi-factor authentication not fully implemented",
      "Data encryption at rest missing in legacy systems",
      "Incident response plan not tested in 18 months"
    ],
    "quickWins": [
      "Update password policy documentation",
      "Enable audit logging on production databases"
    ],
    "clarifications": [
      "Clarify scope of cardholder data environment",
      "Confirm vendor compliance requirements"
    ]
  }
}
```

---

### Requirements Endpoints

#### GET `/api/requirements`
**Query Params:** `?assessmentId=xxx&controlFamily=Access&status=KNOWN&page=1&limit=20`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439015",
      "assessmentId": "507f1f77bcf86cd799439014",
      "controlFamily": "Access",
      "controlIdExt": "PCI-DSS-8.2.3",
      "statement": "Multi-factor authentication must be implemented for all administrative access to the cardholder data environment.",
      "mustShould": "MUST",
      "testProcedures": [
        "Verify MFA is configured for admin accounts",
        "Test MFA enrollment process",
        "Review access logs for MFA usage"
      ],
      "refs": [
        {
          "doc": "507f1f77bcf86cd799439011",
          "page": 45,
          "clause": "8.2.3",
          "excerpt": "Multi-factor authentication must be implemented...",
          "confidence": 0.95
        }
      ],
      "status": "KNOWN",
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 145,
    "totalPages": 8
  }
}
```

#### GET `/api/requirements/:id`
**Response:** Single requirement object

#### PATCH `/api/requirements/:id`
**Request:**
```json
{
  "status": "KNOWN",
  "testProcedures": ["Additional test procedure"]
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    /* updated requirement object */
  }
}
```

#### DELETE `/api/requirements/:id`
**Response:**
```json
{
  "success": true,
  "message": "Requirement deleted successfully"
}
```

---

### Controls Endpoints

#### GET `/api/controls`
**Query Params:** `?assessmentId=xxx&family=Access+Control&implementationStatus=Implemented`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439016",
      "assessmentId": "507f1f77bcf86cd799439014",
      "family": "Access Control",
      "controlId": "AC-001",
      "title": "Multi-Factor Authentication",
      "description": "Implementation of MFA for administrative access",
      "implementationStatus": "Implemented",
      "effectiveness": "Effective",
      "testDate": "2024-01-10T00:00:00Z",
      "tester": "Jane Smith",
      "notes": "MFA successfully deployed across all admin accounts",
      "refs": [
        {
          "doc": "507f1f77bcf86cd799439011",
          "page": 45,
          "clause": "8.2.3",
          "excerpt": "Multi-factor authentication..."
        }
      ],
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 89,
    "totalPages": 5
  }
}
```

#### POST `/api/controls`
**Request:**
```json
{
  "assessmentId": "507f1f77bcf86cd799439014",
  "family": "Access Control",
  "controlId": "AC-002",
  "title": "Password Management",
  "description": "Implementation of strong password policies",
  "implementationStatus": "Partial",
  "effectiveness": "Needs Improvement",
  "notes": "Policy documented but not enforced technically"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    /* created control object */
  }
}
```

#### GET `/api/controls/:id`
**Response:** Single control object

#### PATCH `/api/controls/:id`
**Request:**
```json
{
  "implementationStatus": "Implemented",
  "effectiveness": "Effective",
  "testDate": "2024-01-20T00:00:00Z",
  "notes": "Technical enforcement now in place"
}
```
**Response:** Updated control object

#### DELETE `/api/controls/:id`
**Response:** Success message

---

### Obligations Endpoints

#### GET `/api/obligations`
**Query Params:** `?assessmentId=xxx&category=Reporting&status=Pending`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439017",
      "assessmentId": "507f1f77bcf86cd799439014",
      "legalText": "Annual compliance report must be submitted to the regulatory body by March 31st.",
      "jurisdiction": "US",
      "category": "Reporting",
      "dueDate": "2024-03-31T00:00:00Z",
      "status": "Pending",
      "owner": "John Doe",
      "refs": [
        {
          "doc": "507f1f77bcf86cd799439011",
          "page": 78,
          "clause": "12.3",
          "excerpt": "Annual compliance report..."
        }
      ],
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 23,
    "totalPages": 2
  }
}
```

#### POST `/api/obligations`
#### GET `/api/obligations/:id`
#### PATCH `/api/obligations/:id`
#### DELETE `/api/obligations/:id`
(Similar patterns to Controls)

---

### Penalties Endpoints

#### GET `/api/penalties`
**Query Params:** `?assessmentId=xxx&penaltyType=fine&severity=High`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439018",
      "assessmentId": "507f1f77bcf86cd799439014",
      "text": "Failure to comply may result in fines up to $500,000 per violation.",
      "penaltyType": "fine",
      "maxAmount": "$500,000",
      "conditions": "Per violation, per day",
      "severity": "High",
      "applicableTo": "Non-compliance with data encryption requirements",
      "refs": [
        {
          "doc": "507f1f77bcf86cd799439011",
          "page": 102,
          "clause": "15.2",
          "excerpt": "Failure to comply..."
        }
      ],
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "totalPages": 1
  }
}
```

#### POST `/api/penalties`
#### GET `/api/penalties/:id`
#### PATCH `/api/penalties/:id`
#### DELETE `/api/penalties/:id`

---

### Timelines Endpoints

#### GET `/api/timelines`
**Query Params:** `?assessmentId=xxx&status=Due+Soon`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439019",
      "assessmentId": "507f1f77bcf86cd799439014",
      "dateType": "compliance deadline",
      "deadline": "2024-02-28T00:00:00Z",
      "trigger": "90 days after initial assessment",
      "status": "Due Soon",
      "owner": "Compliance Team",
      "reminderSet": true,
      "refs": [
        {
          "doc": "507f1f77bcf86cd799439011",
          "page": 56,
          "clause": "9.1",
          "excerpt": "Compliance must be achieved within..."
        }
      ],
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 18,
    "totalPages": 1
  }
}
```

#### POST `/api/timelines`
#### GET `/api/timelines/:id`
#### PATCH `/api/timelines/:id`
#### DELETE `/api/timelines/:id`

---

### Attestations Endpoints

#### GET `/api/attestations`
**Query Params:** `?subjectType=requirement&status=Have`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439020",
      "subjectId": "507f1f77bcf86cd799439015",
      "subjectType": "requirement",
      "status": "Have",
      "evidenceUri": "s3://bucket/evidence/mfa-config.pdf",
      "evidenceDescription": "MFA configuration screenshots and audit logs",
      "owner": "IT Security Team",
      "notes": "MFA fully implemented across all admin accounts",
      "attestedBy": "507f1f77bcf86cd799439012",
      "attestedAt": "2024-01-18T14:30:00Z",
      "createdAt": "2024-01-18T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 87,
    "totalPages": 5
  }
}
```

#### POST `/api/attestations`
**Request:**
```json
{
  "subjectId": "507f1f77bcf86cd799439015",
  "subjectType": "requirement",
  "status": "Partial",
  "evidenceDescription": "MFA implemented for 80% of accounts",
  "owner": "IT Security Team",
  "notes": "Rollout in progress, expected completion by Feb 15"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    /* created attestation object */
  }
}
```

#### POST `/api/attestations/:id/upload-evidence`
**Request:** `multipart/form-data`
```
file: (binary)
```
**Response:**
```json
{
  "success": true,
  "data": {
    "attestationId": "507f1f77bcf86cd799439020",
    "evidenceUri": "s3://bucket/evidence/file.pdf"
  }
}
```

#### GET `/api/attestations/:id`
#### PATCH `/api/attestations/:id`
#### DELETE `/api/attestations/:id`

---

### Clarifications Endpoints

#### GET `/api/clarifications`
**Query Params:** `?assessmentId=xxx&status=Open&priority=High`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439021",
      "assessmentId": "507f1f77bcf86cd799439014",
      "subjectId": "507f1f77bcf86cd799439015",
      "subjectType": "requirement",
      "question": "Does the cardholder data environment include the test environment?",
      "context": "Requirement mentions 'all systems that store, process, or transmit cardholder data' but test environment scope is unclear",
      "status": "Open",
      "priority": "High",
      "assignedTo": "507f1f77bcf86cd799439022",
      "refs": [
        {
          "doc": "507f1f77bcf86cd799439011",
          "page": 12,
          "clause": "1.2",
          "excerpt": "All systems that store..."
        }
      ],
      "comments": [
        {
          "userId": "507f1f77bcf86cd799439012",
          "text": "This needs immediate clarification from the QSA",
          "createdAt": "2024-01-16T10:00:00Z"
        }
      ],
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```

#### POST `/api/clarifications`
**Request:**
```json
{
  "assessmentId": "507f1f77bcf86cd799439014",
  "subjectId": "507f1f77bcf86cd799439015",
  "subjectType": "requirement",
  "question": "Need clarification on scope",
  "context": "Detailed context here...",
  "priority": "High",
  "assignedTo": "507f1f77bcf86cd799439022"
}
```
**Response:** Created clarification object

#### POST `/api/clarifications/:id/comments`
**Request:**
```json
{
  "text": "This has been clarified with the auditor. Test environment is out of scope."
}
```
**Response:** Updated clarification with new comment

#### PATCH `/api/clarifications/:id/resolve`
**Request:**
```json
{
  "resolution": "Test environment confirmed out of scope per QSA guidance dated Jan 20, 2024",
  "status": "Resolved"
}
```
**Response:** Updated clarification object

#### GET `/api/clarifications/:id`
#### PATCH `/api/clarifications/:id`
#### DELETE `/api/clarifications/:id`

---

### Findings Endpoints

#### GET `/api/findings`
**Query Params:** `?assessmentId=xxx&severity=critical&kind=requirement_gap`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439023",
      "assessmentId": "507f1f77bcf86cd799439014",
      "kind": "requirement_gap",
      "title": "Multi-Factor Authentication Not Implemented",
      "description": "PCI DSS requirement 8.2.3 mandates MFA for administrative access, but current implementation only uses username/password.",
      "severity": "critical",
      "likelihood": "high",
      "impactArea": "Regulatory",
      "refs": [
        {
          "doc": "507f1f77bcf86cd799439011",
          "page": 45,
          "clause": "8.2.3",
          "excerpt": "Multi-factor authentication must be implemented..."
        }
      ],
      "citationConfidence": 0.95,
      "relatedRequirements": ["507f1f77bcf86cd799439015"],
      "riskScore": 90,
      "status": "Open",
      "createdAt": "2024-01-15T11:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 34,
    "totalPages": 2
  }
}
```

#### POST `/api/findings`
#### GET `/api/findings/:id`
#### PATCH `/api/findings/:id`
#### DELETE `/api/findings/:id`

---

### Remediation Endpoints

#### GET `/api/remediation`
**Query Params:** `?assessmentId=xxx&priority=P0&status=pending`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439024",
      "assessmentId": "507f1f77bcf86cd799439014",
      "title": "Implement Multi-Factor Authentication",
      "description": "Deploy MFA solution for all administrative accounts to meet PCI DSS 8.2.3 requirement",
      "priority": "P0",
      "owner": "IT Security Team",
      "effort": "M",
      "dueBy": "2024-02-15T00:00:00Z",
      "mappedSolution": "Implement Okta MFA with push notifications",
      "status": "pending",
      "refs": [
        {
          "doc": "507f1f77bcf86cd799439011",
          "page": 45,
          "clause": "8.2.3"
        }
      ],
      "linkedFindings": ["507f1f77bcf86cd799439023"],
      "linkedRequirements": ["507f1f77bcf86cd799439015"],
      "tasks": [
        {
          "title": "Select MFA vendor",
          "status": "pending"
        },
        {
          "title": "Configure MFA server",
          "status": "pending"
        },
        {
          "title": "User enrollment and training",
          "status": "pending"
        }
      ],
      "createdAt": "2024-01-15T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 28,
    "totalPages": 2
  }
}
```

#### POST `/api/remediation`
**Request:**
```json
{
  "assessmentId": "507f1f77bcf86cd799439014",
  "title": "Implement Data Encryption at Rest",
  "description": "Deploy encryption for databases and file systems",
  "priority": "P0",
  "owner": "Database Team",
  "effort": "L",
  "dueBy": "2024-03-01T00:00:00Z",
  "mappedSolution": "Use native database encryption features",
  "linkedFindings": ["507f1f77bcf86cd799439025"],
  "tasks": [
    {
      "title": "Assess current encryption status"
    },
    {
      "title": "Implement database encryption"
    },
    {
      "title": "Verify encryption effectiveness"
    }
  ]
}
```
**Response:** Created remediation action object

#### PATCH `/api/remediation/:id`
**Request:**
```json
{
  "status": "in_progress",
  "tasks": [
    {
      "title": "Select MFA vendor",
      "status": "completed",
      "completedAt": "2024-01-20T00:00:00Z"
    }
  ]
}
```
**Response:** Updated remediation action

#### GET `/api/remediation/:id`
#### DELETE `/api/remediation/:id`

---

### Scoring Endpoints

#### GET `/api/scoring/:assessmentId`
**Response:**
```json
{
  "success": true,
  "data": {
    "assessmentId": "507f1f77bcf86cd799439014",
    "totalScore": 78,
    "residualRisk": "Medium",
    "familyBreakdown": {
      "Access Control": 82,
      "Data Protection": 75,
      "Governance": 88,
      "Incident Response": 70,
      "Third Party": 65,
      "Business Continuity": 80
    },
    "topGaps": [
      "Multi-factor authentication not fully implemented",
      "Data encryption at rest missing in legacy systems",
      "Incident response plan not tested in 18 months"
    ],
    "quickWins": [
      "Update password policy documentation",
      "Enable audit logging on production databases"
    ],
    "clarifications": [
      "Clarify scope of cardholder data environment",
      "Confirm vendor compliance requirements"
    ],
    "maturityLevel": 3,
    "compliancePercentage": 78,
    "calculatedAt": "2024-01-15T13:00:00Z"
  }
}
```

#### POST `/api/scoring/:assessmentId/recalculate`
**Response:** Recalculated score object

---

### Prompt Packs Endpoints

#### GET `/api/prompt-packs`
**Query Params:** `?category=compliance&tags=pci-dss&isFeatured=true&page=1&limit=10`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439026",
      "title": "PCI DSS v4.0 Compliance Pack",
      "description": "Complete prompt pack for PCI DSS v4.0 requirements extraction",
      "author": {
        "id": "507f1f77bcf86cd799439012",
        "username": "johndoe",
        "fullName": "John Doe"
      },
      "tags": ["pci-dss", "payment", "compliance"],
      "isPublic": true,
      "isFeatured": true,
      "version": "1.0.0",
      "license": "MIT",
      "price": 0,
      "downloadCount": 245,
      "viewCount": 1240,
      "likeCount": 89,
      "averageRating": 4.7,
      "ratingCount": 42,
      "thumbnailUrl": "https://...",
      "frameworks": ["PCI DSS"],
      "createdAt": "2024-01-10T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "totalPages": 3
  }
}
```

#### GET `/api/prompt-packs/:id`
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439026",
    "title": "PCI DSS v4.0 Compliance Pack",
    "description": "Complete prompt pack for PCI DSS v4.0 requirements extraction",
    "prompts": [
      {
        "id": "prompt_1",
        "title": "Extract Access Control Requirements",
        "content": "You are a compliance expert analyzing PCI DSS documents. Extract all access control requirements from the following text...",
        "description": "Extracts requirements related to access control",
        "category": "Access Control",
        "variables": {
          "documentText": "string",
          "jurisdiction": "string"
        },
        "exampleInput": "Sample document text...",
        "exampleOutput": "Extracted requirements...",
        "orderIndex": 1
      }
    ],
    "frameworks": ["PCI DSS"],
    "author": {
      "id": "507f1f77bcf86cd799439012",
      "username": "johndoe",
      "fullName": "John Doe"
    },
    "downloadCount": 245,
    "averageRating": 4.7,
    "createdAt": "2024-01-10T00:00:00Z"
  }
}
```

#### POST `/api/prompt-packs`
#### PATCH `/api/prompt-packs/:id`
#### DELETE `/api/prompt-packs/:id`
#### POST `/api/prompt-packs/:id/like`
#### POST `/api/prompt-packs/:id/download`

---

### Audit Logs Endpoints

#### GET `/api/audit-logs`
**Query Params:** `?action=CREATE&targetType=assessment&startDate=2024-01-01&endDate=2024-01-31&page=1&limit=50`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439027",
      "actor": "507f1f77bcf86cd799439012",
      "actorEmail": "user@example.com",
      "action": "CREATE",
      "target": "Q1 2024 PCI DSS Assessment",
      "targetType": "assessment",
      "targetId": "507f1f77bcf86cd799439014",
      "changes": {
        "name": "Q1 2024 PCI DSS Assessment",
        "status": "draft"
      },
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 456,
    "totalPages": 10
  }
}
```

#### GET `/api/audit-logs/:id`
**Response:** Single audit log entry

#### GET `/api/audit-logs/export`
**Query Params:** `?format=csv&startDate=2024-01-01&endDate=2024-01-31`
**Response:** CSV file download

---

### Vector Search Endpoints

#### POST `/api/vector-search/similarity`
**Request:**
```json
{
  "query": "multi-factor authentication requirements",
  "documentIds": ["507f1f77bcf86cd799439011"],
  "topK": 10,
  "filter": {
    "page": { "$gte": 40, "$lte": 50 }
  }
}
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "chunkId": "507f1f77bcf86cd799439013",
      "documentId": "507f1f77bcf86cd799439011",
      "page": 45,
      "text": "Multi-factor authentication must be implemented for all administrative access...",
      "similarityScore": 0.92,
      "metadata": {
        "sectionPath": "8.2.3",
        "clause": "8.2.3"
      }
    }
  ]
}
```

#### POST `/api/vector-search/citation-lookup`
**Request:**
```json
{
  "requirementText": "Multi-factor authentication must be implemented",
  "documentIds": ["507f1f77bcf86cd799439011"],
  "threshold": 0.85
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "citations": [
      {
        "doc": "507f1f77bcf86cd799439011",
        "page": 45,
        "clause": "8.2.3",
        "excerpt": "Multi-factor authentication must be implemented...",
        "confidence": 0.92
      }
    ]
  }
}
```

---

## 🤖 AI Processing Pipeline Architecture

### Document Processing Flow

```
1. Document Upload
   ↓
2. S3 Storage
   ↓
3. Job Queue (Bull)
   ↓
4. OCR Processing (if needed)
   - Tesseract OCR for scanned documents
   - Extract text from images
   ↓
5. PDF Text Extraction
   - pdf-parse for native PDFs
   - Extract text, metadata, structure
   ↓
6. Text Chunking
   - Semantic chunking (LangChain)
   - Preserve section hierarchy
   - Maintain page references
   ↓
7. Embedding Generation
   - OpenAI text-embedding-ada-002
   - Generate embeddings for each chunk
   ↓
8. Pinecone Storage
   - Store embeddings with metadata
   - Index: {tenantId}-{documentType}
   ↓
9. MongoDB Storage
   - Store chunks with references
   - Update document status to "ready"
```

### Assessment Execution Flow

```
1. User Creates Assessment
   - Select documents
   - Select prompt packs
   - Configure options
   ↓
2. Assessment Runner Service
   - Validate inputs
   - Create assessment record
   - Queue extraction jobs
   ↓
3. LangGraph Orchestration
   - Define extraction workflow
   - Parallel extraction pipelines
   ↓
4. Extraction Chains (LangChain)
   ├─ Requirements Extractor
   │  - Vector search for relevant chunks
   │  - LLM extraction with prompt pack
   │  - Citation matching
   │  - Confidence scoring
   │
   ├─ Controls Extractor
   │  - Similar process
   │
   ├─ Obligations Extractor
   │  - Extract legal obligations
   │  - Identify deadlines
   │
   ├─ Penalties Extractor
   │  - Extract penalty clauses
   │  - Identify penalty types
   │
   └─ Timelines Extractor
      - Extract deadline information
      - Identify triggers
   ↓
5. Clarification Detection
   - Identify UNCERTAIN extractions
   - Create clarification records
   - Flag for human review
   ↓
6. Results Storage
   - Store all extracted entities
   - Update assessment progress
   ↓
7. Gap Analysis
   - Compare requirements vs controls
   - Identify gaps
   - Generate findings
   ↓
8. Scoring & Prioritization
   - Calculate compliance scores
   - Residual risk assessment
   - Priority ranking
   ↓
9. Remediation Generation
   - AI-generated action plans
   - Effort estimation
   - Dependency mapping
   ↓
10. Assessment Completion
    - Update status
    - Generate summary
    - Trigger notifications
```

### LangChain Implementation Details

**Requirement Extraction Chain:**
```typescript
const requirementChain = new SequentialChain({
  chains: [
    // Step 1: Vector search for relevant chunks
    new VectorSearchChain({
      vectorStore: pineconeStore,
      query: "Extract compliance requirements",
      topK: 20
    }),
    
    // Step 2: LLM extraction with prompt pack
    new LLMChain({
      llm: new ChatOpenAI({ 
        modelName: "gpt-4-turbo",
        temperature: 0.1 
      }),
      prompt: requirementPromptTemplate,
      outputParser: new RequirementOutputParser()
    }),
    
    // Step 3: Citation matching
    new CitationChain({
      vectorStore: pineconeStore,
      similarityThreshold: 0.85
    }),
    
    // Step 4: Validation & confidence scoring
    new ValidationChain({
      validators: [
        mustShouldValidator,
        controlFamilyValidator,
        citationValidator
      ]
    })
  ]
})
```

**LangGraph Assessment Workflow:**
```typescript
const assessmentGraph = new StateGraph({
  nodes: {
    start: startNode,
    vectorSearch: vectorSearchNode,
    extractRequirements: requirementsNode,
    extractControls: controlsNode,
    extractObligations: obligationsNode,
    extractPenalties: penaltiesNode,
    extractTimelines: timelinesNode,
    clarificationCheck: clarificationNode,
    gapAnalysis: gapAnalysisNode,
    scoring: scoringNode,
    remediation: remediationNode,
    complete: completeNode
  },
  edges: [
    // Parallel extraction
    ["start", "vectorSearch"],
    ["vectorSearch", ["extractRequirements", "extractControls", "extractObligations", "extractPenalties", "extractTimelines"]],
    
    // Sequential processing
    [["extractRequirements", "extractControls", "extractObligations", "extractPenalties", "extractTimelines"], "clarificationCheck"],
    ["clarificationCheck", "gapAnalysis"],
    ["gapAnalysis", "scoring"],
    ["scoring", "remediation"],
    ["remediation", "complete"]
  ]
})
```

### MCP Integration Layer

**MCP Provider Interface:**
```typescript
interface MCPProvider {
  name: string
  type: 'openai' | 'anthropic' | 'azure' | 'custom'
  
  // Core methods
  generateCompletion(request: CompletionRequest): Promise<CompletionResponse>
  generateEmbedding(text: string): Promise<number[]>
  streamCompletion(request: CompletionRequest): AsyncIterable<CompletionChunk>
  
  // Context management
  setContext(context: MCPContext): void
  getUsage(): UsageMetrics
  
  // Error handling
  handleError(error: Error): MCPError
}

// Usage
const mcpService = new MCPService({
  providers: [
    new OpenAIProvider({ apiKey: process.env.OPENAI_API_KEY }),
    new AnthropicProvider({ apiKey: process.env.ANTHROPIC_API_KEY })
  ],
  defaultProvider: 'openai',
  fallbackProvider: 'anthropic'
})
```

### LangSmith Integration

**Tracing & Observability:**
```typescript
import { LangSmith } from 'langsmith'

// Initialize LangSmith
const langsmith = new LangSmith({
  apiKey: process.env.LANGSMITH_API_KEY,
  projectName: 'compliance-healthcheck'
})

// Wrap extraction chains with tracing
const tracedRequirementChain = langsmith.trace(
  requirementChain,
  {
    name: 'requirement-extraction',
    tags: ['extraction', 'requirements'],
    metadata: {
      assessmentId: 'xxx',
      documentId: 'yyy'
    }
  }
)

// Monitor performance
langsmith.on('trace', (trace) => {
  console.log(`Chain ${trace.name} took ${trace.duration}ms`)
  console.log(`Token usage: ${trace.tokenUsage}`)
  console.log(`Cost: $${trace.cost}`)
})
```

---

## 🔐 Security Requirements

### Authentication & Authorization

1. **JWT-based Authentication**
   - Access tokens (15 min expiry)
   - Refresh tokens (7 days expiry)
   - Secure token storage in httpOnly cookies

2. **Role-Based Access Control (RBAC)**
   - Roles: Admin, User, Auditor
   - Resource-level permissions
   - Tenant isolation

3. **Multi-Tenancy**
   - All queries filtered by tenantId
   - Data isolation at database level
   - Row-level security

### Data Security

1. **Encryption**
   - TLS 1.3 for data in transit
   - AES-256 for data at rest (S3)
   - Encrypted database connections

2. **Sensitive Data Handling**
   - PII redaction in logs
   - Secure credential management (AWS Secrets Manager)
   - Data retention policies

3. **Audit Trail**
   - Complete audit logging
   - Immutable audit records
   - Compliance with SOC 2 requirements

### API Security

1. **Rate Limiting**
   - Per-user limits
   - Per-endpoint limits
   - DDoS protection

2. **Input Validation**
   - DTO validation (class-validator)
   - Sanitization of user inputs
   - File upload restrictions

3. **Error Handling**
   - No sensitive data in error messages
   - Structured error responses
   - Error logging and monitoring

---

## 📊 Performance Requirements

### Response Time Targets

- API endpoints: < 200ms (p95)
- Document upload: < 5s for 50MB files
- Assessment execution: < 30 min for 500-page document
- Vector search: < 100ms (p95)

### Scalability

- Support 1000+ concurrent users
- Process 100+ documents simultaneously
- Handle 10,000+ assessments
- Store 1M+ document chunks

### Caching Strategy

- Redis caching for frequently accessed data
- Assessment results cached for 1 hour
- Document chunks cached per session
- User sessions in Redis

---

## 🚀 Deployment Architecture

### Infrastructure

```
┌─────────────────┐
│   Load Balancer │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│ NestJS│ │NestJS │
│ API 1 │ │API 2  │
└───┬───┘ └──┬────┘
    │        │
    └────┬───┘
         │
    ┌────▼─────────────┐
    │                  │
┌───▼──────┐  ┌────────▼─────┐
│ MongoDB  │  │   Pinecone   │
│ (Primary)│  │ (Vector DB)  │
└──────────┘  └──────────────┘
    │
┌───▼──────┐  ┌──────────────┐
│  Redis   │  │   AWS S3     │
│ (Cache)  │  │ (Documents)  │
└──────────┘  └──────────────┘
    │
┌───▼──────────────┐
│  Bull Queue      │
│  (Job Processing)│
└──────────────────┘
```

### Environment Variables

```bash
# Application
NODE_ENV=production
PORT=3000
API_PREFIX=api

# Database
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=compliance_healthcheck

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=...

# S3 Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET_NAME=compliance-docs

# Pinecone
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=compliance-embeddings

# OpenAI
OPENAI_API_KEY=...
OPENAI_ORG_ID=...

# Anthropic
ANTHROPIC_API_KEY=...

# LangSmith
LANGSMITH_API_KEY=...
LANGSMITH_PROJECT=compliance-healthcheck

# JWT
JWT_SECRET=...
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# MCP
MCP_DEFAULT_PROVIDER=openai
MCP_FALLBACK_PROVIDER=anthropic
```

---

## 📝 Implementation Priorities

### Phase 1: Core Infrastructure (Weeks 1-2)
- [ ] NestJS project setup with module structure
- [ ] MongoDB connection and schemas
- [ ] Redis integration
- [ ] S3 storage setup
- [ ] Authentication & authorization
- [ ] API endpoints structure

### Phase 2: Document Processing (Weeks 3-4)
- [ ] Document upload and storage
- [ ] OCR processing pipeline
- [ ] Text extraction and chunking
- [ ] Pinecone integration
- [ ] Embedding generation
- [ ] Background job processing

### Phase 3: AI Extraction (Weeks 5-7)
- [ ] LangChain integration
- [ ] LangGraph workflow setup
- [ ] Requirement extraction chain
- [ ] Control extraction chain
- [ ] Obligations, penalties, timelines extraction
- [ ] MCP provider abstraction
- [ ] LangSmith observability

### Phase 4: Assessment Engine (Weeks 8-9)
- [ ] Assessment creation and management
- [ ] Assessment runner service
- [ ] Progress tracking
- [ ] Clarification handling
- [ ] Gap analysis engine
- [ ] Scoring algorithms

### Phase 5: Remediation & Analytics (Weeks 10-11)
- [ ] Findings management
- [ ] Remediation action planning
- [ ] AI-powered prioritization
- [ ] Compliance scoring
- [ ] Dashboard analytics

### Phase 6: Additional Features (Week 12+)
- [ ] Attestation workflow
- [ ] Prompt pack management
- [ ] Audit logging
- [ ] Export functionality
- [ ] User management
- [ ] Performance optimization

---

## 🧪 Testing Requirements

### Unit Tests
- All services and utilities
- Target: 80%+ code coverage

### Integration Tests
- API endpoints
- Database operations
- External service integrations

### E2E Tests
- Complete assessment workflow
- Document processing pipeline
- User authentication flow

### Performance Tests
- Load testing (1000+ concurrent users)
- Stress testing (large documents)
- Vector search performance

---

## 📚 API Documentation

- **Swagger/OpenAPI**: Auto-generated from NestJS decorators
- **Endpoint**: `/api/docs`
- **Authentication**: JWT Bearer token
- **Rate Limits**: Documented per endpoint

---

## 🔄 Integration Checkpoints

### Frontend Integration Points

1. **Authentication Flow**
   - Login/Register/Logout endpoints
   - Token refresh mechanism
   - Session management

2. **Document Management**
   - Upload with progress tracking
   - List with filters and pagination
   - Download capabilities
   - Processing status updates

3. **Assessment Workflow**
   - Create assessment wizard
   - Run assessment with progress
   - View results and summary
   - Export functionality

4. **Compliance Management**
   - Requirements CRUD operations
   - Controls management
   - Obligations tracking
   - Penalties and timelines

5. **Gap Analysis & Remediation**
   - Findings with filters
   - Attestation workflow
   - Remediation planning
   - Progress tracking

6. **Real-time Updates**
   - WebSocket for progress updates
   - Assessment status changes
   - Processing notifications

---

## ⚠️ Critical Considerations

### Data Privacy & Compliance
- GDPR compliance for EU customers
- Data residency requirements
- Right to deletion implementation
- Data export capabilities

### Error Handling
- Graceful degradation
- Retry mechanisms for LLM calls
- Fallback providers
- Circuit breakers

### Monitoring & Observability
- Application metrics (Prometheus)
- Error tracking (Sentry)
- LLM call tracing (LangSmith)
- Performance monitoring (New Relic/DataDog)

### Cost Optimization
- LLM token usage tracking
- Efficient prompt engineering
- Caching strategies
- Batch processing

---

## 📞 Support & Documentation

- **API Documentation**: `/api/docs`
- **Postman Collection**: Provided separately
- **Architecture Diagrams**: In `/docs/architecture`
- **Deployment Guide**: In `/docs/deployment`

---

**END OF SPECIFICATION**

This specification should be used as the **single source of truth** for backend implementation. Any deviations or updates should be documented and communicated to the frontend team.