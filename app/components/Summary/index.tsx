import { Status } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

type SummaryProps = {
  open: number
  inProgress: number
  closed: number
}

type T = {
  label: string
  value: number
  status: Status
}

const StatusCard: React.FC<T> = ({ label, status, value }) => {
  return (
    <Card size={'2'}>
      <Flex direction={'column'} gap="3" align={'start'}>
        <Heading size="2">{label}</Heading>
        <Text size={'8'} className="font-bold">
          {value}
        </Text>
        <Link
          href={`/issues/?status=${status}`}
          className="text-sm hover:opacity-50 text-pink-500 transition-all duration-300"
        >
          View Issues
        </Link>
      </Flex>
    </Card>
  )
}

const Summary: React.FC<SummaryProps> = (props) => {
  const { open, inProgress, closed } = props
  const summary: Array<T> = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' }
  ]
  return (
    <Flex gap="3">
      {summary.map((item, idx) => (
        <StatusCard key={idx} {...item} />
      ))}
    </Flex>
  )
}
export default Summary
