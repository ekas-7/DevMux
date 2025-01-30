import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { senderEmail } = await request.json();

    if (!senderEmail) {
      return NextResponse.json({ error: 'Sender email is required' }, { status: 400 });
    }

    // Verify the friend request exists and belongs to the user
    const friendRequest = await prisma.friendRequest.findFirst({
      where: {
        senderEmail,
        receiverEmail: session.user.email,
      },
    });

    if (!friendRequest) {
      return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
    }

    // Update the friend request status
    await prisma.friendRequest.updateMany({
      where: {
        senderEmail,
        receiverEmail: session.user.email,
      },
      data: { status: 'accepted' },
    });

    // Update the friends relation for both users
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        friends: {
          connect: { email: senderEmail },
        },
      },
    });

    // Add the reverse connection
    await prisma.user.update({
      where: { email: senderEmail },
      data: {
        friends: {
          connect: { email: session.user.email },
        },
      },
    });

    return NextResponse.json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
