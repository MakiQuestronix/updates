import React, { useRef, useState } from "react";

type OtpInputProps = {
  onChange?: (otp: string) => void;
  hasError?: boolean;
};
function OtpInput({ onChange, hasError = false }: OtpInputProps) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const updateOtp = (next: string[]) => {
    setOtp(next);
    onChange?.(next.join(""));
  };

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
    updateOtp(next);

    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    updateOtp(next);

    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = [...otp];
        next[index] = "";
        updateOtp(next);
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div
      className={`flex gap-4 items-center justify-center ${
        hasError ? "animate-shake" : ""
      }`}
    >
      {otp.map((digit, index) => (
        <input
          type="text"
          inputMode="numeric"
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          onPaste={handlePaste}
          className={`
            h-16 w-16
            rounded-lg
            border
            text-center
            text-2xl
            transition-all
            duration-200
            outline-none
            ${
              hasError
                ? "border-red-500"
                : "border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20"
            }
          `}
        />
      ))}
    </div>
  );
}

export default OtpInput;
