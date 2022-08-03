/** @format */

import InputCaptionText from "./InputCaptionText";

interface IInputWrapper {
  children: React.ReactElement | React.ReactElement[];
  inputType: "TEXT" | "NUMBER" | "COLOR" | "PICKER" | "DROPDOWN";
  captionText: string;
  compact?: boolean;
}
const InputWrapper = ({
  children,
  inputType,
  captionText,
  compact,
}: IInputWrapper) => {
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
      className={`w-full h-auto flex items-start justify-center flex-col ${
        compact ? "my-1" : "my-2"
      }`}
    >
      <InputCaptionText text={captionText} />
      <div
        className={`w-full h-auto flex items-start justify-center flex-col overflow-x-scroll ${
          compact ? "" : "my-2"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
