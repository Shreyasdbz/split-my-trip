/** @format */

interface IPillButton {
  label?: string;
  text: string;
  type: "DANGER" | "FILL" | "OUTLINE";
  size: "MINI" | "SMALL" | "MEDIUM" | "LARGE" | "LARGE-WIDE";
  onClickAction: () => void;
  children?: React.ReactElement | React.ReactElement[];
}
const PillButton = ({
  label,
  text,
  type,
  size,
  children,
  onClickAction,
}: IPillButton) => {
  function getSizeClass(): string {
    let sizeClass = "h-8";
    switch (size) {
      case "MINI":
        sizeClass = "h-8 w-14";
        break;
      case "SMALL":
        sizeClass = "h-8 w-20";
        break;
      case "MEDIUM":
        sizeClass = "h-10 w-32";
        break;
      case "LARGE":
        sizeClass = "h-12 w-36";
        break;
      case "LARGE-WIDE":
        sizeClass = "h-12 w-56";
        break;
      default:
        break;
    }
    return sizeClass;
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

  const topLevelClasses =
    "hoverTransformScale flex items-center justify-center flex-nowrap rounded-full box-shadow-md font-semibold border-2 shadow-lg";

  if (children) {
    return (
      <button
        aria-label={label}
        className={` ${topLevelClasses} ${getSizeClass()} ${getType()}`}
        onClick={onClickAction}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        aria-label={label}
        className={` ${topLevelClasses} ${getSizeClass()} ${getType()}`}
        onClick={onClickAction}
      >
        <span className="px-6 flex-nowrap font-semibold">{text}</span>
      </button>
    );
  }
};

export default PillButton;
