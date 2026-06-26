type StatCardProps = {
  name?: string;
  amount: string;
  highlight?: boolean;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  textHoverColor?: string;
  textAlign?: string;
  amountSize?: string;
  amountColor?: string;
};

const StatCard = ({
  name,
  amount,
  textAlign,
  highlight = false,
  bgColor = "bg-white",
  textColor = "text-textColor",
  hoverBgColor,
  textHoverColor = "text-white",
  amountSize = "xl",
  amountColor,
}: StatCardProps) => {
  const amountClassName = `font-inter font-bold text-${amountSize} ${textAlign ?? ""} ${amountColor} ${
    highlight ? "text-seventh group-hover:text-white" : ""
  }`;

  return (
    <div
      className={`group flex flex-col flex-1 rounded-lg p-4 justify-center shadow-md border border-[#E0E0E0] transition-all cursor-pointer ${textAlign ?? "text-left"} ${bgColor} ${textColor} ${hoverBgColor} ${textHoverColor}`}
    >
      <p className="text-xs mb-2 opacity-80 font-semibold">{name}</p>
      <h1 className={`${amountClassName} truncate `}>{amount}</h1>
    </div>
  );
};

export default StatCard;
