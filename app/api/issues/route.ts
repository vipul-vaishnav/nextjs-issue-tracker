import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export const createIssueSchema = z.object({
  title: z.string().min(1, { message: 'Title is Required' }).max(255),
  description: z.string().min(1, { message: 'Description is Required' })
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      {
        message: 'Unauthorised'
      },
      { status: 401, statusText: 'NOT OK' }
    )
  }

  const body = await req.json()

  const validation = createIssueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400, statusText: 'NOT OK' })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  })

  return NextResponse.json(
    {
      message: 'Issue created successfully!',
      data: newIssue
    },
    { status: 201, statusText: 'OK' }
  )
}
