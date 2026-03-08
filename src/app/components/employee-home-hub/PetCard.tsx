"use client"

import React, { useState, useCallback } from "react"
import { Icon } from "@iconify/react"
import CardBox from "../shared/CardBox"

type PetMood = "Happy" | "Energetic" | "Needs attention" | "Sleepy"

const moodGradients: Record<PetMood, string> = {
  "Happy": "from-success/40 via-primary/30 to-info/40",
  "Energetic": "from-warning/40 via-error/30 to-primary/40",
  "Needs attention": "from-muted/40 via-warning/30 to-error/40",
  "Sleepy": "from-info/30 via-muted/30 to-primary/20",
}

const moodTextColors: Record<PetMood, string> = {
  "Happy": "text-success",
  "Energetic": "text-warning",
  "Needs attention": "text-error",
  "Sleepy": "text-info",
}

const PetCard = () => {
  const [mood, setMood] = useState<PetMood>("Happy")
  const [energy, setEnergy] = useState(75)
  const [isPulsing, setIsPulsing] = useState(false)
  const [xpPopups, setXpPopups] = useState<{ id: number; x: number; value: number }[]>([])

  const triggerAnimation = useCallback(() => {
    setIsPulsing(true)
    setTimeout(() => setIsPulsing(false), 600)
  }, [])

  const showXpPopup = useCallback((buttonIndex: number, value: number) => {
    const id = Date.now()
    setXpPopups(prev => [...prev, { id, x: buttonIndex, value }])
    setTimeout(() => {
      setXpPopups(prev => prev.filter(p => p.id !== id))
    }, 1000)
  }, [])

  const handleFeed = () => {
    setEnergy(prev => Math.min(prev + 10, 100))
    if (mood === "Needs attention" || mood === "Sleepy") setMood("Happy")
    triggerAnimation()
    showXpPopup(0, 15)
  }

  const handlePlay = () => {
    setEnergy(prev => Math.max(prev - 5, 0))
    setMood("Energetic")
    triggerAnimation()
    showXpPopup(1, 25)
  }

  const handleFocus = () => {
    setEnergy(prev => Math.min(prev + 5, 100))
    setMood("Happy")
    triggerAnimation()
    showXpPopup(2, 20)
  }

  const actions = [
    { label: "Feed", icon: "tabler:apple", onClick: handleFeed },
    { label: "Play", icon: "tabler:ball-tennis", onClick: handlePlay },
    { label: "Encourage focus", icon: "tabler:focus-2", onClick: handleFocus },
  ]

  return (
    <CardBox className="shadow-none border-border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-lg font-semibold text-foreground">Your Clubhouse pet</h5>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${moodTextColors[mood]} bg-current/10`}
            style={{ backgroundColor: "var(--muted)" }}>
            {mood}
          </span>
        </div>

        {/* Pet area */}
        <div className="flex justify-center mb-4">
          <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${moodGradients[mood]} flex items-center justify-center transition-all duration-500 ${isPulsing ? "scale-110" : "scale-100"}`}>
            <div className="animate-bounce">
              <Icon icon="tabler:paw-filled" className={`w-16 h-16 ${moodTextColors[mood]} opacity-80`} />
            </div>
          </div>
        </div>

        {/* Energy bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Energy</span>
            <span className="text-xs font-medium text-foreground">{energy}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-warning to-success transition-all duration-500"
              style={{ width: `${energy}%` }}
            />
          </div>
        </div>

        {/* Pet description */}
        <p className="text-xs text-muted-foreground text-center mb-4">
          <span className="font-medium text-foreground">Nova the Energetic Fox</span> gets happier when you complete focus sessions and real breaks.
        </p>

        {/* Action buttons */}
        <div className="flex gap-2 relative">
          {actions.map((action, i) => (
            <div key={action.label} className="relative flex-1">
              <button
                onClick={action.onClick}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 text-foreground text-xs font-medium transition-all duration-200 active:scale-95 border border-border/50"
              >
                <Icon icon={action.icon} className="w-3.5 h-3.5" />
                {action.label}
              </button>
              {/* XP popup */}
              {xpPopups
                .filter(p => p.x === i)
                .map(p => (
                  <span
                    key={p.id}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-success animate-bounce pointer-events-none"
                  >
                    +{p.value} XP
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>
    </CardBox>
  )
}

export default PetCard
