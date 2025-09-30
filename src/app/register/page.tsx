"use client"

import { Box, Container } from "@mui/material"
import dynamic from "next/dynamic"
import { AuthGuard } from "@/components/auth/auth-guard"

const RegisterForm = dynamic(() => import("@/components/auth/register-form").then((m) => m.RegisterForm), {
  ssr: false,
})

export default function RegisterPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <RegisterForm />
        </Container>
      </Box>
    </AuthGuard>
  )
}