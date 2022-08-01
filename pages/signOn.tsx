/** @format */

import Button from '../components/core/Button';

const SignOn = () => {
  return (
    <div>
      <div>
        <h1>Split My Trip</h1>
        <Button
          tid='sign-on-btn'
          text='Sign On With Google'
          outline={true}
          onClickAction={() => {
            //
          }}
        />
      </div>
    </div>
  );
};

export default SignOn;
