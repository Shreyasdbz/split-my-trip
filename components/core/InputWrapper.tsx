/** @format */

interface IInputWrapper {
  children: React.ReactElement | React.ReactElement[];
  inputType: "TEXT" | "NUMBER" | "COLOR" | "PICKER" | "DROPDOWN";
}
const InputWrapper = ({ children, inputType }: IInputWrapper) => {
  function getInputTypeClasses() {
    switch (inputType) {
      case "COLOR":
        return "overflow-x-scroll";
      default:
        return "";
    }
  }

  return (
    <div
      className={`w-full h-auto flex items-start justify-center flex-col my-2 ${getInputTypeClasses()}`}
    >
      {children}
    </div>
  );
};

export default InputWrapper;
