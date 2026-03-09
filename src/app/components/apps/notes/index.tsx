'use client'

import { useEffect, useState } from 'react'
import CardBox from '@/app/components/shared/CardBox'
import NotesSidebar from '@/app/components/apps/notes/NotesSidebar'
import NoteContent from '@/app/components/apps/notes/NoteContent'
import { Icon } from '@iconify/react'
import { WorkNote, NoteContext } from '@/app/(DashboardLayout)/types/apps/notes'
import AddNotes from './AddNotes'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'

interface ColorType {
  id: number
  disp: string
  lineColor?: string
}

const defaultNotes: WorkNote[] = [
  {
    id: '1',
    title: 'Sprint Planning – Q3 Roadmap',
    context: 'meeting',
    body: 'Discussed priorities for next quarter. Agreed on three key workstreams.',
    color: 'primary',
    actionItems: [
      { id: 'a1', text: 'Draft roadmap document', done: false },
      { id: 'a2', text: 'Schedule follow-up with design', done: true },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '1:1 with Jamie',
    context: 'one-to-one',
    body: 'Talked about career growth and upcoming promotion cycle.',
    color: 'warning',
    actionItems: [
      { id: 'a3', text: 'Share promotion rubric', done: false },
    ],
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Auth service migration',
    context: 'project',
    body: 'Need to move from legacy auth to OAuth 2.0 before end of month.',
    color: 'error',
    actionItems: [],
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    title: 'Idea – Internal CLI tool',
    context: 'idea',
    body: 'Build a CLI that scaffolds new microservices from a template.',
    color: 'success',
    actionItems: [],
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
]

const NotesApp = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState<WorkNote[]>(defaultNotes)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  const handleClose = () => setIsOpen(false)

  const colorVariation: ColorType[] = [
    { id: 1, lineColor: 'warning', disp: 'warning' },
    { id: 2, lineColor: 'primary', disp: 'primary' },
    { id: 3, lineColor: 'error', disp: 'error' },
    { id: 4, lineColor: 'success', disp: 'success' },
    { id: 5, lineColor: 'secondary', disp: 'secondary' },
  ]

  useEffect(() => {
    if (notes.length > 0 && selectedNoteId === null) {
      setSelectedNoteId(notes[0].id)
    }
  }, [notes, selectedNoteId])

  const updateNote = (updatedNote: WorkNote) => {
    setNotes(prev =>
      prev.map(note => (note.id === updatedNote.id ? updatedNote : note))
    )
  }

  const addNote = (note: { title: string; color: string; context: NoteContext }) => {
    const newNote: WorkNote = {
      id: crypto.randomUUID(),
      title: note.title,
      context: note.context,
      body: '',
      color: note.color,
      actionItems: [],
      updatedAt: new Date().toISOString(),
    }
    setNotes(prev => [...prev, newNote])
    setSelectedNoteId(newNote.id)
  }

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    if (selectedNoteId === id) setSelectedNoteId(null)
  }

  return (
    <CardBox className='p-0 overflow-hidden'>
      <div className='flex'>
        {/* Sidebar */}
        <div>
          <Sheet open={isOpen} onOpenChange={handleClose}>
            <SheetContent
              side='left'
              className='max-w-[320px] sm:max-w-[320px] w-full h-full lg:hidden block'
            >
              <NotesSidebar
                notes={notes}
                onSelectNote={(id: string) => {
                  setSelectedNoteId(id)
                  handleClose()
                }}
                onDeleteNote={deleteNote}
              />
            </SheetContent>
          </Sheet>
          <div className='max-w-[320px] h-auto lg:block hidden'>
            <NotesSidebar
              notes={notes}
              onSelectNote={(id: string) => setSelectedNoteId(id)}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>

        {/* Content */}
        <div className='w-full'>
          <div className='flex justify-between items-center border-b border-ld py-4 px-6'>
            <div className='flex gap-3 items-center'>
              <Button
                color={'lightprimary'}
                onClick={() => setIsOpen(true)}
                className='btn-circle p-0 lg:!hidden flex'
              >
                <Icon icon='tabler:menu-2' height={18} />
              </Button>
              <h6 className='text-base'>Edit Note</h6>
            </div>
            <AddNotes colors={colorVariation} addNote={addNote} />
          </div>

          <NoteContent
            note={notes.find(n => n.id === selectedNoteId) || null}
            updateNote={updateNote}
          />
        </div>
      </div>
    </CardBox>
  )
}

export default NotesApp
