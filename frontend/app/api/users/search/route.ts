import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
            ],
          },
          { 
            email: { 
              not: session.user.email 
            } 
          },
          {
            AND: [
              { friendOf: { none: { email: session.user.email } } },
              { friends: { none: { email: session.user.email } } },
            ]
          },
          {
            AND: [
              { 
                receivedRequests: { 
                  none: { 
                    senderEmail: session.user.email,
                    status: 'pending'
                  } 
                } 
              },
              { 
                sentRequests: { 
                  none: { 
                    receiverEmail: session.user.email,
                    status: 'pending'
                  } 
                } 
              }
            ]
          }
        ]
      },
      select: {
        email: true,
        name: true,
      },
      take: 10,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 