"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material"
import { Plus, Search, Download, Heart, Star, BookOpen } from "lucide-react"
import Link from "next/link"
import { mockPromptPacks } from "@/lib/mock-data"
import type { PromptPack } from "@/lib/types"

const categories = ["All", "Compliance", "Finance", "Healthcare", "Security", "Legal"]
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Most Recent" },
  { value: "downloads", label: "Most Downloads" },
  { value: "rating", label: "Highest Rated" },
]

export default function PacksPage() {
  const [packs, setPacks] = useState<PromptPack[]>([])
  const [filteredPacks, setFilteredPacks] = useState<PromptPack[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")

  useEffect(() => {
    setPacks(mockPromptPacks)
    setFilteredPacks(mockPromptPacks)
  }, [])

  useEffect(() => {
    let result = [...packs]

    // Filter by search
    if (searchQuery) {
      result = result.filter(
        (pack) =>
          pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pack.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((pack) =>
        pack.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase())
      )
    }

    // Sort
    switch (sortBy) {
      case "recent":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "downloads":
        result.sort((a, b) => b.downloadCount - a.downloadCount)
        break
      case "rating":
        result.sort((a, b) => b.averageRating - a.averageRating)
        break
      default:
        result.sort((a, b) => b.downloadCount - a.downloadCount)
    }

    setFilteredPacks(result)
  }, [searchQuery, selectedCategory, sortBy, packs])

  const PackCard = ({ pack }: { pack: PromptPack }) => (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1, lineHeight: 1.3 }}>
            {pack.title}
          </Typography>
          {pack.author && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar src={pack.author.avatarUrl} sx={{ width: 20, height: 20, mr: 1 }}>
                {pack.author.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                {pack.author.username}
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.4 }}>
          {pack.description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
          {pack.tags.slice(0, 3).map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
          {pack.tags.length > 3 && <Chip label={`+${pack.tags.length - 3}`} size="small" variant="outlined" />}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Download size={14} />
            <Typography variant="body2" color="text.secondary">
              {pack.downloadCount.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Heart size={14} />
            <Typography variant="body2" color="text.secondary">
              {pack.likeCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Star size={14} />
            <Typography variant="body2" color="text.secondary">
              {pack.averageRating.toFixed(1)}
            </Typography>
          </Box>
        </Box>

        <Button component={Link} href={`/packs/${pack.id}`} variant="outlined" fullWidth size="small">
          View Details
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Page Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Prompt Packs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse and discover prompt packs from the community.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Plus size={20} />} component={Link} href="/create" size="large">
          Create Pack
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {packs.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Packs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                {packs.reduce((sum, p) => sum + p.downloadCount, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Downloads
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 700 }}>
                {categories.length - 1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categories
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Search packs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category)}
                    color={selectedCategory === category ? "primary" : "default"}
                    variant={selectedCategory === category ? "filled" : "outlined"}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Packs Grid */}
      {filteredPacks.length > 0 ? (
        <Grid container spacing={3}>
          {filteredPacks.map((pack) => (
            <Grid item xs={12} sm={6} md={4} key={pack.id}>
              <PackCard pack={pack} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <BookOpen size={48} style={{ color: "#9CA3AF", marginBottom: 16 }} />
            <Typography variant="h6" gutterBottom>
              No packs found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search or filters
            </Typography>
            <Button variant="outlined" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}