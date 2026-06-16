import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import OtpInput from "../components/OtpInput";

function VerifyCode() {
  const location = useLocation();

  const email = location.state?.email;

  const [code, setCode] = useState<string>("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);

  const navigate = useNavigate();

  if (!email) {
    //will reove this if may token validation na sa backend.
    alert("No email found. Please request a verification code first.");
    return <Navigate to="/" replace />;
  }

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");

    const stars = "*".repeat(name.length);

    return `${stars}@${domain}`;
  };

  const handleOtpSubmit = async () => {
    setError("");

    if (!code.trim()) {
      setError("Verification code cannot be empty.");
      return;
    }

    try {
      //change this pag ok na backend
      const result = {
        success: true,
        error: "",
      };

      if (!result.success) {
        switch (result.error) {
          case "INVALID_CODE":
            setError("The verification code is incorrect.");
            break;

          case "EXPIRED_CODE":
            setError("This verification code has expired.");
            break;

          default:
            setError("Something went wrong.");
        }

        return;
      }

      // success logic here for backend

      navigate("/login");
    } catch (err) {
      setError("Unable to verify code.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendCode = () => {
    if (countdown > 0) return;

    try {
      // resend backend dito

      setCountdown(30);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="text-5xl font-bold">Enter Code</h1>

        <p className="mt-4 text-gray-600">
          Enter the verification code we sent to {maskEmail(email!)}
        </p>

        <div className="mt-10 w-screem">
          <OtpInput
            onChange={(value) => {
              setCode(value);

              if (error) {
                setError("");
              }
            }}
            hasError={!!error}
          />
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </div>

        <button
          onClick={handleOtpSubmit}
          className="mt-10 w-1/3 max-w-xl rounded-lg bg-black py-3 text-white transition hover:opacity-90"
        >
          Submit
        </button>
        <div>
          <button
            onClick={handleResendCode}
            disabled={countdown > 0}
            className={`mt-8 transition ${
              countdown > 0
                ? "cursor-not-allowed text-gray-400"
                : "text-red-500 hover:underline hover:font-bold"
            }`}
          >
            {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
          </button>
        </div>
      </div>
    </>
  );
}

export default VerifyCode;
