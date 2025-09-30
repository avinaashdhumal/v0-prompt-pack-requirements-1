/**
 * Centralized Fake Database Service
 * Provides full CRUD operations for all entities with localStorage persistence
 */

import type { Assessment } from "./slices/assessmentsSlice"
import type { Document } from "./slices/documentsSlice"
import type { PromptPack, Prompt, Rating } from "./types"

// Storage keys
const STORAGE_KEYS = {
  ASSESSMENTS: "fake_db_assessments",
  DOCUMENTS: "fake_db_documents",
  PACKS: "fake_db_packs",
  PROMPTS: "fake_db_prompts",
  RATINGS: "fake_db_ratings",
  FINDINGS: "fake_db_findings",
  REMEDIATION: "fake_db_remediation",
}

// Helper functions
const getFromStorage = <T>(key: string, defaultValue: T[]): T[] => {
  if (typeof window === "undefined") return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

const saveToStorage = <T>(key: string, data: T[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

// Initial mock data
const initialAssessments: Assessment[] = [
  {
    id: "1",
    name: "Q1 2024 PCI DSS Assessment",
    promptPacks: ["pci_dss", "iso_27001"],
    documentIds: ["1", "2"],
    jurisdiction: "US",
    status: "completed",
    createdAt: "2024-01-15T10:30:00Z",
    completedAt: "2024-01-15T11:45:00Z",
    tenantId: "tenant_1",
    score: {
      total: 78,
      residualRisk: "Medium",
      familyBreakdown: {
        "Access Control": 85,
        "Data Protection": 70,
        Governance: 60,
        "Incident Response": 90,
        "Third Party": 55,
        "Business Continuity": 65,
      },
    },
  },
  {
    id: "2",
    name: "SOX Compliance Review",
    promptPacks: ["sox"],
    documentIds: ["4"],
    jurisdiction: "US",
    status: "completed",
    createdAt: "2024-01-12T16:45:00Z",
    completedAt: "2024-01-12T17:30:00Z",
    tenantId: "tenant_1",
    score: {
      total: 92,
      residualRisk: "Low",
      familyBreakdown: {
        "Financial Controls": 95,
        "Audit Trail": 88,
        "Access Management": 94,
      },
    },
  },
]

const initialDocuments: Document[] = [
  {
    id: "1",
    name: "PCI DSS Requirements v4.0.pdf",
    type: "regulation",
    size: 2048000,
    uploadedAt: "2024-01-15T10:30:00Z",
    status: "ready",
    pages: 45,
    tenantId: "tenant_1",
    hash: "abc123",
  },
  {
    id: "2",
    name: "Third Party Vendor Agreement.pdf",
    type: "contract",
    size: 1024000,
    uploadedAt: "2024-01-14T14:20:00Z",
    status: "ready",
    pages: 12,
    tenantId: "tenant_1",
    hash: "def456",
  },
]

// Database class
class FakeDatabase {
  // ASSESSMENTS CRUD
  async getAssessments(): Promise<Assessment[]> {
    await this.simulateDelay()
    const stored = getFromStorage(STORAGE_KEYS.ASSESSMENTS, initialAssessments)
    return stored
  }

  async getAssessment(id: string): Promise<Assessment | null> {
    await this.simulateDelay()
    const assessments = getFromStorage(STORAGE_KEYS.ASSESSMENTS, initialAssessments)
    return assessments.find((a) => a.id === id) || null
  }

  async createAssessment(data: Omit<Assessment, "id" | "createdAt" | "tenantId">): Promise<Assessment> {
    await this.simulateDelay()
    const assessments = getFromStorage(STORAGE_KEYS.ASSESSMENTS, initialAssessments)
    const newAssessment: Assessment = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      tenantId: "tenant_1",
    }
    assessments.push(newAssessment)
    saveToStorage(STORAGE_KEYS.ASSESSMENTS, assessments)
    return newAssessment
  }

  async updateAssessment(id: string, updates: Partial<Assessment>): Promise<Assessment> {
    await this.simulateDelay()
    const assessments = getFromStorage(STORAGE_KEYS.ASSESSMENTS, initialAssessments)
    const index = assessments.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Assessment not found")
    
    assessments[index] = { ...assessments[index], ...updates }
    saveToStorage(STORAGE_KEYS.ASSESSMENTS, assessments)
    return assessments[index]
  }

  async deleteAssessment(id: string): Promise<void> {
    await this.simulateDelay()
    const assessments = getFromStorage(STORAGE_KEYS.ASSESSMENTS, initialAssessments)
    const filtered = assessments.filter((a) => a.id !== id)
    saveToStorage(STORAGE_KEYS.ASSESSMENTS, filtered)
  }

  async runAssessment(id: string): Promise<Assessment> {
    await this.simulateDelay(3000) // Longer delay for running
    const assessments = getFromStorage(STORAGE_KEYS.ASSESSMENTS, initialAssessments)
    const index = assessments.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Assessment not found")

    assessments[index] = {
      ...assessments[index],
      status: "completed",
      completedAt: new Date().toISOString(),
      score: {
        total: Math.floor(Math.random() * 40) + 60,
        residualRisk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as "Low" | "Medium" | "High",
        familyBreakdown: {
          "Access Control": Math.floor(Math.random() * 40) + 60,
          "Data Protection": Math.floor(Math.random() * 40) + 60,
          Governance: Math.floor(Math.random() * 40) + 60,
          "Incident Response": Math.floor(Math.random() * 40) + 60,
          "Third Party": Math.floor(Math.random() * 40) + 60,
          "Business Continuity": Math.floor(Math.random() * 40) + 60,
        },
      },
    }
    saveToStorage(STORAGE_KEYS.ASSESSMENTS, assessments)
    return assessments[index]
  }

  // DOCUMENTS CRUD
  async getDocuments(): Promise<Document[]> {
    await this.simulateDelay()
    return getFromStorage(STORAGE_KEYS.DOCUMENTS, initialDocuments)
  }

  async getDocument(id: string): Promise<Document | null> {
    await this.simulateDelay()
    const documents = getFromStorage(STORAGE_KEYS.DOCUMENTS, initialDocuments)
    return documents.find((d) => d.id === id) || null
  }

  async createDocument(file: File, metadata: { type: Document["type"]; description?: string }): Promise<Document> {
    await this.simulateDelay(2000)
    const documents = getFromStorage(STORAGE_KEYS.DOCUMENTS, initialDocuments)
    const newDocument: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: metadata.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: "ready",
      tenantId: "tenant_1",
      hash: Math.random().toString(36).substring(7),
      pages: Math.floor(Math.random() * 50) + 5,
    }
    documents.push(newDocument)
    saveToStorage(STORAGE_KEYS.DOCUMENTS, documents)
    return newDocument
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
    await this.simulateDelay()
    const documents = getFromStorage(STORAGE_KEYS.DOCUMENTS, initialDocuments)
    const index = documents.findIndex((d) => d.id === id)
    if (index === -1) throw new Error("Document not found")
    
    documents[index] = { ...documents[index], ...updates }
    saveToStorage(STORAGE_KEYS.DOCUMENTS, documents)
    return documents[index]
  }

  async deleteDocument(id: string): Promise<void> {
    await this.simulateDelay()
    const documents = getFromStorage(STORAGE_KEYS.DOCUMENTS, initialDocuments)
    const filtered = documents.filter((d) => d.id !== id)
    saveToStorage(STORAGE_KEYS.DOCUMENTS, filtered)
  }

  // PACKS CRUD
  async getPacks(): Promise<PromptPack[]> {
    await this.simulateDelay()
    // Return from mock-data
    return []
  }

  async getPack(id: string): Promise<PromptPack | null> {
    await this.simulateDelay()
    return null
  }

  async createPack(data: Omit<PromptPack, "id" | "createdAt" | "updatedAt">): Promise<PromptPack> {
    await this.simulateDelay()
    const packs = getFromStorage<PromptPack>(STORAGE_KEYS.PACKS, [])
    const newPack: PromptPack = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    packs.push(newPack)
    saveToStorage(STORAGE_KEYS.PACKS, packs)
    return newPack
  }

  async updatePack(id: string, updates: Partial<PromptPack>): Promise<PromptPack> {
    await this.simulateDelay()
    const packs = getFromStorage<PromptPack>(STORAGE_KEYS.PACKS, [])
    const index = packs.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Pack not found")
    
    packs[index] = { ...packs[index], ...updates, updatedAt: new Date().toISOString() }
    saveToStorage(STORAGE_KEYS.PACKS, packs)
    return packs[index]
  }

  async deletePack(id: string): Promise<void> {
    await this.simulateDelay()
    const packs = getFromStorage<PromptPack>(STORAGE_KEYS.PACKS, [])
    const filtered = packs.filter((p) => p.id !== id)
    saveToStorage(STORAGE_KEYS.PACKS, filtered)
  }

  async likePack(id: string, userId: string): Promise<void> {
    await this.simulateDelay()
    // Increment like count
  }

  async ratePack(packId: string, rating: number, comment: string, userId: string): Promise<Rating> {
    await this.simulateDelay()
    const ratings = getFromStorage<Rating>(STORAGE_KEYS.RATINGS, [])
    const newRating: Rating = {
      id: Date.now().toString(),
      packId,
      userId,
      username: "User",
      rating,
      comment,
      createdAt: new Date().toISOString(),
      helpful: 0,
    }
    ratings.push(newRating)
    saveToStorage(STORAGE_KEYS.RATINGS, ratings)
    return newRating
  }

  // FINDINGS CRUD
  async getFindings(): Promise<any[]> {
    await this.simulateDelay()
    return getFromStorage(STORAGE_KEYS.FINDINGS, [])
  }

  async createFinding(data: any): Promise<any> {
    await this.simulateDelay()
    const findings = getFromStorage(STORAGE_KEYS.FINDINGS, [])
    const newFinding = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    findings.push(newFinding)
    saveToStorage(STORAGE_KEYS.FINDINGS, findings)
    return newFinding
  }

  async updateFinding(id: string, updates: any): Promise<any> {
    await this.simulateDelay()
    const findings = getFromStorage(STORAGE_KEYS.FINDINGS, [])
    const index = findings.findIndex((f: any) => f.id === id)
    if (index === -1) throw new Error("Finding not found")
    
    findings[index] = { ...findings[index], ...updates }
    saveToStorage(STORAGE_KEYS.FINDINGS, findings)
    return findings[index]
  }

  async deleteFinding(id: string): Promise<void> {
    await this.simulateDelay()
    const findings = getFromStorage(STORAGE_KEYS.FINDINGS, [])
    const filtered = findings.filter((f: any) => f.id !== id)
    saveToStorage(STORAGE_KEYS.FINDINGS, filtered)
  }

  // REMEDIATION CRUD
  async getRemediations(): Promise<any[]> {
    await this.simulateDelay()
    return getFromStorage(STORAGE_KEYS.REMEDIATION, [])
  }

  async createRemediation(data: any): Promise<any> {
    await this.simulateDelay()
    const remediations = getFromStorage(STORAGE_KEYS.REMEDIATION, [])
    const newRemediation = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    remediations.push(newRemediation)
    saveToStorage(STORAGE_KEYS.REMEDIATION, remediations)
    return newRemediation
  }

  async updateRemediation(id: string, updates: any): Promise<any> {
    await this.simulateDelay()
    const remediations = getFromStorage(STORAGE_KEYS.REMEDIATION, [])
    const index = remediations.findIndex((r: any) => r.id === id)
    if (index === -1) throw new Error("Remediation not found")
    
    remediations[index] = { ...remediations[index], ...updates }
    saveToStorage(STORAGE_KEYS.REMEDIATION, remediations)
    return remediations[index]
  }

  async deleteRemediation(id: string): Promise<void> {
    await this.simulateDelay()
    const remediations = getFromStorage(STORAGE_KEYS.REMEDIATION, [])
    const filtered = remediations.filter((r: any) => r.id !== id)
    saveToStorage(STORAGE_KEYS.REMEDIATION, filtered)
  }

  // Helper
  private async simulateDelay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// Export singleton instance
export const fakeDB = new FakeDatabase()