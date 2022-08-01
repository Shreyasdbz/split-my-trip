/** @format */

import Header from './Header';

interface INavigationWrapper {
  children: React.ReactElement | React.ReactElement[];
}
const NavigationWrapper = ({ children }: INavigationWrapper) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default NavigationWrapper;
