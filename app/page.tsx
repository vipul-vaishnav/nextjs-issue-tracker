import prisma from '@/prisma/client'
import LatestIssues from './components/LatestIssues'
import Summary from './components/Summary'

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  return (
    <div>
      <Summary closed={closed} inProgress={inProgress} open={open} />
      <LatestIssues />
    </div>
  )
}
