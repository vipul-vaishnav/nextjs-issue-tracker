import prisma from '@/prisma/client'
import LatestIssues from './components/LatestIssues'
import Summary from './components/Summary'
import IssueChart from './components/IssueChart'
import { Flex, Grid } from '@radix-ui/themes'

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="6">
      <Flex direction={'column'} gap="6">
        <Summary closed={closed} inProgress={inProgress} open={open} />
        <IssueChart closed={closed} inProgress={inProgress} open={open} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
