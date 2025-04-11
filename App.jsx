
import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)
  const { toast } = useToast()

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://stream-url-here.com/stream") // Replace with your actual stream URL
      audioRef.current.volume = volume
    }

    if (isPlaying) {
      audioRef.current.pause()
      toast({
        title: "Radio pausada",
        description: "La transmisión se ha pausado",
      })
    } else {
      audioRef.current.play().catch(error => {
        toast({
          title: "Error",
          description: "No se pudo reproducir la radio. Por favor, intenta de nuevo.",
          variant: "destructive",
        })
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (newVolume) => {
    const volumeValue = newVolume[0]
    setVolume(volumeValue)
    if (audioRef.current) {
      audioRef.current.volume = volumeValue
    }
    setIsMuted(volumeValue === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-xl player-gradient p-1"
      >
        <div className="bg-background rounded-lg p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Conexión Tropical</h1>
            <p className="text-sm text-muted-foreground">Alcorta Santa Fe 96.9</p>
          </div>

          <div className="flex justify-center">
            <img alt="Radio station logo" className="w-32 h-32 rounded-full" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/bd869576-edb6-4d6a-bc18-950fdece8da3/bc0076aa79524f3a4babe32819437f88.jpg" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={togglePlay}
                size="icon"
                className="w-16 h-16 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="hover:bg-secondary/80"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Toaster />
    </div>
  )
}

export default App
