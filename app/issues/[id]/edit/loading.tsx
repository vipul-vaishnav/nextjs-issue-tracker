import Skeleton from '@/app/components/Skeleton'
import { Box } from '@radix-ui/themes'
import React from 'react'

type EditIssueLoadingProps = {}

const EditIssueLoading: React.FC<EditIssueLoadingProps> = () => {
  return  <Box>
  <div className="max-w-screen-sm space-y-4 mx-auto">
    <div>
      <Skeleton />
    </div>

    <div>
      <Skeleton height={320} />
    </div>
    <Skeleton />
  </div>
</Box>
}

export default EditIssueLoading
