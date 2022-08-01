/** @format */
const Error = ({ error }: IFirebaseHookAuthError) => {
  return (
    <div>
      <div>
        <span className='text-xl'>Error happened</span>
      </div>
      <div>
        <span>{error}</span>
      </div>
    </div>
  );
};

export default Error;
