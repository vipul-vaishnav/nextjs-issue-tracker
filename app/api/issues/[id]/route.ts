import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { z } from 'zod'
import { Status } from '@prisma/client'

type Args = {
  params: {
    id: string
  }
}

// GET AN ISSUE
export async function GET(req: NextRequest, { params }: Args) {
  const { id } = params

  if (isNaN(parseInt(id))) {
    return NextResponse.json(
      {
        message: 'Invalid Id'
      },
      { status: 400, statusText: 'NOT OK' }
    )
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!issue) {
    return NextResponse.json(
      {
        message: 'Issue not found'
      },
      {
        status: 404,
        statusText: 'NOT OK'
      }
    )
  }

  return NextResponse.json(
    {
      message: 'Issue found successfully',
      data: issue
    },
    { status: 200, statusText: 'OK' }
  )
}

const updateIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z.string().min(1, 'Description is required').max(65535).optional(),
  assignedToUserId: z.string().min(1, 'AssignedToUserId is required').max(255).optional().nullable(),
  status: z.enum(['OPEN', 'CLOSED', 'IN_PROGRESS']).default('OPEN').optional()
})

// UPDATE AN ISSUE
export async function PUT(req: NextRequest, { params }: Args) {
  const session = await getServerSession(authOptions)

  // if (!session) {
  //   return NextResponse.json(
  //     {
  //       message: 'Unauthorised'
  //     },
  //     { status: 401, statusText: 'NOT OK' }
  //   )
  // }

  const { id } = params
  const body = await req.json()
  const { title, description, assignedToUserId, status } = body
  const validation = updateIssueSchema.safeParse(body)

  const statuses = Object.values(Status)
  const isStatusValid = statuses.includes(status)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400, statusText: 'NOT OK' })
  }

  if (isNaN(parseInt(id))) {
    return NextResponse.json(
      {
        message: 'Invalid Id'
      },
      { status: 400, statusText: 'NOT OK' }
    )
  }

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId
      }
    })

    if (!user) {
      return NextResponse.json(
        {
          message: "User doesn't exists, Invalid user id"
        },
        { status: 400, statusText: 'NOT OK' }
      )
    }
  }

  if (status && !isStatusValid) {
    return NextResponse.json(
      {
        message: 'Invalid Status'
      },
      { status: 400, statusText: 'NOT OK' }
    )
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!issue) {
    return NextResponse.json(
      {
        message: 'Issue not found'
      },
      {
        status: 404,
        statusText: 'NOT OK'
      }
    )
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      ...issue,
      title: title,
      description: description,
      assignedToUserId: assignedToUserId,
      status: status
    }
  })

  return NextResponse.json(
    {
      message: 'Issue updated successfully',
      data: updatedIssue
    },
    { status: 200, statusText: 'OK' }
  )
}

// DELETE AN ISSUE
export async function DELETE(req: NextRequest, { params }: Args) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      {
        message: 'Unauthorised'
      },
      { status: 401, statusText: 'NOT OK' }
    )
  }
  const { id } = params

  if (isNaN(parseInt(id))) {
    return NextResponse.json(
      {
        message: 'Invalid Id'
      },
      { status: 400, statusText: 'NOT OK' }
    )
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!issue) {
    return NextResponse.json(
      {
        message: 'Issue not found'
      },
      {
        status: 404,
        statusText: 'NOT OK'
      }
    )
  }

  await prisma.issue.delete({
    where: { id: parseInt(id) }
  })

  return NextResponse.json(
    {
      message: 'Issue deleted successfully'
    },
    { status: 200, statusText: 'OK' }
  )
}
