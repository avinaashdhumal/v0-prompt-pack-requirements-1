"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Container, Box, Typography, CircularProgress, Button } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import { PromptPackViewer } from "@/components/packs/prompt-pack-viewer"
import { mockPromptPacks, mockPrompts, mockRatings } from "@/lib/mock-data"
import type { PromptPack, Prompt, Rating } from "@/lib/types"

export default function PromptPackPage() {
  const params = useParams()
  const router = useRouter()
  const packId = params.id as string

  const [pack, setPack] = useState<PromptPack | null>(null)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPackData = async () => {
      try {
        setLoading(true)

        // Mock API calls - in real app, fetch from API
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate loading

        const packData = mockPromptPacks.find((p) => p.id === packId)
        if (!packData) {
          setError("Prompt pack not found")
          return
        }

        const packPrompts = mockPrompts.filter((p) => p.packId === packId)
        const packRatings = mockRatings.filter((r) => r.packId === packId)

        setPack(packData)
        setPrompts(packPrompts)
        setRatings(packRatings)
      } catch (err) {
        setError("Failed to load prompt pack")
      } finally {
        setLoading(false)
      }
    }

    if (packId) {
      loadPackData()
    }
  }, [packId])

  const handleDownload = () => {
    console.log("Downloading pack:", packId)
    // In real app, trigger actual download
  }

  const handleLike = (liked: boolean) => {
    if (!pack) return
    setPack({
      ...pack,
      likeCount: liked ? pack.likeCount + 1 : pack.likeCount - 1,
    })
  }

  const handleRate = (newRating: Rating) => {
    setRatings((prev) => [newRating, ...prev])
    if (pack) {
      // Recalculate average
      const totalRating = ratings.reduce((sum, r) => sum + r.rating, newRating.rating)
      const newAverage = totalRating / (ratings.length + 1)
      setPack({
        ...pack,
        averageRating: newAverage,
        ratingCount: pack.ratingCount + 1,
      })
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error || !pack) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Button
            startIcon={<ArrowLeft size={16} />}
            onClick={() => router.push("/packs")}
            sx={{ mb: 3 }}
          >
            Back to Packs
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              {error || "Prompt pack not found"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The prompt pack you're looking for doesn't exist or has been removed.
            </Typography>
          </Box>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowLeft size={16} />}
        onClick={() => router.push("/packs")}
        sx={{ mb: 3 }}
      >
        Back to Packs
      </Button>
      <PromptPackViewer 
        pack={pack} 
        prompts={prompts} 
        ratings={ratings}
        onDownload={handleDownload}
        onLike={handleLike}
        onRate={handleRate}
      />
    </Container>
  )
}