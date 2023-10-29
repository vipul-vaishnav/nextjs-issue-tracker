import React from 'react'
import Markdown from 'react-markdown'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'

import StatusBadge from '../StatusBadge'

type IssueDetailsProps = {
  issue: Issue
}

const IssueDetails: React.FC<IssueDetailsProps> = (props) => {
  const { issue } = props

  return (
    <React.Fragment>
      <div className="space-y-4">
        <Heading as="h1">{issue.title}</Heading>

        <Flex gap="4">
          <StatusBadge status={issue.status} />
          <Text>{new Date(issue.createdAt).toDateString()}</Text>
        </Flex>
      </div>
      <Card className="prose mt-8 max-w-full">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </React.Fragment>
  )
}

export default IssueDetails
