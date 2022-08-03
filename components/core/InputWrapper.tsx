/** @format */

import InputCaptionText from "./InputCaptionText";

interface IInputWrapper {
  children: React.ReactElement | React.ReactElement[];
  inputType: "TEXT" | "NUMBER" | "COLOR" | "PICKER" | "DROPDOWN";
  captionText: string;
}
const InputWrapper = ({ children, inputType, captionText }: IInputWrapper) => {
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
      className={`w-full h-auto flex items-start justify-center flex-col my-2`}
    >
      <InputCaptionText text={captionText} />
      <div
        className={`w-full h-auto flex items-start justify-center flex-col my-2  overflow-x-scroll`}
      >
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
