"use client"

import React, { useState } from "react"
import { Icon } from "@iconify/react"
import CardBox from "../shared/CardBox"

interface Task {
  id: string
  title: string
  description: string
  done: boolean
  status: string
}

const initialTabs: Record<string, Task[]> = {
  "Yesterday done": [
    { id: "yd1", title: "Finalize Q3 report", description: "Wrap up charts and summary", done: true, status: "Done" },
    { id: "yd2", title: "1:1 with Maya", description: "Weekly sync on sprint progress", done: true, status: "Done" },
    { id: "yd3", title: "Review PR #247", description: "Code review for auth module", done: true, status: "Done" },
  ],
  "Missed from yesterday": [
    { id: "my1", title: "Update onboarding docs", description: "Add new screenshots to guide", done: false, status: "From yesterday" },
    { id: "my2", title: "Reply to client email", description: "Follow-up on integration timeline", done: false, status: "From yesterday" },
  ],
  "Today's tasks": [
    { id: "tt1", title: "Deep work: Project Nova", description: "Focus session on core feature", done: false, status: "New" },
    { id: "tt2", title: "Team standup at 10 AM", description: "Share blockers and priorities", done: false, status: "New" },
    { id: "tt3", title: "Design review meeting", description: "Review new dashboard mockups", done: false, status: "New" },
  ],
  "On repeat": [
    { id: "or1", title: "Inbox triage", description: "Clear and sort morning emails", done: false, status: "Repeat" },
    { id: "or2", title: "Check Jira board", description: "Review sprint progress", done: false, status: "Repeat" },
    { id: "or3", title: "End-of-day journal", description: "Reflect on wins and blockers", done: false, status: "Repeat" },
    { id: "or4", title: "Stretch break", description: "5-minute movement break", done: false, status: "Repeat" },
  ],
}

const statusColors: Record<string, string> = {
  "Done": "bg-success/20 text-success",
  "From yesterday": "bg-warning/20 text-warning",
  "New": "bg-info/20 text-info",
  "Repeat": "bg-primary/20 text-primary",
  "Added": "bg-success/20 text-success",
}

const TodaysMissionCard = () => {
  const tabNames = Object.keys(initialTabs)
  const [activeTab, setActiveTab] = useState(tabNames[0])
  const [tasks, setTasks] = useState<Record<string, Task[]>>(initialTabs)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())

  const toggleTask = (tabName: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [tabName]: prev[tabName].map(t =>
        t.id === taskId ? { ...t, done: !t.done } : t
      ),
    }))
  }

  const addToToday = (task: Task) => {
    const newTask: Task = {
      ...task,
      id: `added-${task.id}-${Date.now()}`,
      status: "Added",
      done: false,
    }
    setTasks(prev => ({
      ...prev,
      "Today's tasks": [...prev["Today's tasks"], newTask],
    }))
    setAddedIds(prev => new Set(prev).add(task.id))
  }

  return (
    <CardBox className="shadow-none border-border h-full">
      <div className="p-6">
        <div className="mb-5">
          <h5 className="text-lg font-semibold text-foreground">Today in your Clubhouse</h5>
          <p className="text-sm text-muted-foreground mt-0.5">
            Carry over what matters, then set your focus for today.
          </p>
        </div>

        {/* Pill tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {tabNames.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                ${activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
          {tasks[activeTab]?.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg border border-border/50 transition-all duration-300 group
                ${task.done ? "bg-muted/30 opacity-70" : "hover:bg-muted/20"}`}
            >
              {/* Checkbox */}
              {activeTab !== "On repeat" && (
                <button
                  onClick={() => toggleTask(activeTab, task.id)}
                  className="flex-shrink-0 transition-transform duration-200 active:scale-90"
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                    ${task.done
                      ? "bg-success border-success"
                      : "border-muted-foreground/40 hover:border-primary"
                    }`}
                  >
                    {task.done && (
                      <Icon icon="tabler:check" className="text-white w-3.5 h-3.5 animate-in fade-in zoom-in" />
                    )}
                  </div>
                </button>
              )}

              {/* Task info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium transition-all duration-200
                  ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">{task.description}</p>
              </div>

              {/* Status pill */}
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${statusColors[task.status] || "bg-muted text-muted-foreground"}`}>
                {task.status}
              </span>

              {/* Add to today button (On repeat only) */}
              {activeTab === "On repeat" && (
                <button
                  onClick={() => addToToday(task)}
                  disabled={addedIds.has(task.id)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all duration-200 flex-shrink-0
                    ${addedIds.has(task.id)
                      ? "bg-success/20 text-success cursor-default"
                      : "bg-primary/10 text-primary hover:bg-primary/20 active:scale-95"
                    }`}
                >
                  {addedIds.has(task.id) ? "Added ✓" : "Add to today"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </CardBox>
  )
}

export default TodaysMissionCard
