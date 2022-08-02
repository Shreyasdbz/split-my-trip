/** @format */

interface IInputWrapper {
  children: React.ReactElement | React.ReactElement[];
}
const InputWrapper = ({ children }: IInputWrapper) => {
  return (
    <div className="w-full h-auto flex items-start justify-center flex-col my-2">
      {children}
    </div>
  );
};

export default InputWrapper;
