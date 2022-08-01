/** @format */
import { useRouter } from 'next/router';

const Trip = () => {
  const router = useRouter();
  const { tripId } = router.query;

  return (
    <div>
      <div>trip: {tripId}</div>
    </div>
  );
};

export default Trip;
