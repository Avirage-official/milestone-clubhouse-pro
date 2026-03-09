import React from 'react'

import { Ticket } from '@/app/(DashboardLayout)/types/ticket'

interface TicketFilterProps {
  tickets: Ticket[]
  setFilter: (filter: string) => void
}

const TicketFilter: React.FC<TicketFilterProps> = ({ tickets, setFilter }) => {
  const managerC = tickets.filter((t) => t.stage === 'MANAGER_REVIEW').length
  const ceoC = tickets.filter((t) => t.stage === 'CEO_REVIEW').length
  const completedC = tickets.filter((t) => t.stage === 'COMPLETED').length

  return (
    <div className='grid grid-cols-12 gap-6'>
      <div
        className='lg:col-span-3 md:col-span-6 col-span-12 p-30 bg-lightprimary text-center rounded-md cursor-pointer'
        onClick={() => setFilter('total_tickets')}>
        <h3 className='text-primary text-2xl'>{tickets.length}</h3>
        <h6 className='text-base text-primary'>Total Requests</h6>
      </div>

      <div
        className='lg:col-span-3 md:col-span-6 col-span-12 p-30 bg-lightwarning text-center rounded-md cursor-pointer'
        onClick={() => setFilter('MANAGER_REVIEW')}>
        <h3 className='text-warning text-2xl'>{managerC}</h3>
        <h6 className='text-base text-warning'>Waiting on Manager</h6>
      </div>

      <div
        className='lg:col-span-3 md:col-span-6 col-span-12 p-30 bg-lighterror text-center rounded-md cursor-pointer'
        onClick={() => setFilter('CEO_REVIEW')}>
        <h3 className='text-error text-2xl'>{ceoC}</h3>
        <h6 className='text-base text-error'>Waiting on CEO</h6>
      </div>

      <div
        className='lg:col-span-3 md:col-span-6 col-span-12 p-30 bg-lightsuccess text-center rounded-md cursor-pointer'
        onClick={() => setFilter('COMPLETED')}>
        <h3 className='text-success text-2xl'>{completedC}</h3>
        <h6 className='text-base text-success'>Completed This Month</h6>
      </div>
    </div>
  )
}

export default TicketFilter
