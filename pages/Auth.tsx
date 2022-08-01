/** @format */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from './loading';

interface IAuth {
  children: React.ReactNode;
}
function Auth({ children }: IAuth) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!isUser) router.push('/login'); //Redirect to login
  }, [isUser, status]);

  if (isUser) {
    return children;
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loading />;
}

export default Auth;
