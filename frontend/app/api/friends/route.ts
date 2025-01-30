import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const friends = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        friends: {
          select: {
            email: true,
            name: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json(friends?.friends || []);
  } catch (error) {
    console.error('Error fetching friends:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 