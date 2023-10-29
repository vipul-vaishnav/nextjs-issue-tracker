import React from 'react'
import delay from 'delay'
import prisma from '@/prisma/client'
import { Issue } from '@prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import EditAction from '@/app/components/EditAction'
import IssueDetails from '@/app/components/IssueDetails'

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
    <Grid columns={{ initial: '1', md: '2' }} gap="3">
      <Box>
        <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <EditAction id={issue.id} />
      </Box>
    </Grid>
  )
}
export default IssueDetailPage
