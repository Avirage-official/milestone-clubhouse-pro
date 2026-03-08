'use client'

import { TbDotsVertical } from 'react-icons/tb'
import Image from 'next/image'
import CardBox from '@/app/components/shared/CardBox'
import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { RecognitionData } from '../table-data'

const BasicTable = () => {
  /*Table Action*/
  const tableActionData = [
    {
      icon: 'solar:add-circle-outline',
      listtitle: 'Add',
    },
    {
      icon: 'solar:pen-new-square-broken',
      listtitle: 'Edit',
    },
    {
      icon: 'solar:trash-bin-minimalistic-outline',
      listtitle: 'Delete',
    },
  ]

  return (
    <>
      <CardBox>
        <h3 className='text-xl font-semibold mb-1'>Recent recognition &amp; gifts</h3>
        <p className='text-sm text-muted-foreground mb-4'>Who&apos;s being celebrated in the Clubhouse.</p>

        <div className='flex flex-col border rounded-md border-ld'>
          <div className='-m-1.5 overflow-x-auto'>
            <div className='p-1.5 min-w-full inline-block align-middle'>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='text-sm font-semibold '>
                        From
                      </TableHead>
                      <TableHead className='text-sm font-semibold'>
                        To
                      </TableHead>
                      <TableHead className='text-sm font-semibold'>
                        Badge
                      </TableHead>
                      <TableHead className='text-sm font-semibold'>
                        Reason
                      </TableHead>
                      <TableHead className='text-sm font-semibold'>
                        When
                      </TableHead>
                      <TableHead className='text-sm font-semibold'></TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {RecognitionData.map((item, index) => (
                      <TableRow key={index} className='border-b border-border'>
                        {/* From */}
                        <TableCell className='min-w-[160px]'>
                          <div className='flex gap-3 items-center'>
                            <Image
                              src={item.fromImg}
                              alt='profile'
                              width={40}
                              height={40}
                              className='h-10 w-10 rounded-full'
                            />
                            <div>
                              <h6 className='text-sm font-semibold mb-1'>
                                {item.fromName}
                              </h6>
                            </div>
                          </div>
                        </TableCell>

                        {/* To */}
                        <TableCell className='min-w-[160px]'>
                          <div className='flex gap-3 items-center'>
                            <Image
                              src={item.toImg}
                              alt='profile'
                              width={40}
                              height={40}
                              className='h-10 w-10 rounded-full'
                            />
                            <div>
                              <h6 className='text-sm font-semibold mb-1'>
                                {item.toName}
                              </h6>
                            </div>
                          </div>
                        </TableCell>

                        {/* Badge */}
                        <TableCell>
                          <Badge
                            className={`text-sm rounded-full py-1 px-3 justify-center ${item.badgeBg}`}>
                            {item.badge}
                          </Badge>
                        </TableCell>

                        {/* Reason */}
                        <TableCell>
                          <p className='text-muted-foreground text-sm font-medium'>
                            {item.reason}
                          </p>
                        </TableCell>

                        {/* When */}
                        <TableCell>
                          <p className='text-muted-foreground text-sm font-medium'>
                            {item.when}
                          </p>
                        </TableCell>

                        {/* Actions Dropdown */}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <span className='h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer'>
                                <TbDotsVertical size={22} />
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-40'>
                              {tableActionData.map((action, idx) => (
                                <DropdownMenuItem
                                  key={idx}
                                  className='flex gap-3 items-center'>
                                  <Icon icon={action.icon} height={18} />
                                  <span>{action.listtitle}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
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
    </>
  )
}

export default BasicTable
