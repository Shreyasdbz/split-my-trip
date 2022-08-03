/** @format */

import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface INumberInputField {
  text: number;
  onChangeHandler: Dispatch<SetStateAction<number>>;
  errorText?: string;
}

const NumberInputField = ({
  text,
  onChangeHandler,
  errorText,
}: INumberInputField) => {
  const [error, setError] = useState<boolean>(false);

  function errorTextHandler(textVal: string) {
    if (textVal.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }

  useEffect(() => {
    errorTextHandler(String(text));
  }, []);

  return (
    <div className="w-full">
      <input
        className="w-full bg-gray-100 focus:bg-gray-200 rounded-md h-10 px-2 outline-2 outline-gray-200 font-light"
        type={"number"}
        placeholder={"$"}
        value={text}
        onChange={(e) => {
          errorTextHandler(e.target.value);
          try {
            onChangeHandler(parseFloat(e.target.value));
          } catch (error) {
            console.error("parse error");
          }
        }}
      />
      {error && <span className="text-red-400 text-sm ">{errorText}</span>}
    </div>
  );
};

export default NumberInputField;
