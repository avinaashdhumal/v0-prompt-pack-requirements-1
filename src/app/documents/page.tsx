"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { Upload, Plus, ArrowBack } from "lucide-react"
import { useDocuments } from "../../lib/hooks/useDocuments"
import { DocumentUpload } from "../../components/documents/DocumentUpload"
import { DocumentList } from "../../components/documents/DocumentList"
import Link from "next/link"

export default function DocumentsPage() {
  const { documents, loading, uploadDocument, isUploading } = useDocuments()
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Page Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Document Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Upload and manage regulatory documents, contracts, and policies for compliance assessment.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Plus />} onClick={() => setUploadDialogOpen(true)} size="large">
          Upload Document
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {documents.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Documents
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                {documents.filter((d) => d.status === "ready").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ready for Analysis
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                {documents.filter((d) => d.status === "processing").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Processing
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 700 }}>
                {documents.reduce((sum, d) => sum + (d.pages || 0), 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Pages
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Document List */}
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Documents
            </Typography>
            <Button variant="outlined" startIcon={<Upload />} onClick={() => setUploadDialogOpen(true)} size="small">
              Upload
            </Button>
          </Box>
          <DocumentList documents={documents} loading={loading} />
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upload Document
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DocumentUpload
            onUpload={(file, metadata) => {
              uploadDocument(file, metadata)
              setUploadDialogOpen(false)
            }}
            isUploading={isUploading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}