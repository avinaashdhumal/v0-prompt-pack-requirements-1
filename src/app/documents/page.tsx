"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
  Chip,
} from "@mui/material"
import { Upload, Plus, Sparkles, FileText, CheckCircle2, Clock, Files } from "lucide-react"
import { useDocuments } from "../../lib/hooks/useDocuments"
import { DocumentUpload } from "../../components/documents/DocumentUpload"
import { DocumentList } from "../../components/documents/DocumentList"

export default function DocumentsPage() {
  const { documents, loading, uploadDocument, isUploading } = useDocuments()
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const statCards = [
    {
      label: "Total Documents",
      value: documents.length,
      icon: FileText,
      color: "primary.main",
      bgColor: "rgba(69, 56, 202, 0.1)",
      gradient: "linear-gradient(135deg, rgba(69, 56, 202, 0.05) 0%, transparent 100%)",
    },
    {
      label: "Ready for Analysis",
      value: documents.filter((d) => d.status === "ready").length,
      icon: CheckCircle2,
      color: "success.main",
      bgColor: "rgba(16, 185, 129, 0.1)",
      gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)",
    },
    {
      label: "Processing",
      value: documents.filter((d) => d.status === "processing").length,
      icon: Clock,
      color: "warning.main",
      bgColor: "rgba(245, 158, 11, 0.1)",
      gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, transparent 100%)",
    },
    {
      label: "Total Pages",
      value: documents.reduce((sum, d) => sum + (d.pages || 0), 0),
      icon: Files,
      color: "info.main",
      bgColor: "rgba(59, 130, 246, 0.1)",
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)",
    },
  ]

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: "100vh",
      background: "linear-gradient(135deg, rgba(69, 56, 202, 0.03) 0%, transparent 50%, rgba(16, 185, 129, 0.03) 100%)",
    }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                  Document Management
                </Typography>
                <Chip
                  icon={<Sparkles size={14} />}
                  label="AI-Ready"
                  size="small"
                  sx={{
                    bgcolor: "rgba(16, 185, 129, 0.1)",
                    color: "success.main",
                    fontWeight: 600,
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
                Upload and manage regulatory documents, contracts, and policies for AI-powered compliance assessment.
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<Plus />} 
              onClick={() => setUploadDialogOpen(true)} 
              size="large"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                background: "linear-gradient(135deg, rgba(69, 56, 202, 1) 0%, rgba(16, 185, 129, 1) 100%)",
                boxShadow: "0 4px 12px rgba(69, 56, 202, 0.25)",
                "&:hover": {
                  background: "linear-gradient(135deg, rgba(59, 46, 172, 1) 0%, rgba(14, 165, 115, 1) 100%)",
                  boxShadow: "0 6px 20px rgba(69, 56, 202, 0.35)",
                },
              }}
            >
              Upload Document
            </Button>
          </Box>
        </motion.div>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4, width: "100%" }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    minHeight: 160,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    background: stat.gradient,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: stat.color,
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 24px ${stat.bgColor}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1.5 }}>
                          {stat.label}
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color }}>
                          {stat.value}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: stat.bgColor,
                          display: "inline-flex",
                          flexShrink: 0,
                          ml: 2,
                        }}
                      >
                        <stat.icon size={24} style={{ color: stat.color }} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Document List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Documents
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage your uploaded regulatory documents and policies
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  startIcon={<Upload />} 
                  onClick={() => setUploadDialogOpen(true)} 
                  size="small"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Upload
                </Button>
              </Box>
              <DocumentList documents={documents} loading={loading} />
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 3,
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.15)",
          } 
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Sparkles size={20} style={{ color: "var(--color-primary)" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Upload Document
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Upload regulations, contracts, or policies for AI-powered analysis
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
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setUploadDialogOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}