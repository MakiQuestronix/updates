// components/HamburgerButton.tsx

type Props = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
};

function HamburgerButton({ isOpen, onClick, className = "" }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-1 p-2 bg-white border border-[#e0e0e0] rounded-md shadow-md ${className}`}
    >
      <span
        className={`block w-5 h-0.5 bg-fourth transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
      />
      <span
        className={`block w-5 h-0.5 bg-fourth transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
      />
      <span
        className={`block w-5 h-0.5 bg-fourth transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
      />
    </button>
  );
}

export default HamburgerButton;
