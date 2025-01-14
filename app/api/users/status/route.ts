import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { status },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 