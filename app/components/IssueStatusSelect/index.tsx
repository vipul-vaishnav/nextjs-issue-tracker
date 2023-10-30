'use client'

import { Select } from '@radix-ui/themes'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Status } from '@prisma/client'
import { updateStatus } from '@/app/handlers/updateStatus'
import { usePathname, useRouter } from 'next/navigation'

type IssueStatusSelectProps = {
  status: Status
  id: number
}

const IssueStatusSelect: React.FC<IssueStatusSelectProps> = ({ id, status }) => {
  const router = useRouter()
  const pathname = usePathname()
  const statusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      toast.success('Issue status updated successfully!')
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || err.message)
        router.push(pathname)
        router.refresh()
      } else if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('Unable to change status, something toast.error')
      }
    }
  })

  const handleStatus = (args: Status) => {
    return statusMutation.mutate({
      issueId: id,
      status: args
    })
  }

  return (
    <div className="md:w-auto md:max-w-[180px] w-full">
      <Select.Root size="3" defaultValue={status} onValueChange={(arg: Status) => handleStatus(arg)}>
        <Select.Trigger className="w-full" placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions...</Select.Label>
            {Object.values(Status).map((item, idx) => {
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
    </div>
  )
}

export default IssueStatusSelect
