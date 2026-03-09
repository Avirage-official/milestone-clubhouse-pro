export type NoteContext = 'meeting' | 'one-to-one' | 'project' | 'idea' | 'other';

export interface ActionItem {
  id: string;
  text: string;
  done: boolean;
}

export interface WorkNote {
  id: string;
  title: string;
  context: NoteContext;
  body: string;
  color: string; // 'yellow' | 'blue' | 'red' | 'green' | 'teal'
  actionItems: ActionItem[];
  updatedAt: string; // ISO string
}

/** @deprecated Use WorkNote instead */
export interface NotesType {
  id: number
  color?: string
  title?: string
  datef?: string
  deleted: boolean
}
