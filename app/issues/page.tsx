import { Button, Table } from '@radix-ui/themes'
import React from 'react'
import Link from 'next/link'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'

import StatusBadge from '../components/StatusBadge'
import IssueActions from '../components/IssueActions'

type IssuesPageProps = {
  searchParams: { status: Status }
}

const IssuesPage: React.FC<IssuesPageProps> = async (props) => {
  const {
    searchParams: { status }
  } = props

  const issues: Issue[] = await prisma.issue.findMany({
    where: {
      status: Object.values(Status).includes(status) ? status : undefined
    }
  })

  return (
    <div className="space-y-5">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="hidden md:table-cell"></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created At</Table.ColumnHeaderCell>
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
                {new Date(issue.createdAt).toISOString().split('T')[0]}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export default IssuesPage
