/** @format */
import { useRouter } from 'next/router';

import ProtectedPage from '../../components/layout/ProtectedPage';

const Trip = () => {
  const router = useRouter();
  const { tripId } = router.query;

  return (
    <ProtectedPage>
      <div>
        <div>trip: {tripId}</div>
      </div>
    </ProtectedPage>
  );
};

export default Trip;
