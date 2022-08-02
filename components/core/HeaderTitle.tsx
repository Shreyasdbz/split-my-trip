/** @format */

interface IHeaderTitle {
  text: string;
}
const HeaderTitle = ({ text }: IHeaderTitle) => {
  return <span className="text-4xl headerFont font-semibold">{text}</span>;
};

export default HeaderTitle;
