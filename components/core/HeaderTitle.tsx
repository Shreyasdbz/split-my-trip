/** @format */

interface IHeaderTitle {
  text: string;
}
const HeaderTitle = ({ text }: IHeaderTitle) => {
  return <span className="font-bold text-4xl">{text}</span>;
};

export default HeaderTitle;
