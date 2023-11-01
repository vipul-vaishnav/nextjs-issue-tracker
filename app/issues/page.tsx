import { Table } from '@radix-ui/themes'
import React from 'react'
import Link from 'next/link'
import prisma from '@/prisma/client'
import { BsArrowUpShort } from 'react-icons/bs'
import { Issue, Status } from '@prisma/client'

import StatusBadge from '../components/StatusBadge'
import IssueActions from '../components/IssueActions'
import Pagination from '../components/Pagination'

type Col = {
  label: string
  hide: boolean
  value?: keyof Issue
}

const COLUMNS: Array<Col> = [
  { label: '', hide: true },
  { label: 'Issue', hide: false, value: 'title' },
  { label: 'Status', hide: true, value: 'status' },
  { label: 'Created', hide: true, value: 'createdAt' }
]

type IssuesPageProps = {
  searchParams: { status: Status; orderBy: keyof Issue; page: string }
}

const IssuesPage: React.FC<IssuesPageProps> = async (props) => {
  const {
    searchParams: { status, orderBy, page }
  } = props

  const where = {
    status: Object.values(Status).includes(status) ? status : undefined
  }

  const PAGE_SIZE = 10

  const currPage = !isNaN(parseInt(page)) ? parseInt(page) : 1

  const issues: Issue[] = await prisma.issue.findMany({
    where,
    ...(orderBy &&
      COLUMNS.some((col) => col.value === orderBy) && {
        orderBy: {
          [orderBy]: 'asc'
        }
      }),
    skip: (currPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE
  })

  const count = await prisma.issue.count({ where })

  return (
    <div className="space-y-5">
      <IssueActions currStatus={status ?? 'all'} />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {COLUMNS.map((col, idx) => (
              <Table.ColumnHeaderCell key={idx} className={col.hide ? 'hidden md:table-cell' : ''}>
                <Link
                  href={{
                    query: { ...props.searchParams, orderBy: col.value }
                  }}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {orderBy && col.value === orderBy && <BsArrowUpShort size={20} />}
                  </span>
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue, idx) => (
            <Table.Row key={idx}>
              <Table.Cell className="font-medium hidden md:table-cell">{idx + 1}</Table.Cell>
              <Table.RowHeaderCell>
                <div className="space-y-2 md:space-y-0">
                  <Link
                    href={`/issues/${issue.id}`}
                    className="hover:text-pink-500 transition-all duration-300 hover:underline"
                  >
                    {issue.title}
                  </Link>
                  <div className="block md:hidden">
                    <StatusBadge status={issue.status} />
                  </div>
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {new Date(issue.createdAt).toLocaleDateString('en-In', {
                  weekday: 'long',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination currPage={currPage} pageSize={PAGE_SIZE} itemCount={count} />
    </div>
  )
}
export default IssuesPage
