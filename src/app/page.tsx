"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Upload, 
  FileText, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Brain,
  Lock,
  Zap,
  FileCheck,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  AppBar,
  Toolbar,
  CircularProgress,
  Stack
} from "@mui/material"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Box 
        sx={{ 
          minHeight: "100vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          bgcolor: "background.default"
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography color="text.secondary">Loading...</Typography>
        </Box>
      </Box>
    )
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Navigation */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: "rgba(255, 255, 255, 0.8)", 
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid",
          borderColor: "divider"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}>
              <Box sx={{ position: "relative" }}>
                <Shield size={32} color="#212121" strokeWidth={2.5} />
                <Sparkles size={16} style={{ position: "absolute", top: -4, right: -4 }} />
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #212121, #757575)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Compliance HealthCheck
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button 
                component={Link} 
                href="/login" 
                sx={{ color: "text.secondary" }}
              >
                Sign In
              </Button>
              <Button 
                component={Link} 
                href="/dashboard" 
                variant="contained"
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: "0 4px 12px rgba(33, 33, 33, 0.25)"
                  }
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ pt: 20, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <motion.div {...fadeInUp}>
              <Chip 
                icon={<Sparkles size={16} />}
                label="AI-Powered Compliance Intelligence"
                sx={{ 
                  mb: 3,
                  bgcolor: "rgba(117, 117, 117, 0.1)",
                  border: "1px solid rgba(117, 117, 117, 0.2)",
                  fontWeight: 600
                }}
              />
            </motion.div>
            
            <motion.div {...fadeInUp}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
                  fontWeight: 700,
                  mb: 3,
                  lineHeight: 1.1
                }}
              >
                Transform Compliance
                <br />
                <Box 
                  component="span" 
                  sx={{ 
                    background: "linear-gradient(90deg, #212121, #757575, #212121)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  From Burden to Advantage
                </Box>
              </Typography>
            </motion.div>
            
            <motion.div {...fadeInUp}>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ mb: 4, maxWidth: "800px", mx: "auto", fontWeight: 400 }}
              >
                Upload regulations, contracts, or policies. Our AI instantly extracts requirements, identifies gaps, 
                and delivers a prioritized remediation roadmap—all with clause-level citations.
              </Typography>
            </motion.div>
            
            <motion.div {...fadeInUp}>
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={2} 
                justifyContent="center"
                sx={{ mb: 6 }}
              >
                <Button 
                  component={Link} 
                  href="/documents"
                  variant="contained"
                  size="large"
                  startIcon={<Upload size={20} />}
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      boxShadow: "0 8px 24px rgba(33, 33, 33, 0.3)"
                    }
                  }}
                >
                  Start Free Assessment
                </Button>
                <Button 
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: "primary.main"
                    }
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={4} 
                justifyContent="center"
                sx={{ color: "text.secondary" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircle2 size={20} color="#16a34a" />
                  <Typography variant="body2">Free to Start</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Lock size={20} color="#16a34a" />
                  <Typography variant="body2">Enterprise Security</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Clock size={20} color="#16a34a" />
                  <Typography variant="body2">Results in Minutes</Typography>
                </Box>
              </Stack>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Box sx={{ py: 10, bgcolor: "rgba(245, 245, 245, 0.3)" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              From Document to Action in{" "}
              <Box component="span" color="primary.main">4 Simple Steps</Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Our AI-powered engine handles the heavy lifting so you can focus on what matters
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                icon: Upload,
                title: "Upload Documents",
                description: "Drop your PDFs, regulations, contracts, or policies. We support OCR and multi-language processing.",
                color: "#2563eb"
              },
              {
                icon: Brain,
                title: "AI Analysis",
                description: "Advanced LLM extracts requirements, risks, obligations, penalties, and timelines with precise citations.",
                color: "#10b981"
              },
              {
                icon: FileCheck,
                title: "Attest Controls",
                description: "Mark requirements as Have/Partial/Don't Have. Add evidence and notes for each control.",
                color: "#f59e0b"
              },
              {
                icon: BarChart3,
                title: "Get Roadmap",
                description: "Receive compliance scores, risk heatmaps, and prioritized remediation plans with effort estimates.",
                color: "#8b5cf6"
              }
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <Grid item xs={12} sm={6} lg={3} key={step.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      sx={{ 
                        height: "100%",
                        position: "relative",
                        transition: "all 0.3s",
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: "0 8px 24px rgba(33, 33, 33, 0.1)"
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box 
                          sx={{ 
                            display: "inline-flex", 
                            p: 1.5, 
                            bgcolor: "rgba(245, 245, 245, 1)", 
                            borderRadius: 2,
                            mb: 2
                          }}
                        >
                          <Icon size={24} color={step.color} />
                        </Box>
                        <Typography 
                          variant="h1" 
                          sx={{ 
                            position: "absolute", 
                            top: 16, 
                            right: 16, 
                            fontSize: "3rem",
                            color: "rgba(33, 33, 33, 0.05)",
                            fontWeight: 700
                          }}
                        >
                          {index + 1}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* Key Features */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Built for{" "}
              <Box 
                component="span" 
                sx={{ 
                  background: "linear-gradient(90deg, #212121, #757575)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Regulated Enterprises
              </Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Enterprise-grade capabilities designed for BFSI, healthcare, and critical infrastructure
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: Shield,
                title: "Pre-Built Prompt Packs",
                description: "Ready-to-use templates for PCI DSS, ISO 27001, GDPR, AML/KYC, SOX, Basel III, and more.",
                color: "#2563eb"
              },
              {
                icon: FileText,
                title: "Clause-Level Citations",
                description: "Every finding includes document name, page number, and clause reference for audit trails.",
                color: "#10b981"
              },
              {
                icon: AlertTriangle,
                title: "Risk Scoring Engine",
                description: "Impact × Likelihood analysis with control family weighting and residual risk calculation.",
                color: "#f59e0b"
              },
              {
                icon: Lock,
                title: "Bank-Grade Security",
                description: "AES-256 encryption, tenant isolation, audit logs, and region-locked processing available.",
                color: "#10b981"
              },
              {
                icon: Zap,
                title: "Automated Remediation",
                description: "Prioritized action plans with effort estimates, ownership suggestions, and dependency tracking.",
                color: "#f59e0b"
              },
              {
                icon: TrendingUp,
                title: "Compliance Trends",
                description: "Track scores over time, compare assessments, and demonstrate continuous improvement.",
                color: "#8b5cf6"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Grid item xs={12} sm={6} lg={4} key={feature.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      sx={{ 
                        height: "100%",
                        background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}05 100%)`,
                        transition: "all 0.3s",
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: "0 8px 24px rgba(33, 33, 33, 0.15)"
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box 
                          sx={{ 
                            display: "inline-flex", 
                            p: 1.5, 
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            mb: 2
                          }}
                        >
                          <Icon size={24} color={feature.color} />
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* Supported Frameworks */}
      <Box sx={{ py: 10, bgcolor: "rgba(245, 245, 245, 0.3)" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Pre-Tuned for Leading Frameworks
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Industry-specific prompt packs and control mappings ready out of the box
            </Typography>
          </Box>

          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center" }}>
                {[
                  { name: "PCI DSS", category: "Payment" },
                  { name: "ISO 27001", category: "InfoSec" },
                  { name: "SOX", category: "Financial" },
                  { name: "GDPR", category: "Privacy" },
                  { name: "AML/KYC", category: "Banking" },
                  { name: "Basel III", category: "Banking" },
                  { name: "MiFID II", category: "Financial" },
                  { name: "CCPA", category: "Privacy" },
                  { name: "HIPAA", category: "Healthcare" },
                  { name: "NIST CSF", category: "InfoSec" },
                  { name: "FedRAMP", category: "Government" },
                  { name: "AI Governance", category: "Emerging" }
                ].map((framework) => (
                  <Card 
                    key={framework.name}
                    sx={{ 
                      cursor: "pointer",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "rgba(33, 33, 33, 0.05)"
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {framework.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {framework.category}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="md">
          <Card 
            sx={{ 
              background: "linear-gradient(135deg, #212121 0%, #424242 100%)",
              color: "white",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 8 }, textAlign: "center", position: "relative", zIndex: 1 }}>
              <Typography variant="h2" sx={{ color: "white", mb: 2 }}>
                Ready to Accelerate Compliance?
              </Typography>
              <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.9)", mb: 4, fontWeight: 400 }}>
                Join leading enterprises using AI to transform regulatory compliance from reactive to proactive
              </Typography>
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={2} 
                justifyContent="center"
              >
                <Button 
                  component={Link} 
                  href="/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: "white",
                    color: "#212121",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.9)",
                      boxShadow: "0 8px 24px rgba(255, 255, 255, 0.3)"
                    }
                  }}
                >
                  Start Free Assessment
                </Button>
                <Button 
                  component={Link} 
                  href="/dashboard"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: "rgba(255,255,255,0.5)",
                      bgcolor: "rgba(255,255,255,0.1)"
                    }
                  }}
                >
                  View Dashboard
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        sx={{ 
          borderTop: "1px solid",
          borderColor: "divider",
          py: 6,
          bgcolor: "rgba(245, 245, 245, 0.3)"
        }}
      >
        <Container maxWidth="xl">
          <Stack 
            direction={{ xs: "column", md: "row" }} 
            justifyContent="space-between" 
            alignItems="center" 
            spacing={3}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Shield size={24} color="#212121" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Compliance HealthCheck
              </Typography>
            </Box>
            <Stack 
              direction="row" 
              spacing={3} 
              alignItems="center"
              sx={{ fontSize: "0.875rem", color: "text.secondary" }}
            >
              <Typography variant="body2">© 2025 All rights reserved</Typography>
              <Typography variant="body2">•</Typography>
              <Link href="#" style={{ color: "inherit", textDecoration: "none" }}>
                <Typography variant="body2" sx={{ "&:hover": { color: "text.primary" } }}>Privacy</Typography>
              </Link>
              <Typography variant="body2">•</Typography>
              <Link href="#" style={{ color: "inherit", textDecoration: "none" }}>
                <Typography variant="body2" sx={{ "&:hover": { color: "text.primary" } }}>Terms</Typography>
              </Link>
              <Typography variant="body2">•</Typography>
              <Link href="#" style={{ color: "inherit", textDecoration: "none" }}>
                <Typography variant="body2" sx={{ "&:hover": { color: "text.primary" } }}>Contact</Typography>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}