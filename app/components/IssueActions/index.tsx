import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

type IssueActionsProps = {}

const IssueActions: React.FC<IssueActionsProps> = () => {
  return (
    <Link href="/issues/new">
      <Button size={'3'}>Add New Issue</Button>
    </Link>
  )
}
export default IssueActions
