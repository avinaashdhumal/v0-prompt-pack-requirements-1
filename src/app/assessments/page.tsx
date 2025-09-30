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
import { Plus } from "lucide-react"
import Link from "next/link"
import { useAssessments } from "../../lib/hooks/useAssessments"
import { AssessmentWizard } from "../../components/assessments/AssessmentWizard"
import { AssessmentList } from "../../components/assessments/AssessmentList"

export default function AssessmentsPage() {
  const { assessments, loading, createAssessment, runAssessment, deleteAssessment } = useAssessments()
  const [wizardOpen, setWizardOpen] = useState(false)

  const getStatusStats = () => {
    const stats = {
      total: assessments.length,
      completed: assessments.filter((a) => a.status === "completed").length,
      running: assessments.filter((a) => a.status === "running").length,
      draft: assessments.filter((a) => a.status === "draft").length,
    }
    return stats
  }

  const stats = getStatusStats()

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Page Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Compliance Assessments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage AI-powered compliance assessments using regulatory prompt packs.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Plus />} onClick={() => setWizardOpen(true)} size="large">
          New Assessment
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Assessments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                {stats.completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                {stats.running}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Running
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 700 }}>
                {stats.draft}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Drafts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Assessment List */}
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Assessments
            </Typography>
            <Button variant="outlined" startIcon={<Plus />} onClick={() => setWizardOpen(true)} size="small">
              Create New
            </Button>
          </Box>
          <AssessmentList 
            assessments={assessments} 
            loading={loading} 
            onRunAssessment={runAssessment}
            onDeleteAssessment={deleteAssessment}
          />
        </CardContent>
      </Card>

      {/* Assessment Wizard Dialog */}
      <Dialog
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Create New Assessment
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AssessmentWizard
            onComplete={(assessmentData) => {
              createAssessment(assessmentData)
              setWizardOpen(false)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWizardOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}