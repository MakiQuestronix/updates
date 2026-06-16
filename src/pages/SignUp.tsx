import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import Google from "../assets/Google.svg";
import eyeClose from "../assets/eyeClose.svg";
import eyeOpen from "../assets/eyeOpen.svg";

type FormData = {
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
};

function SignUp() {
  const [inviteValid, setInviteValid] = useState<boolean | null>(null);
  const location = useLocation();

  //error messages
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();
  const [invitedEmail, setInvitedEmail] = useState("");

  const [form, setForm] = useState<FormData>({
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateToken = async (token: string | null) => {
    setGeneralError("");
    try {
      const response = {
        success: true,
        error: "",
        invitedEmail: "mail@mail.com",
      };

      if (!response.success) {
        setInviteValid(false);

        switch (response.error) {
          case "TOKEN_EXPIRED":
            setGeneralError(
              "This invitation link has expired. Please request a new invitation.",
            );
            break;

          case "TOKEN_INVALID":
            setGeneralError(
              "This invitation link is invalid. Please request a new invitation.",
            );
            break;
        }

        return;
      }

      setInvitedEmail(response.invitedEmail);
      setInviteValid(true);
    } catch {
      setInviteValid(false);
      setGeneralError("Unable to validate invitation link.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPassError("");
    setConfirmPassError("");

    // Empty fields
    let hasError = false;

    if (!form.firstName.trim()) {
      setFirstNameError("Please fill in all fields.");
      hasError = true;
    }

    if (!form.lastName.trim()) {
      setLastNameError("Please fill in all fields.");
      hasError = true;
    }

    if (!form.password.trim()) {
      setPassError("Please fill in all fields.");
      hasError = true;
    }

    if (!form.confirmPassword.trim()) {
      setConfirmPassError("Please fill in all fields.");
      hasError = true;
    }

    if (hasError) return;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~])(?!.*\s).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      setPassError(
        "Must have at least 8 characters with capital letters, number, and special characters",
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setConfirmPassError("Passwords do not match.");
      return;
    }

    try {
      // Backend Part

      //sample hardcoded, will remove
      const response = {
        success: true,
        error: "TOKEN_EXPIRED",
      };

      if (!response.success) {
        switch (response.error) {
          case "EMAIL_ALREADY_REGISTERED":
            setEmailError(
              "An account with this email already exists. Please log in instead.",
            );
            break;

          case "PASSWORD_POLICY_FAILED":
            setPassError(
              "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
            );
            break;

          default:
            setEmailError("Registration failed. Please try again.");
        }

        return;
      }

      // Success

      console.log("Login successful");
      navigate("/verifyEmail");
    } catch (err) {
      setEmailError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");

    // Redirect to Google OAuth
  };

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    validateToken(token);
  }, [location.search]);

  //no invite link
  if (inviteValid === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-10 font-bold">Invalid Invitation</h1>
        <p className="text-[#828282]">{generalError}</p>

        <Link
          to="/"
          className="text-blue-500 mt-10 hover:underline hover:font-bold"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  if (inviteValid === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Validating invitation...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side */}
        <div className="hidden md:block md:w-2/5 h-full bg-linear-[330deg,black,#454545] p-6 items-center">
          <h3 className="font-bold text-4xl text-white mt-30">Ingest IQ</h3>
          <h1 className="font-bold text-8xl text-white mt-10">
            Let's get
            <br />
            Started!
          </h1>
          <p className="text-white text-20 mt-40">
            Get started with our powerful data ingestion platform.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-3/5 flex flex-col items-center gap-4 overflow-y-auto items-center justify-center ">
          <div className="flex flex-col items-center gap-1 w-1/2 max-w-md">
            <h1 className="font-bold text-2xl text-black mt-2">
              Create Account
            </h1>
            <p className="text-14 text-center">
              Enter your details to create your account.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-[#828282] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />

                  {firstNameError && (
                    <p className="text-red-500 text-xs mt-1">
                      {firstNameError}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-[#828282] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />

                  {lastNameError && (
                    <p className="text-red-500 text-xs mt-1">{lastNameError}</p>
                  )}
                </div>
              </div>

              <input
                type="email"
                name="email"
                value={invitedEmail}
                readOnly
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-[#828282] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
              {emailError && (
                <p className="text-red-500 text-xs">{emailError}</p>
              )}

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-[#828282] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <img
                    src={showPassword ? eyeClose : eyeOpen}
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {passError && <p className="text-red-500 text-xs">{passError}</p>}

              <div className="relative w-full">
                {" "}
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 pr-12 border border-[#828282] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <img
                    src={showConfirmPassword ? eyeClose : eyeOpen}
                    alt={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {confirmPassError && (
                <p className="text-red-500 text-xs">{confirmPassError}</p>
              )}
              <div className="flex justify-center my-5">
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-[#1E1E1E] w-full"
                >
                  Create Account
                </button>
              </div>
            </form>
            {generalError && (
              <p className="text-red-500 text-xs">{generalError}</p>
            )}
          </div>

          <div className="flex items-center gap-4 w-full max-w-md">
            <hr className="flex-1 border-[#828282]" />
            <p className="text-[#828282] whitespace-nowrap">or continue with</p>
            <hr className="flex-1 border-[#828282]" />
          </div>

          <div className="flex justify-center w-full max-w-md">
            <button
              type="button"
              className="flex items-center justify-center bg-[#EEEEEE] text-black py-2 px-4 rounded-md hover:bg-[#D3D3D3] mt-5 w-full"
              onClick={handleGoogleLogin}
            >
              <img src={Google} alt="Google Logo" className="w-5 h-5 mr-5" />
              <p>Login with Google</p>
            </button>
          </div>

          <div className="flex justify-center w-2/5 max-w-md mt-4 text-center">
            <p className="text-[#828282] text-12">
              By continuing, you agree to our{" "}
              <span className="text-black hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-black hover:underline">Privacy Policy</span>
            </p>
          </div>

          <div>
            <p>
              Already have an account?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Go to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
