import { Flex, Card, Box, Grid } from '@radix-ui/themes'
import React from 'react'
import Skeleton from '@/app/components/Skeleton'

const LoadingIssueDetailPage: React.FC = (): React.ReactElement => {
  return (
    <Grid columns={{ initial: '1', sm: '8' }} gap="5">
      <Box className="md:col-span-6">
        <div className="space-y-4">
          <div className="w-full max-w-md">
            <Skeleton />
          </div>
          <Flex gap="4">
            <Skeleton width={'5rem'} />
            <Skeleton width={'5rem'} />
          </Flex>
        </div>
        <Card className="prose mt-12">
          <Skeleton count={4} />
        </Card>
      </Box>
      <Box className="md:col-span-2">
        <Flex direction={'column'} gap="4">
          <Skeleton className="w-full md:w-auto" height={30} />
          <Skeleton className="w-full md:w-auto" height={30} />
          <Skeleton className="w-full md:w-auto" height={30} />
        </Flex>
      </Box>
    </Grid>
  )
}

export default LoadingIssueDetailPage
