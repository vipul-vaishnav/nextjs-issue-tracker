import { Badge, Button } from '@radix-ui/themes'
import React from 'react'
import Link from 'next/link'

type IssuesPageProps = {}

const IssuesPage: React.FC<IssuesPageProps> = () => {
  return (
    <div>
      Have a good coding
      <Badge color="orange">In progress</Badge>
      <Button size={'3'}>
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </div>
  )
}
export default IssuesPage
