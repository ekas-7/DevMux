import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Reject the friend request
    await prisma.friendRequest.update({
      where: {
        id: params.id
      },
      data: { status: 'rejected' },
    });

    return NextResponse.json({ message: 'Friend request rejected' });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 