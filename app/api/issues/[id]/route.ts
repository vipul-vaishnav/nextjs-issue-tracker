import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { createIssueSchema } from '../route'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

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

// UPDATE AN ISSUE
export async function PUT(req: NextRequest, { params }: Args) {
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
  const body = await req.json()

  const validation = createIssueSchema.safeParse(body)

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
      title: body.title,
      description: body.description
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
