import { Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Markdown from 'react-markdown'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage: React.FC = (): React.ReactElement => {
  return (
    <Box className="max-w-screen-sm mx-auto">
      <div className="space-y-4">
        <Skeleton width={'25rem'} />
        <Flex gap="4">
          <Skeleton width={'5rem'} />
          <Skeleton width={'5rem'} />
        </Flex>
      </div>
      <Card className="prose mt-12">
        <Skeleton count={4} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage
