import { TicketType } from '@/app/(DashboardLayout)/types/ticket'
import { NextResponse, NextRequest } from 'next/server'

let TicketData: TicketType[] = [
  {
    Id: 1,
    title: 'Update org chart after merger',
    description: 'Restructure departments following Q1 acquisition',
    companyName: 'Acme Corp',
    requestType: 'org_change',
    stage: 'new',
    status: 'open',
    assignedToAdmin: 'Liam',
    submittedBy: 'Alice Johnson',
    submittedAt: '2026-02-15T10:30:00Z',
    deleted: false,
  },
  {
    Id: 2,
    title: 'Revise remote-work policy',
    description: 'Allow 3 days remote per week for engineering teams',
    companyName: 'Globex Inc',
    requestType: 'policy_change',
    stage: 'manager_review',
    status: 'open',
    assignedToAdmin: 'Steve',
    submittedBy: 'Bob Williams',
    managerName: 'Carol Davis',
    submittedAt: '2026-02-20T14:00:00Z',
    deleted: false,
  },
  {
    Id: 3,
    title: 'Grant VPN access for contractors',
    description: 'Provide secure VPN access to 12 new contractors',
    companyName: 'Initech',
    requestType: 'access_request',
    stage: 'ceo_review',
    status: 'open',
    assignedToAdmin: 'Jack',
    submittedBy: 'Dan Miller',
    managerName: 'Eva Chen',
    ceoName: 'Frank Lee',
    submittedAt: '2026-01-28T09:15:00Z',
    deleted: false,
  },
  {
    Id: 4,
    title: 'Change PTO accrual formula',
    description: 'Move from monthly to bi-weekly PTO accrual',
    companyName: 'Acme Corp',
    requestType: 'policy_change',
    stage: 'completed',
    status: 'closed',
    assignedToAdmin: 'Steve',
    submittedBy: 'Grace Park',
    managerName: 'Hank Brown',
    ceoName: 'Irene Wu',
    submittedAt: '2026-03-01T08:00:00Z',
    deleted: false,
  },
  {
    Id: 5,
    title: 'Add new department: Data Science',
    description: 'Create the Data Science department under CTO',
    companyName: 'Globex Inc',
    requestType: 'org_change',
    stage: 'rejected',
    status: 'closed',
    assignedToAdmin: 'Liam',
    submittedBy: 'James Kim',
    managerName: 'Karen Ng',
    submittedAt: '2026-02-10T11:45:00Z',
    deleted: false,
  },
  {
    Id: 6,
    title: 'Update expense approval limits',
    description: 'Raise manager approval threshold from $500 to $1000',
    companyName: 'Initech',
    requestType: 'policy_change',
    stage: 'manager_review',
    status: 'on_hold',
    assignedToAdmin: 'Jack',
    submittedBy: 'Laura Smith',
    managerName: 'Mike Torres',
    submittedAt: '2026-02-25T16:20:00Z',
    deleted: false,
  },
  {
    Id: 7,
    title: 'Provision SSO for new hires',
    description: 'Set up SSO accounts for 8 new employees joining in March',
    companyName: 'Acme Corp',
    requestType: 'access_request',
    stage: 'new',
    status: 'open',
    assignedToAdmin: 'Steve',
    submittedBy: 'Nathan Reed',
    submittedAt: '2026-03-05T13:00:00Z',
    deleted: false,
  },
  {
    Id: 8,
    title: 'Merge sales teams A and B',
    description: 'Consolidate two regional sales teams into one national team',
    companyName: 'Globex Inc',
    requestType: 'org_change',
    stage: 'completed',
    status: 'closed',
    assignedToAdmin: 'John',
    submittedBy: 'Olivia Yang',
    managerName: 'Peter Grant',
    ceoName: 'Quinn Zhao',
    submittedAt: '2026-03-02T09:30:00Z',
    deleted: false,
  },
]

let resetTickets = [...TicketData]

// GET request to retrieve change request data
export async function GET(req: NextRequest) {
  let isBrowserRefreshed = req.headers.get('browserrefreshed')
  try {
    if (isBrowserRefreshed === 'false') {
      return NextResponse.json({
        status: 200,
        msg: 'Success',
        data: TicketData,
      })
    } else {
      TicketData = resetTickets
      return NextResponse.json({
        status: 200,
        msg: 'Success',
        data: resetTickets,
      })
    }
  } catch (error) {
    return NextResponse.json({
      status: 400,
      msg: 'Internal server error',
      error,
    })
  }
}

// DELETE endpoint for deleting a change request
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const tickets = TicketData.filter((ticket) => ticket.Id !== id)
    TicketData = tickets
    return NextResponse.json({ status: 200, msg: 'Success', data: TicketData })
  } catch (error) {
    return NextResponse.json({
      status: 400,
      msg: 'Internal server error',
      error,
    })
  }
}

// POST endpoint for creating a change request
export async function POST(req: NextRequest) {
  try {
    const newTicket = await req.json()
    TicketData.push(newTicket)
    return NextResponse.json({ status: 200, msg: 'Success', data: TicketData })
  } catch (error) {
    return NextResponse.json({
      status: 400,
      msg: 'Internal server error',
      error,
    })
  }
}
