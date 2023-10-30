import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueListFilters from '../IssueListFilters'

type IssueActionsProps = {}

const IssueActions: React.FC<IssueActionsProps> = () => {
  return (
    <Flex justify={'between'}>
      <IssueListFilters />
      <Link href="/issues/new">
        <Button size={'3'}>Add New Issue</Button>
      </Link>
    </Flex>
  )
}
export default IssueActions
