import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div style={{ padding: "32px", maxWidth: "1280px", margin: "0 auto" }}>
        <DashboardContent />
      </div>
    </AuthGuard>
  )
}