import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';




export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { meetingId, friendEmail } = await req.json();

    const updatedMeeting = await prisma.meeting.update({
      where: { id: meetingId },
      data: {
        participants: {
          connect: { email: friendEmail }
        }
      },
    });

    return NextResponse.json(updatedMeeting);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 