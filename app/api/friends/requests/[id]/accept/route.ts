import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
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

    const { senderEmail } = await request.json();
    const requestId = params.id;

    // Accept the friend request
    const friendRequest = await prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: 'accepted' },
    });

    // Update the friends relation for both users
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        friends: {
          connect: { email: friendRequest.senderEmail }
        }
      }
    });

    // Add the reverse connection
    await prisma.user.update({
      where: { email: friendRequest.senderEmail },
      data: {
        friends: {
          connect: { email: session.user.email }
        }
      }
    });

    return NextResponse.json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 