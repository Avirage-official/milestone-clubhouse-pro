"use client";
import React from "react";
import Notelist from "./Notelist";
import { WorkNote } from "@/app/(DashboardLayout)/types/apps/notes";

interface NotesSidebarProps {
  notes: WorkNote[];
  onSelectNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const NotesSidebar: React.FC<NotesSidebarProps> = ({ notes, onSelectNote, onDeleteNote }) => {  

  return (
    <>
      <div className="left-part">
        <Notelist
          notes={notes}
          onSelectNote={onSelectNote}
          onDeleteNote={onDeleteNote}
        />
      </div>
    </>
  );
};

export default NotesSidebar;
