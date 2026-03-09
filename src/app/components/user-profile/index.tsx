'use client'
import Image from 'next/image'
import CardBox from '../shared/CardBox'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import BreadcrumbComp from '@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// Toggle this flag to show/hide the manager-only "Teams & access" card
const isManager = true
const TEAM_SAVE_NOTIFICATION_DURATION_MS = 2000

const DEMO_TEAMS = [
  { name: 'Product', description: 'Core team' },
  { name: 'Engineering', description: 'Core team' },
  { name: 'Sales', description: 'Project squad' },
  { name: 'Marketing', description: 'Project squad' },
  { name: 'People Ops', description: 'Core team' },
  { name: 'Support', description: 'Project squad' },
]

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState<'personal' | 'preferences' | null>(
    null
  )

  const BCrumb = [
    {
      to: '/dashboard',
      title: 'Home',
    },
    {
      title: 'My Profile',
    },
  ]

  const [personal, setPersonal] = useState({
    preferredName: 'Mathew',
    role: 'Team Leader',
    email: 'mathew.anderson@gmail.com',
    location: 'Singapore',
    primaryTeam: 'Product',
    timeZone: 'GMT+8',
    workPattern: 'Hybrid · 3 days in office',
    facebook: 'https://www.facebook.com/wrappixel',
    twitter: 'https://twitter.com/wrappixel',
    github: 'https://github.com/wrappixel',
    dribbble: 'https://dribbble.com/wrappixel',
  })

  const [preferences, setPreferences] = useState({
    workdayFocus: 'Deep focus',
    breakPreference: 'Standard',
    socialPreference: 'Medium',
    petName: 'Nova',
    petType: 'Fox',
    petPersonality: 'Chill',
    notificationTone: 'Playful',
  })

  const [tempPersonal, setTempPersonal] = useState(personal)
  const [tempPreferences, setTempPreferences] = useState(preferences)

  // Teams & access state
  const [selectedTeams, setSelectedTeams] = useState<string[]>([
    'Product',
    'Engineering',
  ])
  const [primaryTeam, setPrimaryTeam] = useState('Product')
  const [teamSaved, setTeamSaved] = useState(false)

  useEffect(() => {
    if (openModal && modalType === 'personal') {
      setTempPersonal(personal)
    }
    if (openModal && modalType === 'preferences') {
      setTempPreferences(preferences)
    }
  }, [openModal, modalType, personal, preferences])

  const handleSave = () => {
    if (modalType === 'personal') {
      setPersonal(tempPersonal)
    } else if (modalType === 'preferences') {
      setPreferences(tempPreferences)
    }
    setOpenModal(false)
  }

  const handleTeamCheckboxChange = (teamName: string, checked: boolean) => {
    if (checked) {
      setSelectedTeams((prev: string[]) => [...prev, teamName])
    } else {
      // Don't allow unchecking the primary team
      if (teamName === primaryTeam) return
      setSelectedTeams((prev: string[]) => prev.filter((t: string) => t !== teamName))
    }
  }

  const handlePrimaryTeamChange = (teamName: string) => {
    setPrimaryTeam(teamName)
    // Ensure the primary team is also checked
    setSelectedTeams((prev: string[]) =>
      prev.includes(teamName) ? prev : [...prev, teamName]
    )
  }

  const handleSaveTeams = () => {
    console.log('Saved team membership:', { selectedTeams, primaryTeam })
    setTeamSaved(true)
    setTimeout(() => setTeamSaved(false), TEAM_SAVE_NOTIFICATION_DURATION_MS)
  }

  const socialLinks = [
    {
      href: 'https://www.facebook.com/wrappixel',
      icon: 'streamline-logos:facebook-logo-2-solid',
    },
    {
      href: 'https://twitter.com/wrappixel',
      icon: 'streamline-logos:x-twitter-logo-solid',
    },
    { href: 'https://github.com/wrappixel', icon: 'ion:logo-github' },
    {
      href: 'https://dribbble.com/wrappixel',
      icon: 'streamline-flex:dribble-logo-remix',
    },
  ]

  return (
    <>
      <BreadcrumbComp title='My Profile' items={BCrumb} />
      <div className='flex flex-col gap-6'>
        <CardBox className='p-6 overflow-hidden'>
          <div className='flex flex-col sm:flex-row items-center gap-6 rounded-xl relative w-full break-words'>
            <div>
              <Image
                src={'/images/profile/user-1.jpg'}
                alt='image'
                width={80}
                height={80}
                className='rounded-full'
              />
            </div>
            <div className='flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full'>
              <div className='flex flex-col sm:text-left text-center gap-1.5'>
                <h5 className='card-title'>
                  {personal.preferredName}
                </h5>
                <div className='flex flex-wrap items-center gap-1 md:gap-3'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {personal.primaryTeam} · {personal.role}
                  </p>
                  <div className='hidden h-4 w-px bg-gray-300 dark:bg-gray-700 xl:block'></div>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {personal.location} · {personal.timeZone}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {socialLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    target='_blank'
                    className='flex h-11 w-11 items-center justify-center gap-2 rounded-full shadow-md border border-border hover:bg-gray-50 dark:hover:bg-white/[0.03] dark:hover:text-gray-200'>
                    <Icon icon={item.icon} width='20' height='20' />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardBox>

        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
          {/* Left card – Personal & Clubhouse info */}
          <div className='space-y-6 rounded-xl border border-border  md:p-6 p-4 relative w-full break-words'>
            <h5 className='card-title'>Personal information</h5>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32'>
              <div>
                <p className='text-xs text-gray-500'>Preferred name</p>
                <p>{personal.preferredName}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Primary team</p>
                <p>{personal.primaryTeam}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Role / What you do</p>
                <p>{personal.role}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Time zone</p>
                <p>{personal.timeZone}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Work email</p>
                <p>{personal.email}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Work pattern</p>
                <p>{personal.workPattern}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Location</p>
                <p>{personal.location}</p>
              </div>
            </div>
            <div className='flex justify-end'>
              <Button
                onClick={() => {
                  setModalType('personal')
                  setOpenModal(true)
                }}
                color={'primary'}
                className='flex items-center gap-1.5 rounded-md'>
                <Icon icon='ic:outline-edit' width='18' height='18' /> Edit
              </Button>
            </div>
          </div>

          {/* Right card – Preferences & pet */}
          <div className='space-y-6 rounded-xl border border-border  md:p-6 p-4 relative w-full break-words'>
            <h5 className='card-title'>Preferences</h5>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32'>
              <div>
                <p className='text-xs text-gray-500'>Workday focus</p>
                <p>{preferences.workdayFocus}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Pet name</p>
                <p>{preferences.petName}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Break preference</p>
                <p>{preferences.breakPreference}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Pet type</p>
                <p>{preferences.petType}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Social preference</p>
                <p>{preferences.socialPreference}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Pet personality</p>
                <p>{preferences.petPersonality}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Notification tone</p>
                <p>{preferences.notificationTone}</p>
              </div>
            </div>
            <div className='flex justify-end'>
              <Button
                onClick={() => {
                  setModalType('preferences')
                  setOpenModal(true)
                }}
                color={'primary'}
                className='flex items-center gap-1.5 rounded-md'>
                <Icon icon='ic:outline-edit' width='18' height='18' /> Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Manager-only card – Teams & access */}
        {isManager && (
          <div className='space-y-6 rounded-xl border border-border md:p-6 p-4 relative w-full break-words'>
            <div>
              <h5 className='card-title'>Teams &amp; access</h5>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                Choose which teams this person belongs to and which one is
                primary.
              </p>
            </div>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32'>
              {/* Left side – Teams (checkboxes) */}
              <div>
                <p className='text-xs text-gray-500 mb-3'>Teams</p>
                <div className='flex flex-col gap-3'>
                  {DEMO_TEAMS.map((team) => (
                    <div
                      key={team.name}
                      className='flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors'>
                      <Checkbox
                        id={`team-${team.name}`}
                        checked={selectedTeams.includes(team.name)}
                        onCheckedChange={(checked) =>
                          handleTeamCheckboxChange(team.name, !!checked)
                        }
                      />
                      <Label
                        htmlFor={`team-${team.name}`}
                        className='flex items-center gap-2 cursor-pointer'>
                        {team.name}
                        <span className='text-xs text-gray-400'>
                          {team.description}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side – Primary team (radios) */}
              <div>
                <p className='text-xs text-gray-500 mb-3'>Primary team</p>
                <RadioGroup
                  value={primaryTeam}
                  onValueChange={handlePrimaryTeamChange}
                  className='flex flex-col gap-3'>
                  {DEMO_TEAMS.map((team) => (
                    <div
                      key={team.name}
                      className='flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors'>
                      <RadioGroupItem
                        value={team.name}
                        id={`primary-${team.name}`}
                      />
                      <Label
                        htmlFor={`primary-${team.name}`}
                        className='cursor-pointer'>
                        {team.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <p className='text-xs text-gray-400 mt-4'>
                  Primary team controls where this person appears in leader
                  dashboards.
                </p>
              </div>
            </div>
            <div className='flex items-center justify-end gap-3'>
              {teamSaved && (
                <span className='text-xs text-success'>Saved locally</span>
              )}
              <Button
                onClick={handleSaveTeams}
                color={'primary'}
                className='flex items-center gap-1.5 rounded-md'>
                Save team membership
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='mb-4'>
              {modalType === 'personal'
                ? 'Edit Personal Information'
                : 'Edit Preferences'}
            </DialogTitle>
          </DialogHeader>

          {modalType === 'personal' ? (
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='preferredName'>Preferred name</Label>
                <Input
                  id='preferredName'
                  placeholder='Preferred name'
                  value={tempPersonal.preferredName}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      preferredName: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='primaryTeam'>Primary team</Label>
                <Input
                  id='primaryTeam'
                  placeholder='Primary team'
                  value={tempPersonal.primaryTeam}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      primaryTeam: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='role'>Role / What you do</Label>
                <Input
                  id='role'
                  placeholder='Role'
                  value={tempPersonal.role}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      role: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='timeZone'>Time zone</Label>
                <Input
                  id='timeZone'
                  placeholder='Time zone'
                  value={tempPersonal.timeZone}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      timeZone: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>Work email</Label>
                <Input
                  id='email'
                  placeholder='Work email'
                  value={tempPersonal.email}
                  onChange={(e) =>
                    setTempPersonal({ ...tempPersonal, email: e.target.value })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='workPattern'>Work pattern</Label>
                <Input
                  id='workPattern'
                  placeholder='Work pattern'
                  value={tempPersonal.workPattern}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      workPattern: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  placeholder='Location'
                  value={tempPersonal.location}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      location: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='workdayFocus'>Workday focus</Label>
                <Input
                  id='workdayFocus'
                  placeholder='e.g. Deep focus, Balanced, Social'
                  value={tempPreferences.workdayFocus}
                  onChange={(e) =>
                    setTempPreferences({
                      ...tempPreferences,
                      workdayFocus: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='petName'>Pet name</Label>
                <Input
                  id='petName'
                  placeholder='Pet name'
                  value={tempPreferences.petName}
                  onChange={(e) =>
                    setTempPreferences({
                      ...tempPreferences,
                      petName: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='breakPreference'>Break preference</Label>
                <Input
                  id='breakPreference'
                  placeholder='e.g. Light, Standard, Frequent'
                  value={tempPreferences.breakPreference}
                  onChange={(e) =>
                    setTempPreferences({
                      ...tempPreferences,
                      breakPreference: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='petType'>Pet type</Label>
                <Input
                  id='petType'
                  placeholder='e.g. Fox, Dog, Robot'
                  value={tempPreferences.petType}
                  onChange={(e) =>
                    setTempPreferences({
                      ...tempPreferences,
                      petType: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='socialPreference'>Social preference</Label>
                <Input
                  id='socialPreference'
                  placeholder='e.g. Low, Medium, High'
                  value={tempPreferences.socialPreference}
                  onChange={(e) =>
                    setTempPreferences({
                      ...tempPreferences,
                      socialPreference: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='petPersonality'>Pet personality</Label>
                <Input
                  id='petPersonality'
                  placeholder='e.g. Chill, Energetic, Motivator'
                  value={tempPreferences.petPersonality}
                  onChange={(e) =>
                    setTempPreferences({
                      ...tempPreferences,
                      petPersonality: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='notificationTone'>Notification tone</Label>
                <Input
                  id='notificationTone'
                  placeholder='e.g. Chill, Playful'
                  value={tempPreferences.notificationTone}
                  onChange={(e) =>
                    setTempPreferences({
                      ...tempPreferences,
                      notificationTone: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter className='flex gap-2 mt-4'>
            <Button
              color={'primary'}
              className='rounded-md'
              onClick={handleSave}>
              Save Changes
            </Button>
            <Button
              color={'lighterror'}
              className='rounded-md bg-lighterror dark:bg-darkerror text-error hover:bg-error hover:text-white'
              onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserProfile
