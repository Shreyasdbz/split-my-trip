/** @format */

interface IFloatingElement {
  children: React.ReactElement | React.ReactElement[];
  position:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
}
const FloatingElement = ({ children, position }: IFloatingElement) => {
  let positionClass = "";
  switch (position) {
    case "bottom":
      positionClass = "";
      break;
    case "top":
      positionClass = "";
      break;
    case "left":
      positionClass = "";
      break;
    case "right":
      positionClass = "";
      break;
    case "topLeft":
      positionClass = "";
      break;
    case "topRight":
      positionClass = "";
      break;
    case "bottomLeft":
      positionClass = "";
      break;
    case "bottomRight":
      positionClass = "bottom-4 right-4";
      break;
    default:
      break;
  }
  return (
    <div
      className={`fixed bg-white w-auto h-auto flex flex-col justify-center items-center shadow-md px-2 py-2 rounded-xl ${positionClass}`}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
