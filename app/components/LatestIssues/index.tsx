import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import StatusBadge from '../StatusBadge'

type LatestIssuesProps = {}

const LatestIssues: React.FC<LatestIssuesProps> = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true
    }
  })

  return (
    <Card>
      <Heading size={'4'} mb="5">
        Latest Issues
      </Heading>
      <Table.Root variant="ghost">
        <Table.Body>
          {issues.map((issue, idx) => (
            <Table.Row key={idx}>
              <Table.RowHeaderCell>
                <Flex align={'center'} justify={'between'}>
                  <Flex align={'start'} gap="3" direction={'column'}>
                    <Link
                      href={`/issues/${issue.id}`}
                      className="hover:text-pink-500 transition-all duration-300 hover:underline"
                    >
                      {issue.title}
                    </Link>
                    <StatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <>
                      <Avatar
                        src={issue.assignedToUser.image ?? ''}
                        fallback={issue.assignedToUser.name?.charAt(0).toUpperCase() ?? 'A'}
                        variant="soft"
                      />
                    </>
                  )}
                </Flex>
              </Table.RowHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}
export default LatestIssues
