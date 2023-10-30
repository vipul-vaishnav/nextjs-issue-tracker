import React from 'react'
import prisma from '@/prisma/client'
import { Issue } from '@prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import EditAction from '@/app/components/EditAction'
import IssueDetails from '@/app/components/IssueDetails'
import DeleteAction from '@/app/components/DeleteAction'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AssigneeSelect from '@/app/components/AssigneeSelect'
import IssueStatusSelect from '@/app/components/IssueStatusSelect'

type IssueDetailPageProps = {
  params: { id: string }
}

const IssueDetailPage: React.FC<IssueDetailPageProps> = async (props) => {
  const session = await getServerSession(authOptions)
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

  if (!issue) {
    return notFound()
  }

  return (
    <Grid columns={{ initial: '1', sm: '8' }} gap="5">
      <Box className="md:col-span-6">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="md:col-span-2">
        <Flex direction={'column'} gap="4">
          {session && session.user && (
            <>
              <AssigneeSelect id={issue.id} assignedTo={issue.assignedToUserId} />
              <IssueStatusSelect id={issue.id} status={issue.status} />
              <EditAction id={issue.id} className="w-full md:w-auto" />
              <DeleteAction id={issue.id} className="w-full md:w-auto" />
            </>
          )}
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
