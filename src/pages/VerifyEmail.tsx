import { useState } from "react";

import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Please fill in the email field.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      // Backend Part
      // Sample response
      const response = {
        success: true,
        error: "",
      };

      if (!response.success) {
        switch (response.error) {
          case "INVALID_EMAIL":
            setEmailError("The email address is not valid.");
            break;
          case "EMAIL_ALREADY_VERIFIED":
            setEmailError("This email has already been verified.");
            break;
          default:
            setEmailError("Something went wrong. Please try again.");
        }

        return;
      }
      const testEmail = "mail@mail.com";
      navigate("/VerifyCode", {
        state: { email: testEmail },
      });
    } catch (err) {}
  };

  return (
    <div className="flex flex-col justify-center p-6 bg-white min-h-screen w-1/3 mx-auto">
      <div className="shadow-lg rounded-lg p-6 ">
        <div className="text-center mb-6">
          <h1 className="text-inter text-3xl font-bold">Verify Account</h1>
          <p>Enter your email address below to complete verification.</p>
        </div>
        <div className="w-full">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border border-[#828282] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black w-full mt-2"
            value={email}
            onChange={handleChange}
          />
        </div>
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-[#1E1E1E] mt-10 w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
