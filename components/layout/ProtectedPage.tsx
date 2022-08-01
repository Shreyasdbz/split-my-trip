/** @format */

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface IProtectedPage {
  children: React.ReactElement | React.ReactElement[];
}
const ProtectedPage = ({ children }: IProtectedPage) => {
  const nextRouter = useRouter();
  const { data: session, status } = useSession({
    required: true,
  });

  if (!session) {
    typeof window !== 'undefined' && nextRouter.push('/signOn');
    return <></>;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedPage;
