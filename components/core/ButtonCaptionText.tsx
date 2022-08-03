/** @format */

interface IButtonCaptionText {
  text: string;
}
const ButtonCaptionText = ({ text }: IButtonCaptionText) => {
  return <span className="font-light text-sm md:text-md">{text}</span>;
};

export default ButtonCaptionText;
