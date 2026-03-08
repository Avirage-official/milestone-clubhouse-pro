'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CardBox from '../shared/CardBox'
import { Badge } from '@/components/ui/badge'

export const TeamPerformance = () => {
  const TeamsData = [
    {
      key: 'team1',
      team: 'Product',
      focusScore: '8.9',
      breakScore: '7.8',
      connectionScore: '8.3',
      pulse: 'Excellent',
      bgcolor: 'bg-success text-white',
    },
    {
      key: 'team2',
      team: 'Engineering',
      focusScore: '8.5',
      breakScore: '7.2',
      connectionScore: '7.9',
      pulse: 'High',
      bgcolor: 'bg-primary text-white',
    },
    {
      key: 'team3',
      team: 'Sales',
      focusScore: '7.6',
      breakScore: '8.1',
      connectionScore: '8.7',
      pulse: 'High',
      bgcolor: 'bg-primary text-white',
    },
    {
      key: 'team4',
      team: 'People Ops',
      focusScore: '7.1',
      breakScore: '8.5',
      connectionScore: '9.0',
      pulse: 'Medium',
      bgcolor: 'bg-secondary text-white',
    },
    {
      key: 'team5',
      team: 'Marketing',
      focusScore: '6.8',
      breakScore: '6.9',
      connectionScore: '7.4',
      pulse: 'Low',
      bgcolor: 'bg-error text-white',
    },
  ]
  return (
    <CardBox>
      <div className='mb-6'>
        <div>
          <h5 className='card-title'>Team Clubhouse performance</h5>
          <p className='text-sm text-muted-foreground font-normal'>
            Overview of how each team is doing
          </p>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='-m-1.5 overflow-x-auto'>
          <div className='p-1.5 min-w-full inline-block align-middle'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-sm font-semibold'>Rank</TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Team
                    </TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Focus score
                    </TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Break score
                    </TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Connection score
                    </TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Pulse
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {TeamsData.map((item, index) => (
                    <TableRow key={item.key} className='border-b border-border'>
                      <TableCell>
                        <p className='text-muted-foreground font-medium text-sm'>
                          {index + 1}
                        </p>
                      </TableCell>

                      <TableCell className='ps-0 min-w-[200px]'>
                        <h6 className='text-sm font-semibold'>
                          {item.team}
                        </h6>
                      </TableCell>

                      <TableCell>
                        <p className='font-medium text-muted-foreground text-sm'>
                          {item.focusScore}
                        </p>
                      </TableCell>

                      <TableCell>
                        <p className='font-medium text-muted-foreground text-sm'>
                          {item.breakScore}
                        </p>
                      </TableCell>

                      <TableCell>
                        <p className='font-medium text-muted-foreground text-sm'>
                          {item.connectionScore}
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`text-[13px] px-3 rounded-full justify-center py-0.5 ${item.bgcolor}`}>
                          {item.pulse}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  )
}
