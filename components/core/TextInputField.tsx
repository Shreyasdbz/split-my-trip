/** @format */

import { Dispatch, SetStateAction } from "react";

interface ITextInputField {
  type: "TEXT" | "NUMBER";
  text: string;
  onChangeHandler: Dispatch<SetStateAction<string>>;
}

const TextInputField = ({ type, text, onChangeHandler }: ITextInputField) => {
  function getInputType(): string {
    switch (type) {
      case "TEXT":
        return "text";
      case "NUMBER":
        return "number";
      default:
        return "text";
    }
  }

  return (
    <div className="w-full">
      <input
        className="w-full bg-gray-100 focus:bg-gray-200 rounded-md h-10 px-2 outline-2 outline-gray-200 font-light"
        type={getInputType()}
        value={text}
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInputField;
