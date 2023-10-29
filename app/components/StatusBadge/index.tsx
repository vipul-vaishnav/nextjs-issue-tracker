import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

type StatusBadgeProps = {
  status: Status
}

const StatusMap: Record<Status, { label: string; type: 'orange' | 'crimson' | 'green' }> = {
  OPEN: {
    label: 'Open',
    type: 'orange'
  },
  CLOSED: {
    label: 'Closed',
    type: 'green'
  },
  IN_PROGRESS: {
    label: 'In Progress',
    type: 'crimson'
  }
}

const StatusBadge: React.FC<StatusBadgeProps> = (props) => {
  const { status } = props

  const statusData = StatusMap[status]

  return <Badge color={statusData.type}>{statusData.label}</Badge>
}

export default StatusBadge
