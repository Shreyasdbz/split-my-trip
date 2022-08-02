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
const FloatingElement = ({ children }: IFloatingElement) => {
  return (
    <div className="fixed bg-white w-8 h-auto flex flex-col justify-center items-center shadow-md px-12 py-4 rounded-xl">
      {children}
    </div>
  );
};

export default FloatingElement;
