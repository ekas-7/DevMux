import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requests = await prisma.friendRequest.findMany({
      where: {
        receiverEmail: session.user.email,
        status: 'pending',
      },
      include: {
        sender: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { receiverEmail } = await req.json();
    const request = await prisma.friendRequest.create({
      data: {
        senderEmail: session.user.email,
        receiverEmail,
      },
    });

    return NextResponse.json(request);
  } catch (error) {
    console.error('Error creating friend request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 