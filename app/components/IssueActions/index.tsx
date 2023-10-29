import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

type IssueActionsProps = {}

const IssueActions: React.FC<IssueActionsProps> = () => {
  return (
    <Button size={'3'}>
      <Link href="/issues/new">Add New Issue</Link>
    </Button>
  )
}
export default IssueActions
