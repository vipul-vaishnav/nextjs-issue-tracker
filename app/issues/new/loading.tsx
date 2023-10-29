import React from 'react'
import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type LoadingNewIssueProps = {}

const LoadingNewIssue: React.FC<LoadingNewIssueProps> = () => {
  return (
    <Box>
      <div className="max-w-screen-sm space-y-4 mx-auto">
        <div>
         <Skeleton/>
        </div>

        <div>
          <Skeleton height={320}/>
        </div>
        <Skeleton />
      </div>
    </Box>
  )
}
export default LoadingNewIssue
