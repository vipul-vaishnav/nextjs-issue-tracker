'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

type IssueListFiltersProps = {}

const statuses = Object.values(Status)

const IssueListFilters: React.FC<IssueListFiltersProps> = () => {
  const router = useRouter()

  const handleRouteChange = (arg: Status | 'all') => {
    if (arg === 'all') {
      router.push('/issues')
    } else if (statuses.includes(arg)) {
      router.push('/issues?status=' + arg)
    } else {
      router.push('/issues')
    }
  }

  return (
    <Select.Root size="3" defaultValue="all" onValueChange={(value: Status | 'all') => handleRouteChange(value)}>
      <Select.Trigger />
      <Select.Content placeholder="Filter by status..." className="w-[180px]">
        <Select.Group>
          <Select.Label>Statuses</Select.Label>
          <Select.Item value="all">All</Select.Item>
          {statuses.map((item, idx) => {
            return (
              <Select.Item key={idx} value={item}>
                {item
                  .split('_')
                  .map((item) => item.charAt(0) + item.slice(1).toLowerCase())
                  .join(' ')}
              </Select.Item>
            )
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default IssueListFilters
