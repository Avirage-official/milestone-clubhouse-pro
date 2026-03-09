'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import BreadcrumbComp from '../../layout/shared/breadcrumb/BreadcrumbComp'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Calendar1, Clock } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Rituals & Feedback' },
]

const Page = () => {
  const [time, setTime] = useState('')
  const [switch1, setSwitch1] = useState(false)
  const [switch2, setSwitch2] = useState(true)
  const [switch3, setSwitch3] = useState(true)
  const [switch4, setSwitch4] = useState(false)
  const [switch5, setSwitch5] = useState(true)
  const [switch6, setSwitch6] = useState(false)

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <>
      <BreadcrumbComp title='Rituals & Feedback Studio' items={BCrumb} />
      <p className='text-muted-foreground mb-6'>
        Design team rituals, collect quick feedback, and celebrate teammates —
        all with the same polished forms.
      </p>
      <div className='grid gap-6 grid-cols-1 xl:grid-cols-2'>
        {/* Card 1 – Team rituals setup (left column) */}
        <div className='flex flex-col gap-6'>
          <div className='rounded-xl border border-border md:p-6 p-4'>
            <h5 className='card-title'>Team rituals setup</h5>
            <p className='text-sm text-muted-foreground mt-1'>
              Choose which daily checks and quests show up for your team.
            </p>
            <div className='mt-6 flex flex-col gap-6'>
              {/* Team name */}
              <div>
                <Label htmlFor='team-name'>Team name</Label>
                <Input
                  id='team-name'
                  type='text'
                  placeholder='e.g. Product, Sales EMEA'
                  required
                  className='mt-2'
                />
              </div>

              {/* Ritual name */}
              <div>
                <Label htmlFor='ritual-name'>Ritual name</Label>
                <Input
                  id='ritual-name'
                  type='text'
                  placeholder='e.g. Focus Friday'
                  required
                  className='mt-2'
                />
              </div>

              {/* Default daily checks */}
              <div>
                <Label htmlFor='daily-checks'>Default daily checks</Label>
                <Select>
                  <SelectTrigger className='mt-2 w-full'>
                    <SelectValue placeholder='Select daily checks' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='inbox'>Inbox triage</SelectItem>
                    <SelectItem value='calendar'>Calendar review</SelectItem>
                    <SelectItem value='dashboards'>
                      Scan dashboards
                    </SelectItem>
                    <SelectItem value='quests'>Check quests</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start date */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='start-date' className='px-1'>
                  Start date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      id='start-date'
                      className='w-full justify-between font-normal hover:bg-transparent focus:border-primary'>
                      {date ? date.toLocaleDateString() : 'Select date'}
                      <Icon
                        icon='solar:calendar-minimalistic-linear'
                        width={18}
                        height={18}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto overflow-hidden p-0'
                    align='start'>
                    <Calendar
                      mode='single'
                      selected={date}
                      captionLayout='dropdown'
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Preferred focus block */}
              <div>
                <Label htmlFor='focus-block'>Preferred focus block</Label>
                <div className='relative mt-2'>
                  <Input
                    id='focus-block'
                    type='time'
                    min='09:00'
                    max='18:00'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className='pr-10 [&::-webkit-calendar-picker-indicator]:hidden'
                  />
                  <Icon
                    icon='solar:clock-circle-linear'
                    width='18'
                    height='18'
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'
                  />
                </div>
              </div>

              {/* Ritual cadence */}
              <div>
                <Label htmlFor='cadence'>Ritual cadence</Label>
                <Select>
                  <SelectTrigger className='mt-2 w-full'>
                    <SelectValue placeholder='Select cadence' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='daily'>Daily</SelectItem>
                    <SelectItem value='weekly'>Weekly</SelectItem>
                    <SelectItem value='monthly'>Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ritual focus – Radio group */}
              <div>
                <Label>Ritual focus</Label>
                <RadioGroup
                  defaultValue='balanced'
                  className='mt-2 flex flex-wrap gap-6'>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value='deep-focus' id='deep-focus' />
                    <Label htmlFor='deep-focus'>Deep focus</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value='wellness' id='wellness' />
                    <Label htmlFor='wellness'>Wellness</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value='social' id='social' />
                    <Label htmlFor='social'>Social</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value='balanced' id='balanced' />
                    <Label htmlFor='balanced'>Balanced</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Feature flag toggles */}
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
                <div className='flex items-center gap-2'>
                  <Switch
                    checked={switch1}
                    onCheckedChange={setSwitch1}
                  />
                  <Label>Enable lunch buddies for this team</Label>
                </div>
                <div className='flex items-center gap-2'>
                  <Switch
                    checked={switch2}
                    onCheckedChange={setSwitch2}
                  />
                  <Label>Show team in Hall of Fame</Label>
                </div>
              </div>

              {/* Buttons */}
              <div className='flex gap-3'>
                <Button>Save ritual preset</Button>
                <Button variant='outline'>Preview in Clubhouse</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 – Quick pulse survey (right column) */}
        <div className='flex flex-col gap-6'>
          <div className='rounded-xl border border-border md:p-6 p-4'>
            <h5 className='card-title'>Quick pulse survey</h5>
            <p className='text-sm text-muted-foreground mt-1'>
              Spin up a 3‑question check‑in for your team.
            </p>
            <div className='mt-6 flex flex-col gap-6'>
              {/* Survey title */}
              <div>
                <Label htmlFor='survey-title'>Survey title</Label>
                <Input
                  id='survey-title'
                  type='text'
                  placeholder='e.g. Clubhouse beta check-in'
                  className='mt-2'
                />
              </div>

              {/* Question 1 */}
              <div className='relative'>
                <Icon
                  icon='solar:letter-linear'
                  width={18}
                  height={18}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                />
                <Input
                  type='text'
                  placeholder='How does your workday feel this week?'
                  className='pl-10'
                />
              </div>

              {/* Question 2 */}
              <div className='relative'>
                <Icon
                  icon='solar:phone-rounded-linear'
                  width={18}
                  height={18}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                />
                <Input
                  type='text'
                  placeholder="What's one ritual that's helping?"
                  className='pl-10'
                />
              </div>

              {/* Question 3 */}
              <div className='relative'>
                <Icon
                  icon='solar:global-linear'
                  width={18}
                  height={18}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                />
                <Input
                  type='text'
                  placeholder="Anything you'd change in the Clubhouse?"
                  className='pl-10'
                />
              </div>

              {/* Answer style – Checkboxes */}
              <div>
                <Label className='mb-2 block'>Answer style</Label>
                <div className='flex gap-6'>
                  <div className='flex items-center gap-2'>
                    <Checkbox id='scale' />
                    <Label htmlFor='scale'>1–5 scale</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id='emoji' defaultChecked />
                    <Label htmlFor='emoji'>Emoji scale</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id='text-only' disabled />
                    <Label htmlFor='text-only'>Text only</Label>
                  </div>
                </div>
              </div>

              {/* Survey audience – Radio */}
              <div>
                <Label className='mb-2 block'>Survey audience</Label>
                <RadioGroup
                  defaultValue='whole-company'
                  className='flex flex-wrap gap-6'>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem
                      value='whole-company'
                      id='whole-company'
                    />
                    <Label htmlFor='whole-company'>Whole company</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value='my-teams' id='my-teams' />
                    <Label htmlFor='my-teams'>My teams only</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem
                      value='custom-list'
                      id='custom-list'
                    />
                    <Label htmlFor='custom-list'>Custom list</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Extra options – Toggles */}
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
                <div className='flex items-center gap-2'>
                  <Switch
                    checked={switch3}
                    onCheckedChange={setSwitch3}
                  />
                  <Label>Anonymous responses</Label>
                </div>
                <div className='flex items-center gap-2'>
                  <Switch
                    checked={switch4}
                    onCheckedChange={setSwitch4}
                  />
                  <Label>Send gentle reminder after 2 days</Label>
                </div>
              </div>

              {/* Buttons */}
              <div className='flex gap-3'>
                <Button>Launch survey</Button>
                <Button variant='outline'>Save as draft</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3 – Recognition & nominations (bottom section) */}
      <div className='mt-6 rounded-xl border border-border md:p-6 p-4'>
        <h5 className='card-title'>Recognition & nominations</h5>
        <p className='text-sm text-muted-foreground mt-1'>
          Nominate teammates for badges like Star of the day, Focus hero, or
          Team spark.
        </p>
        <div className='mt-6 grid gap-6 grid-cols-1 xl:grid-cols-2'>
          {/* Left: Nomination textareas */}
          <div className='flex flex-col gap-6'>
            <div>
              <Label htmlFor='nominee'>Who are you nominating?</Label>
              <Textarea
                id='nominee'
                placeholder='Start typing a name or team...'
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor='what-they-did'>What did they do?</Label>
              <Textarea
                id='what-they-did'
                placeholder='Describe the moment, project, or behavior you want to celebrate.'
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor='impact'>What was the impact?</Label>
              <Textarea
                id='impact'
                placeholder='How did this help the team, customers, or the company?'
                rows={4}
              />
            </div>
          </div>

          {/* Right: Badge selectors + toggles */}
          <div className='flex flex-col gap-6'>
            <div>
              <Label htmlFor='star-badge' className='text-warning'>
                Star of the day
              </Label>
              <Input
                id='star-badge'
                placeholder='Made today meaningfully better for others.'
                variant={'warning'}
                className='mt-2'
              />
            </div>
            <div>
              <Label htmlFor='focus-badge' className='text-info'>
                Focus hero
              </Label>
              <Input
                id='focus-badge'
                placeholder='Protected deep work and shipped something important.'
                variant={'info'}
                className='mt-2'
              />
            </div>
            <div>
              <Label htmlFor='spark-badge' className='text-success'>
                Team spark
              </Label>
              <Input
                id='spark-badge'
                placeholder='Connected people, helped morale, or unblocked collaboration.'
                variant={'success'}
                className='mt-2'
              />
            </div>

            {/* Confirmation toggles */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
              <div className='flex items-center gap-2'>
                <Switch
                  checked={switch5}
                  onCheckedChange={setSwitch5}
                />
                <Label>Share in Hall of Fame</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Switch
                  checked={switch6}
                  onCheckedChange={setSwitch6}
                />
                <Label>Send a thank-you DM</Label>
              </div>
            </div>

            {/* Button */}
            <div className='flex gap-3'>
              <Button>Send nomination</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
