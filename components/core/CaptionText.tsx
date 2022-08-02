/** @format */

interface ICaptionText {
  text: string;
}
const CaptionText = ({ text }: ICaptionText) => {
  return <span className="font-light">{text}</span>;
};

export default CaptionText;
