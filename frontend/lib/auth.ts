import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/googe';

export const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

