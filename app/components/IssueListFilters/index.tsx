'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type IssueListFiltersProps = {
  currStatus: Status | 'all'
}

const statuses = Object.values(Status)

const IssueListFilters: React.FC<IssueListFiltersProps> = ({ currStatus }) => {
  const router = useRouter()
  const obj = useSearchParams()

  const handleRouteChange = (arg: Status | 'all') => {
    const alreadyHasSearchParams = obj.get('orderBy')
    const alreadyHasPageParams = obj.get('page')
    const params = new URLSearchParams()

    if (arg !== 'all' && statuses.includes(arg)) {
      params.append('status', arg)
    }

    if (alreadyHasSearchParams) {
      params.append('orderBy', alreadyHasSearchParams)
    }

    if (alreadyHasPageParams) {
      params.append('page', alreadyHasPageParams)
    }

    const query = params.size ? '?' + params.toString() : ''

    router.push('/issues' + query)
  }

  return (
    <Select.Root size="3" defaultValue={currStatus} onValueChange={(value: Status | 'all') => handleRouteChange(value)}>
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
