'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TbCheck } from 'react-icons/tb'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { NoteContext } from '@/app/(DashboardLayout)/types/apps/notes'

interface Color {
  disp: string
}

interface Props {
  colors: Color[]
  addNote: (note: { title: string; color: string; context: NoteContext }) => void
}

const contextOptions: { value: NoteContext; label: string }[] = [
  { value: 'meeting', label: 'Meeting' },
  { value: 'one-to-one', label: '1:1' },
  { value: 'project', label: 'Project' },
  { value: 'idea', label: 'Idea' },
  { value: 'other', label: 'Other' },
]

const AddNotes = ({ colors, addNote }: Props) => {
  const [openNoteModal, setOpenNoteModal] = useState(false)
  const [scolor, setScolor] = useState<string>('primary')
  const [title, setTitle] = useState('')
  const [context, setContext] = useState<NoteContext>('meeting')

  const setColor = (e: string) => setScolor(e)

  const handleSave = () => {
    addNote({ title, color: scolor, context })
    setOpenNoteModal(false)
    setTitle('')
    setContext('meeting')
  }

  return (
    <>
      <Dialog open={openNoteModal} onOpenChange={setOpenNoteModal}>
        <DialogTrigger asChild>
          <Button className='rounded-md'>Add Note</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
          </DialogHeader>

          <div className='space-y-3'>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full'
              placeholder='Note title…'
            />
            <Select value={context} onValueChange={(v) => setContext(v as NoteContext)}>
              <SelectTrigger className='w-fit'>
                <SelectValue placeholder='Context' />
              </SelectTrigger>
              <SelectContent>
                {contextOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <h6 className='text-base pt-2'>Change Note Color</h6>
            <div className='flex gap-2 items-center'>
              {colors?.map((color) => (
                <div
                  key={color.disp}
                  onClick={() => setColor(color.disp)}
                  className={`h-7 w-7 flex justify-center items-center rounded-full cursor-pointer bg-${color.disp}`}>
                  {scolor === color.disp && (
                    <TbCheck size={18} className='text-white' />
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className='pt-4'>
            <Button
              disabled={!title}
              onClick={handleSave}
              className='rounded-md'>
              Save
            </Button>
            <Button
              variant='outline'
              className='rounded-md'
              onClick={() => setOpenNoteModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddNotes
