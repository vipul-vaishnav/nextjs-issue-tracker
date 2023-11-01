'use client'

import { Flex, Text, Button } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight
} from 'react-icons/md'

type PaginationProps = {
  itemCount: number
  pageSize: number
  currPage: number
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { currPage, itemCount, pageSize } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(itemCount / pageSize)

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push('?' + params.toString())
  }

  if (pageCount <= 1) return null

  return (
    <Flex align={'center'} gap="3">
      <Text>
        Page {currPage} of {pageCount}
      </Text>
      <Button onClick={() => changePage(1)} color="gray" variant="soft" disabled={currPage === 1}>
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currPage === 1} onClick={() => changePage(currPage - 1)}>
        <MdKeyboardArrowLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currPage === pageCount} onClick={() => changePage(currPage + 1)}>
        <MdKeyboardArrowRight />
      </Button>
      <Button color="gray" variant="soft" disabled={currPage === pageCount} onClick={() => changePage(pageCount)}>
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  )
}
export default Pagination
