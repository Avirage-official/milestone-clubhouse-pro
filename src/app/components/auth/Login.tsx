'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import FullLogo from '@/app/(DashboardLayout)/layout/shared/logo/FullLogo'
import CardBox from '../shared/CardBox'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Login = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === '1'

  const [username, setUsername] = useState(isDemo ? 'admin@demo.com' : '')
  const [password, setPassword] = useState(isDemo ? 'password' : '')

  useEffect(() => {
    if (isDemo) {
      const timer = setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isDemo, router])

  const handleSignIn = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <div className='h-screen w-full flex justify-center items-center bg-lightprimary'>
        <div className='md:min-w-[450px] min-w-max'>
          <CardBox>
            <div className='flex justify-center mb-4'>
              <FullLogo />
            </div>
            <p className='text-sm text-muted-foreground text-center mb-6'>
              Welcome to Milestones
            </p>
            {isDemo && (
              <div className='mb-4 rounded-lg bg-primary/10 border border-primary/20 p-3 text-center'>
                <p className='text-sm text-primary font-medium'>
                  Demo credentials loaded — signing you in…
                </p>
              </div>
            )}
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='username1' className='font-medium'>
                  Username
                </Label>
              </div>
              <Input
                id='username1'
                type='text'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='mt-6'>
              <div className='mb-2 block'>
                <Label htmlFor='password1' className='font-medium'>
                  Password
                </Label>
              </div>
              <Input
                id='password1'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-wrap gap-6 items-center justify-between my-6'>
              <div className='flex items-center gap-2'>
                <Checkbox id='remember' checked />
                <Label
                  className='text-link font-normal text-sm'
                  htmlFor='remember'>
                  Remember this device
                </Label>
              </div>
              <Link
                href='#'
                className='text-sm font-medium text-primary hover:text-primaryemphasis'>
                Forgot Password ?
              </Link>
            </div>
            <Button className='w-full' onClick={handleSignIn}>
              Sign In
            </Button>
            <div className='flex items center gap-2 justify-center mt-6 flex-wrap'>
              <p className='text-base font-medium text-muted-foreground'>
                New to Milestones?
              </p>
              <Link
                href='/auth/register'
                className='text-sm font-medium text-primary hover:text-primaryemphasis'>
                Create an account
              </Link>
            </div>
          </CardBox>
        </div>
      </div>
    </>
  )
}
