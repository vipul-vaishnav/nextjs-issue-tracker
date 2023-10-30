'use client'

import { getUsers } from '@/app/handlers/getUsers'
import { Select } from '@radix-ui/themes'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import Skeleton from '@/app/components/Skeleton'
import { assignReq } from '@/app/handlers/assignIssue'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

type AssigneeSelectProps = {
  assignedTo: string | null
  id: number
}

const AssigneeSelect: React.FC<AssigneeSelectProps> = ({ id, assignedTo }) => {
  const [queryKey, queryFn] = getUsers()
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
    staleTime: 60 * 1000
  })

  const assignMutation = useMutation({
    mutationFn: assignReq,
    onSuccess: () => {
      toast.success('Issue Assigned Successfully!')
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || err.message)
      } else if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('Unable to assign, something toast.error')
      }
    }
  })

  const handleReq = (userId: string) => {
    return assignMutation.mutate({
      issueId: id,
      userId: userId === 'UNASSIGN_ISSUE' ? null : userId
    })
  }

  if (isLoading) {
    return <Skeleton height={'36px'} width={'180px'} />
  }

  if (isError) {
    return null
  }

  return (
    <div className="md:w-auto md:max-w-[180px] w-full">
      <Select.Root
        size="3"
        defaultValue={assignedTo ? assignedTo : 'UNASSIGN_ISSUE'}
        onValueChange={(userId) => handleReq(userId)}
      >
        <Select.Trigger className="w-full" placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions...</Select.Label>
            <Select.Item value={'UNASSIGN_ISSUE'}>UnAssigned</Select.Item>
            {data?.data.map((user, idx) => {
              return (
                <Select.Item key={idx} value={user.id}>
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
