/** @format */

import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseConfig } from '../../lib/firebase/config';

import Loading from '../../pages/loading';
import Error from '../../pages/error';

interface IProtectedPage {
  children: React.ReactElement | React.ReactElement[];
}
const ProtectedPage = ({ children }: IProtectedPage) => {
  const nextRouter = useRouter();
  const [user, loading, error] = useAuthState(FirebaseConfig.auth);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error error={error} />;
  } else if (!user) {
    typeof window !== 'undefined' && nextRouter.push('/signin');
    return <></>;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedPage;
