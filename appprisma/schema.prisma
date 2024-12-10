import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const report = await prisma.report.create({
      data: {
        ...data,
        date: new Date(data.date),
        submitTime: new Date(data.submitTime)
      }
    })
    return NextResponse.json(report)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        submitTime: 'desc'
      }
    })
    return NextResponse.json(reports)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}
