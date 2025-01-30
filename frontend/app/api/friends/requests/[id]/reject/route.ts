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

    // Reject the friend request
    const updatedRequest = await prisma.friendRequest.updateMany({
      where: {
        senderEmail,
        receiverEmail: session.user.email,
        status: 'pending', // Optional: To ensure only pending requests are updated
      },
      data: { status: 'rejected' },
    });

    if (updatedRequest.count === 0) {
      return NextResponse.json({ error: 'Friend request not found or already processed' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Friend request rejected' });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
