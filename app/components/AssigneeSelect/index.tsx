'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'

type AssigneeSelectProps = {}

const AssigneeSelect: React.FC<AssigneeSelectProps> = () => {
  return (
    <div className="md:w-auto md:max-w-[180px] w-full">
      <Select.Root size="3">
        <Select.Trigger className="w-full" placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions...</Select.Label>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default AssigneeSelect
