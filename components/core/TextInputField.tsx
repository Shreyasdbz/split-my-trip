/** @format */

import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface ITextInputField {
  text: string;
  onChangeHandler: Dispatch<SetStateAction<string>>;
  errorText?: string;
}

const TextInputField = ({
  text,
  onChangeHandler,
  errorText,
}: ITextInputField) => {
  const [error, setError] = useState<boolean>(false);

  function errorTextHandler(textVal: string) {
    if (textVal.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }

  useEffect(() => {
    errorTextHandler(text);
  }, [text]);

  return (
    <div className="w-full">
      <input
        className="w-full bg-gray-100 focus:bg-gray-200 rounded-md h-10 px-2 outline-2 outline-gray-200 font-light"
        type={"text"}
        value={text}
        onChange={(e) => {
          errorTextHandler(e.target.value);
          onChangeHandler(e.target.value);
        }}
      />
      {error && <span className="text-red-400 text-sm ">{errorText}</span>}
    </div>
  );
};

export default TextInputField;
