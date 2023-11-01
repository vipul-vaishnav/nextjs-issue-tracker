import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueListFilters from '../IssueListFilters'
import { Status } from '@prisma/client'

type IssueActionsProps = {
  currStatus: Status | 'all'
}

const IssueActions: React.FC<IssueActionsProps> = ({ currStatus }) => {
  return (
    <Flex justify={'between'}>
      <IssueListFilters currStatus={currStatus} />
      <Link href="/issues/new">
        <Button size={'3'}>Add New Issue</Button>
      </Link>
    </Flex>
  )
}
export default IssueActions
