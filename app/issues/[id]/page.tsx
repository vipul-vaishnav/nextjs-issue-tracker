import StatusBadge from '@/app/components/StatusBadge'
import prisma from '@/prisma/client'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text, Box } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'

type IssueDetailPageProps = {
  params: { id: string }
}

const IssueDetailPage: React.FC<IssueDetailPageProps> = async (props) => {
  const {
    params: { id }
  } = props

  if (isNaN(parseInt(id))) {
    return notFound()
  }

  const issue: Issue | null = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  await delay(3500)

  if (!issue) {
    return notFound()
  }

  return (
    <Box className="max-w-screen-sm mx-auto">
      <div className="space-y-4">
        <Heading as="h1">{issue.title}</Heading>

        <Flex gap="4">
          <StatusBadge status={issue.status} />
          <Text>{new Date(issue.createdAt).toDateString()}</Text>
        </Flex>
      </div>
      <Card className="prose mt-12">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </Box>
  )
}
export default IssueDetailPage
