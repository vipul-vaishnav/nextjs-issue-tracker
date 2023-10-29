import { Badge } from '@radix-ui/themes'
import React from 'react'

type IssuesPageProps = {}

const IssuesPage: React.FC<IssuesPageProps> = () => {
  return (
    <div>
      Have a good coding
      <Badge color="orange">In progress</Badge>
    </div>
  )
}
export default IssuesPage
