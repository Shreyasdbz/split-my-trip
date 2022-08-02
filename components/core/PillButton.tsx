/** @format */

interface IPillButton {
  text: string;
  type: "DANGER" | "FILL" | "OUTLINE";
  size: "SMALL" | "MEDIUM" | "LARGE";
  onClickAction: () => void;
}
const PillButton = ({ text, type, size, onClickAction }: IPillButton) => {
  function getHeight(): string {
    let height = "h-8";
    switch (size) {
      case "SMALL":
        height = "h-8 w-20";
        break;
      case "MEDIUM":
        height = "h-10 w-32";
        break;
      case "LARGE":
        height = "h-12 w-32";
        break;
      default:
        break;
    }
    return height;
  }

  function getType(): string {
    switch (type) {
      case "DANGER":
        return "border-red-600 bg-red-600 text-white shadow-red-200";
      case "OUTLINE":
        return "border-black bg-white text-black shadow-gray-200";
      case "FILL":
        return "border-black bg-black text-white shadow-gray-200";
      default:
        return "";
    }
  }

  return (
    <button
      className={`flex items-center justify-center flex-nowrap rounded-full box-shadow-md font-semibold border-2 shadow-lg
      ${getHeight()} ${getType()}`}
      onClick={onClickAction}
    >
      <span className="px-6 flex-nowrap font-semibold">{text}</span>
    </button>
  );
};

export default PillButton;
