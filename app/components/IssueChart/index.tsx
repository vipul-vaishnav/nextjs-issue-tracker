'use client'

import { Card } from '@radix-ui/themes'
import React from 'react'
import { ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from 'recharts'

type IssueChartProps = {
  open: number
  inProgress: number
  closed: number
}

type T = {
  label: string
  value: number
}

const IssueChart: React.FC<IssueChartProps> = ({ closed, inProgress, open }) => {
  const summary: Array<T> = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed }
  ]

  return (
    <Card>
      <ResponsiveContainer width={'100%'} height={336}>
        <BarChart data={summary}>
          <XAxis dataKey={'label'} />
          <YAxis />
          <Bar dataKey={'value'} barSize={60} fill="#ec4899" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
export default IssueChart
