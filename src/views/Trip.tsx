/** @format */

import { useParams } from "react-router-dom";

const Trip = () => {
  let tripID = useParams().tripID;
  return (
    <div className="page">
      <h1>Trip!!! of id: {tripID}</h1>
    </div>
  );
};

export default Trip;
