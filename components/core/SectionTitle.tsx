/** @format */

import PillButton from "./PillButton";

interface ISectionTitle {
  text: string;
  buttonText: string;
  onClickAction: () => void;
}
const SectionTitle = ({ text, buttonText, onClickAction }: ISectionTitle) => {
  return (
    <div className={`w-full h-auto flex items-center my-2 justify-between`}>
      <span className="text-2xl font-light">{text}</span>
      {/* <button
        className="hoverTransformScale bg-gray-400 outline-gray-600 rounded-xl w-16 h-8 font-light text-white"
        onClick={onClickAction}
      >
        {buttonText}
      </button> */}
      <PillButton
        text={buttonText}
        type={"OUTLINE"}
        size={"SMALL"}
        onClickAction={onClickAction}
      >
        <span>ADD +</span>
      </PillButton>
    </div>
  );
};

export default SectionTitle;
