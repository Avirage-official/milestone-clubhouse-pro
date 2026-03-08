"use client"

import React, { useState } from "react"
import { Icon } from "@iconify/react"
import CardBox from "../shared/CardBox"

interface CheckItem {
  id: string
  icon: string
  title: string
  done: boolean
  editing: boolean
}

const initialChecks: CheckItem[] = [
  { id: "c1", icon: "tabler:mail", title: "Inbox triage", done: false, editing: false },
  { id: "c2", icon: "tabler:message-circle", title: "Reply to priority chats", done: false, editing: false },
  { id: "c3", icon: "tabler:calendar", title: "Review today's calendar", done: false, editing: false },
  { id: "c4", icon: "tabler:chart-bar", title: "Scan key dashboards", done: false, editing: false },
  { id: "c5", icon: "tabler:clipboard-check", title: "Check Jira board", done: false, editing: false },
]

const DailyChecksCard = () => {
  const [checks, setChecks] = useState<CheckItem[]>(initialChecks)
  const [editValues, setEditValues] = useState<Record<string, string>>({})

  const doneCount = checks.filter(c => c.done).length
  const totalCount = checks.length
  const progressPct = (doneCount / totalCount) * 100

  const toggleCheck = (id: string) => {
    setChecks(prev =>
      prev.map(c => c.id === id ? { ...c, done: !c.done } : c)
    )
  }

  const startEdit = (id: string, currentTitle: string) => {
    setEditValues(prev => ({ ...prev, [id]: currentTitle }))
    setChecks(prev =>
      prev.map(c => c.id === id ? { ...c, editing: true } : c)
    )
  }

  const saveEdit = (id: string) => {
    const newTitle = editValues[id]?.trim()
    setChecks(prev =>
      prev.map(c =>
        c.id === id ? { ...c, title: newTitle || c.title, editing: false } : c
      )
    )
  }

  const handleEditKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") saveEdit(id)
    if (e.key === "Escape") {
      setChecks(prev => prev.map(c => c.id === id ? { ...c, editing: false } : c))
    }
  }

  return (
    <CardBox className="shadow-none border-border h-full">
      <div className="p-6">
        <div className="mb-4">
          <h5 className="text-lg font-semibold text-foreground">Daily checks</h5>
          <p className="text-sm text-muted-foreground mt-0.5">
            Little rituals that keep your day on rails.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              {doneCount} of {totalCount} checks complete
            </span>
            <span className="text-xs font-medium text-primary">{Math.round(progressPct)}%</span>
          </div>
          <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Check items */}
        <div className="space-y-2">
          {checks.map(check => (
            <div
              key={check.id}
              className={`flex items-center gap-3 p-3 rounded-lg border border-border/50 transition-all duration-300
                ${check.done
                  ? "bg-gradient-to-r from-success/5 to-transparent"
                  : "hover:bg-muted/20"
                }`}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200
                ${check.done ? "bg-success/20" : "bg-muted/40"}`}>
                <Icon
                  icon={check.icon}
                  className={`w-4 h-4 transition-colors duration-200 ${check.done ? "text-success" : "text-muted-foreground"}`}
                />
              </div>

              {/* Title or edit input */}
              <div className="flex-1 min-w-0">
                {check.editing ? (
                  <input
                    type="text"
                    value={editValues[check.id] || ""}
                    onChange={e => setEditValues(prev => ({ ...prev, [check.id]: e.target.value }))}
                    onKeyDown={e => handleEditKeyDown(e, check.id)}
                    onBlur={() => saveEdit(check.id)}
                    autoFocus
                    className="w-full text-sm font-medium bg-muted/30 text-foreground rounded px-2 py-1 border border-border/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  <p className={`text-sm font-medium transition-all duration-200
                    ${check.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {check.title}
                  </p>
                )}
              </div>

              {/* Edit button */}
              {!check.editing && (
                <button
                  onClick={() => startEdit(check.id, check.title)}
                  className="flex-shrink-0 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-muted/40 transition-all duration-200"
                  style={{ opacity: 0.4 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
                >
                  <Icon icon="tabler:pencil" className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}

              {/* Toggle */}
              <button
                onClick={() => toggleCheck(check.id)}
                className={`flex-shrink-0 w-10 h-5 rounded-full relative transition-all duration-300 cursor-pointer
                  ${check.done ? "bg-success" : "bg-muted/60"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-sm
                  ${check.done ? "left-5.5" : "left-0.5"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </CardBox>
  )
}

export default DailyChecksCard
