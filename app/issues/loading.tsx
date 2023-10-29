import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import IssueActions from '../components/IssueActions'

type LoadingIssuesProps = {}

const LoadingIssues: React.FC<LoadingIssuesProps> = () => {
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
          {Array.from({ length: 7 }).map((_, idx) => (
            <Table.Row key={idx}>
              <Table.Cell className="font-medium hidden md:table-cell">{idx + 1}</Table.Cell>
              <Table.RowHeaderCell>
                <div className="space-y-2 md:space-y-0">
                  <Skeleton />
                  <div className="block md:hidden">
                    <Skeleton />{' '}
                  </div>
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />{' '}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />{' '}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export default LoadingIssues
