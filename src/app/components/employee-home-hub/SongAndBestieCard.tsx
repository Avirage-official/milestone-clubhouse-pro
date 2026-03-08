"use client"

import React, { useState } from "react"
import { Icon } from "@iconify/react"
import CardBox from "../shared/CardBox"

const demoMessages = [
  { id: 1, sender: "Alex", text: "Hey! Great focus session today 🔥", time: "10:15 AM", isMe: false },
  { id: 2, sender: "You", text: "Thanks! Let's grab coffee later?", time: "10:18 AM", isMe: true },
  { id: 3, sender: "Alex", text: "Absolutely, 2pm works!", time: "10:19 AM", isMe: false },
]

const SongAndBestieCard = () => {
  const [spotifyLink, setSpotifyLink] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const handlePaste = () => {
    if (spotifyLink.trim()) {
      setShowPreview(true)
    }
  }

  return (
    <CardBox className="shadow-none border-border">
      <div className="p-6">
        {/* Song of the day */}
        <div className="mb-5">
          <h5 className="text-base font-semibold text-foreground mb-3">
            <Icon icon="tabler:music" className="w-4 h-4 inline mr-1.5 text-primary" />
            Song of the day
          </h5>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={spotifyLink}
              onChange={e => setSpotifyLink(e.target.value)}
              placeholder="Paste a Spotify link..."
              className="flex-1 text-sm bg-muted/30 text-foreground rounded-lg px-3 py-2 border border-border/50 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <button
              onClick={handlePaste}
              className="px-3 py-2 text-xs font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-200"
            >
              Add
            </button>
          </div>

          {showPreview && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success/40 to-primary/40 flex items-center justify-center flex-shrink-0">
                <Icon icon="tabler:player-play-filled" className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Blinding Lights</p>
                <p className="text-xs text-muted-foreground">The Weeknd</p>
              </div>
              <button className="p-1.5 rounded-full hover:bg-muted/40 transition-colors duration-200">
                <Icon icon="tabler:player-play" className="w-4 h-4 text-foreground" />
              </button>
            </div>
          )}

          {!showPreview && (
            <p className="text-xs text-muted-foreground italic">No song added yet. Paste a link above!</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-4" />

        {/* Work bestie chat */}
        <div>
          <h6 className="text-sm font-semibold text-foreground mb-3">
            <Icon icon="tabler:message-circle" className="w-4 h-4 inline mr-1.5 text-primary" />
            Work bestie
          </h6>

          <div className="space-y-2 mb-3 max-h-[140px] overflow-y-auto">
            {demoMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs
                  ${msg.isMe
                    ? "bg-primary/20 text-foreground rounded-br-sm"
                    : "bg-muted/30 text-foreground rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 text-foreground text-xs font-medium transition-all duration-200 border border-border/50">
            <Icon icon="tabler:message-circle" className="w-3.5 h-3.5" />
            Open full chat
          </button>
        </div>
      </div>
    </CardBox>
  )
}

export default SongAndBestieCard
