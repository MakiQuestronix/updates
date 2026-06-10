import { useRef, useState } from "react";

function OtpInput() {
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const next = [...otp];

    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });

    setOtp(next);

    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const [otp, setOtp] = useState(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-4  items-center justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          onPaste={handlePaste}
          className="
            h-16 w-16
            rounded-lg
            border
            border-gray-300
            text-center
            text-2xl
            transition-all
            duration-200
            focus:scale-105
            focus:border-black
            focus:ring-2
            focus:ring-black/20
            outline-none
          "
        />
      ))}
    </div>
  );
}

export default OtpInput;
