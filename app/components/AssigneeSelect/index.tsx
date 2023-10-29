'use client'

import { getUsers } from '@/app/handlers/getUsers'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Skeleton from '@/app/components/Skeleton'

type AssigneeSelectProps = {}

const AssigneeSelect: React.FC<AssigneeSelectProps> = () => {
  const [queryKey, queryFn] = getUsers()
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
    staleTime: 60 * 1000
  })

  if (isLoading) {
    return <Skeleton />
  }

  if (isError) {
    return null
  }

  return (
    <div className="md:w-auto md:max-w-[180px] w-full">
      <Select.Root size="3">
        <Select.Trigger className="w-full" placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions...</Select.Label>
            {data?.data.map((user, idx) => {
              return (
                <Select.Item key={idx} value="apple">
                  {user.name}
                </Select.Item>
              )
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default AssigneeSelect
