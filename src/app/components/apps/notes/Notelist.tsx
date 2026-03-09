"use client";

import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { WorkNote, NoteContext } from "@/app/(DashboardLayout)/types/apps/notes";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

interface NotelistProps {
  notes: WorkNote[];
  onSelectNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

// Map colors to Tailwind classes
const colorClassMap: Record<string, string> = {
  primary: "bg-lightprimary text-primary",
  warning: "bg-lightwarning text-warning",
  error: "bg-lighterror text-error",
  success: "bg-lightsuccess text-success",
  secondary: "bg-lightsecondary text-secondary",
};

const contextLabels: Record<NoteContext, string> = {
  meeting: "Meeting",
  "one-to-one": "1:1",
  project: "Project",
  idea: "Idea",
  other: "Other",
};

const Notelist: React.FC<NotelistProps> = ({ notes, onSelectNote, onDeleteNote }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    if (notes.length > 0) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes]);

  const filteredNotes = notes.filter((note) => {
    if (!note.title) return false;
    if (searchTerm === "") return true;
    return note.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleNoteClick = (noteId: string) => {
    setActiveNoteId(noteId);
    onSelectNote(noteId);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search Notes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <h6 className="text-base mt-6">All Notes</h6>
      <div className="flex flex-col gap-3 mt-4">
        {filteredNotes.length ? (
          filteredNotes.map((note) => {
            const colorClasses = colorClassMap[note.color || "primary"];
            return (
              <div key={note.id}>
                <div
                  className={`cursor-pointer relative p-4 rounded-md ${colorClasses} ${
                    activeNoteId === note.id ? "scale-100" : "scale-95"
                  } transition-transform duration-200`}
                  onClick={() => handleNoteClick(note.id)}
                >
                  <h6 className="text-base truncate">{note.title}</h6>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium uppercase opacity-70">
                        {contextLabels[note.context]}
                      </span>
                      <span className="text-xs text-ld">
                        {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : "-"}
                      </span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteNote(note.id);
                          }}
                          aria-label="Delete note"
                        >
                          <Icon icon="tabler:trash" height={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Alert variant="destructive">
            <AlertTitle>No Notes Found!</AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Notelist;
