import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return NextResponse.json(
    {
      message: 'Users fetched successfully!',
      data: users
    },
    {
      status: 200,
      statusText: 'OK'
    }
  )
}
