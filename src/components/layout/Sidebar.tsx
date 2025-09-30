"use client"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Avatar,
  Button,
} from "@mui/material"
import { Dashboard, Description, Assessment, FindInPage, Build, People, Settings, Logout } from "@mui/icons-material"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/hooks/useAuth"

const drawerWidth = 240

const menuItems = [
  { text: "Dashboard", icon: Dashboard, path: "/dashboard" },
  { text: "Documents", icon: Description, path: "/documents" },
  { text: "Assessments", icon: Assessment, path: "/assessments" },
  { text: "Findings", icon: FindInPage, path: "/findings" },
  { text: "Remediation", icon: Build, path: "/remediation" },
  { text: "Users", icon: People, path: "/users" },
  { text: "Settings", icon: Settings, path: "/settings" },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Assessment sx={{ mr: 1, color: "primary.contrastText" }} />
          <Typography variant="h6" noWrap component="div" sx={{ color: "primary.contrastText" }}>
            ComplianceHQ
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />

      {user && (
        <Box sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.contrastText", color: "primary.main" }}>
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium" sx={{ color: "primary.contrastText" }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {user.role.replace("_", " ")}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => router.push(item.path)}
              sx={{
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  color: "primary.contrastText",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.24)",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            borderColor: "primary.contrastText",
            color: "primary.contrastText",
            "&:hover": {
              borderColor: "primary.contrastText",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Drawer>
  )
}