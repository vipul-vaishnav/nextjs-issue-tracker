'use client'

import React from 'react'
import { TextArea, TextField, Button } from '@radix-ui/themes'

type NewIssuePageProps = {}

const NewIssuePage: React.FC<NewIssuePageProps> = () => {
  return (
    <div className="max-w-screen-sm space-y-4">
      <TextField.Root size={'3'}>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" size={'3'} />
      <Button size={'3'}>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage
