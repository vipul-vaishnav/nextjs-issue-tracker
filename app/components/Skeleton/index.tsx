import React from 'react'
import SkeletonComp, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type SkeletonCompProps = SkeletonProps

const Skeleton: React.FC<SkeletonCompProps> = (props) => {
  return <SkeletonComp {...props} />
}
export default Skeleton
