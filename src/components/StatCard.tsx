type StatCardProps = {
  name: string;
  amount: number;
  highlight?: boolean;
};

const StatCard = ({ name, amount, highlight = false }: StatCardProps) => {
  const amountClassName = `font-inter font-bold text-2xl sm:text-3xl ${
    highlight ? "text-green-500 group-hover:text-white" : ""
  }`;

  return (
    <div className="group rounded-lg p-4 sm:p-6 shadow-xs border border-[#E0E0E0] text-left text-black hover:bg-black hover:text-white transition-all cursor-pointer">
      <p className="text-xs sm:text-sm mb-2 opacity-80">{name}</p>
      <h3 className={amountClassName}>{amount}</h3>
    </div>
  );
};

export default StatCard;
