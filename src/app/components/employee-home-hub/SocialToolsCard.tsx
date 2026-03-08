"use client"

import React from "react"
import { Icon } from "@iconify/react"
import CardBox from "../shared/CardBox"

const notifications = [
  { id: 1, icon: "tabler:pizza", text: "Lunch with Alex at 12:30", time: "30 min" },
  { id: 2, icon: "tabler:gift", text: 'Maya sent you a "Nice focus streak!" gift', time: "1h ago" },
  { id: 3, icon: "tabler:trophy", text: "Your team unlocked a new quest", time: "2h ago" },
  { id: 4, icon: "tabler:confetti", text: "You hit a 5-day focus streak!", time: "Today" },
]

const shortcuts = [
  { label: "Outlook", icon: "tabler:mail", href: "https://outlook.office.com" },
  { label: "Teams", icon: "tabler:brand-teams", href: "https://teams.microsoft.com" },
  { label: "Notion", icon: "tabler:notebook", href: "https://notion.so" },
  { label: "Jira", icon: "tabler:layout-kanban", href: "https://jira.atlassian.com" },
  { label: "Power BI", icon: "tabler:chart-pie", href: "https://app.powerbi.com" },
  { label: "Slack", icon: "tabler:brand-slack", href: "https://slack.com" },
]

const SocialToolsCard = () => {
  return (
    <CardBox className="shadow-none border-border">
      <div className="p-6">
        {/* Notifications section */}
        <div className="mb-5">
          <h5 className="text-base font-semibold text-foreground mb-0.5">Today&apos;s invites &amp; gifts</h5>
          <div className="space-y-2 mt-3">
            {notifications.map(n => (
              <div
                key={n.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border/50 hover:bg-muted/20 transition-all duration-200 cursor-pointer"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon icon={n.icon} className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-foreground flex-1 min-w-0 truncate">{n.text}</p>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-4" />

        {/* Shortcuts section */}
        <div>
          <h6 className="text-sm font-semibold text-foreground mb-3">Jump into your tools</h6>
          <div className="grid grid-cols-3 gap-2">
            {shortcuts.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border/50 hover:bg-muted/20 hover:border-primary/30 transition-all duration-200 group"
              >
                <Icon
                  icon={s.icon}
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200"
                />
                <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </CardBox>
  )
}

export default SocialToolsCard
