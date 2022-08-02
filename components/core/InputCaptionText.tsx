/** @format */

interface IInputCaptionText {
  text: string;
}
const InputCaptionText = ({ text }: IInputCaptionText) => {
  return (
    <span className="font-semibold uppercase text-gray-600 text-sm">
      {text}
    </span>
  );
};

export default InputCaptionText;
