/** @format */

interface ISectionTitle {
  text: string;
  buttonText?: string;
  onClickAction?: () => void;
}
const SectionTitle = ({ text, buttonText, onClickAction }: ISectionTitle) => {
  return (
    <div
      className={`w-full h-auto flex items-center my-6 border-2 ${
        buttonText ? "justify-between" : "justify-start"
      }`}
    >
      <span>{text}</span>
      {buttonText && <button>{buttonText}</button>}
    </div>
  );
};

export default SectionTitle;
