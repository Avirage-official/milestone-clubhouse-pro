"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { TbCheck } from "react-icons/tb";
import { WorkNote, NoteContext, ActionItem } from "@/app/(DashboardLayout)/types/apps/notes";
import { Button } from "@/components/ui/button";

interface ColorType {
  lineColor: string;
  disp: string;
  id: number;
}

interface NoteContentProps {
  note: WorkNote | null;
  updateNote: (note: WorkNote) => void;
}

const contextOptions: { value: NoteContext; label: string }[] = [
  { value: "meeting", label: "Meeting" },
  { value: "one-to-one", label: "1:1" },
  { value: "project", label: "Project" },
  { value: "idea", label: "Idea" },
  { value: "other", label: "Other" },
];

const colorBgMap: Record<string, string> = {
  warning: "bg-warning",
  primary: "bg-primary",
  error: "bg-error",
  success: "bg-success",
  secondary: "bg-secondary",
};

const NoteContent: React.FC<NoteContentProps> = ({ note, updateNote }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [context, setContext] = useState<NoteContext>("other");
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [newActionText, setNewActionText] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setContext(note.context);
      setActionItems(note.actionItems);
      setNewActionText("");
    }
  }, [note]);

  const emitUpdate = (patch: Partial<WorkNote>) => {
    if (!note) return;
    const updated: WorkNote = {
      ...note,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    updateNote(updated);
  };

  const handleColorChange = (color: string) => {
    if (!note) return;
    emitUpdate({ color });
  };

  const handleTitleBlur = () => emitUpdate({ title });
  const handleBodyBlur = () => emitUpdate({ body });

  const handleContextChange = (value: NoteContext) => {
    setContext(value);
    emitUpdate({ context: value });
  };

  const addActionItem = () => {
    if (!newActionText.trim()) return;
    const newItem: ActionItem = {
      id: crypto.randomUUID(),
      text: newActionText.trim(),
      done: false,
    };
    const updated = [...actionItems, newItem];
    setActionItems(updated);
    setNewActionText("");
    emitUpdate({ actionItems: updated });
  };

  const toggleActionItem = (itemId: string) => {
    const updated = actionItems.map((item) =>
      item.id === itemId ? { ...item, done: !item.done } : item
    );
    setActionItems(updated);
    emitUpdate({ actionItems: updated });
  };

  const removeActionItem = (itemId: string) => {
    const updated = actionItems.filter((item) => item.id !== itemId);
    setActionItems(updated);
    emitUpdate({ actionItems: updated });
  };

  const colorOptions: ColorType[] = [
    { id: 1, lineColor: "warning", disp: "warning" },
    { id: 2, lineColor: "primary", disp: "primary" },
    { id: 3, lineColor: "error", disp: "error" },
    { id: 4, lineColor: "success", disp: "success" },
    { id: 5, lineColor: "secondary", disp: "secondary" },
  ];

  if (!note) {
    return (
      <div className="text-center w-full py-6 text-2xl text-muted-foreground">
        Select a Note
      </div>
    );
  }

  return (
    <div className="flex grow p-6">
      <div className="w-full space-y-4">
        {/* Title */}
        <Input
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          className="w-full text-lg font-semibold"
        />

        {/* Context selector */}
        <Select value={context} onValueChange={handleContextChange}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Context" />
          </SelectTrigger>
          <SelectContent>
            {contextOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Body */}
        <Textarea
          placeholder="Write your notes here…"
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onBlur={handleBodyBlur}
          className="w-full p-4 form-control-textarea"
        />

        {/* Action Items */}
        <div>
          <h6 className="text-sm font-medium mb-2">Action Items</h6>
          <div className="space-y-2">
            {actionItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  checked={item.done}
                  onCheckedChange={() => toggleActionItem(item.id)}
                />
                <span
                  className={`flex-1 text-sm ${
                    item.done ? "line-through opacity-50" : ""
                  }`}
                >
                  {item.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeActionItem(item.id)}
                  aria-label="Remove action item"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add an action item…"
              value={newActionText}
              onChange={(e) => setNewActionText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addActionItem();
                }
              }}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={addActionItem}
              disabled={!newActionText.trim()}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <h6 className="text-base mb-3">Change Note Color</h6>
          <div className="flex gap-2 items-center">
            {colorOptions.map((color) => (
              <div
                key={color.id}
                onClick={() => handleColorChange(color.disp)}
                className={`h-7 w-7 flex justify-center items-center rounded-full cursor-pointer 
                  ${note.color === color.disp ? "border-2 border-black" : ""} 
                  ${colorBgMap[color.disp] || "bg-primary"}`}
              >
                {note.color === color.disp && <TbCheck size={18} className="text-white" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteContent;
