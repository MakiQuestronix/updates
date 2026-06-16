import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

import LogoIcon from "../assets/Logo.svg?react";
import Google from "../assets/Google.svg";
import eyeOpen from "../assets/eyeOpen.svg";
import eyeClose from "../assets/eyeClose.svg";

type FormData = {
  email: string;
  password: string;
};

function LogIn() {
  const [error, setError] = useState("");
  const [passError, setPassError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = useAuthStore((state) => state.token);

  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "email") setError("");
    if (name === "password") setPassError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setPassError("");

    // Empty fields
    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!form.password.trim()) {
      setPassError("Password is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Backend Part

      if (rememberMe) {
        // Set cookie for persistent login
        //set token to true for login
      }

      //sample
      const response = {
        success: true,
        error: "INVALID_EMAIL",
      };

      if (!response.success) {
        if (
          response.error === "INVALID_EMAIL" ||
          response.error === "INCORRECT_PASSWORD"
        ) {
          setError("Invalid email or password");
          return;
        } else {
          setError("Login failed.");
          return;
        }
      }

      console.log("Sumakses sa login");
      navigate("/Layout/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");

    //backend logic here if di man need google will remove this.

    navigate("/Layout/dashboard");

    // Redirect sa Google OAuth
  };

  useEffect(() => {
    if (token) {
      navigate("/Layout/dashboard");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="hidden md:block md:w-2/5 h-full bg-linear-[330deg,black,#454545] p-6">
          <h3 className="font-bold text-4xl text-white mt-30">Ingest IQ</h3>
          <h1 className="font-bold text-5xl md:text-8xl text-white mt-10">
            Welcome <br />
            Back!
          </h1>
          <p className="text-white text-20 mt-40">
            Get started with our powerful data ingestion platform.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-3/5 flex flex-col items-center gap-4 overflow-y-auto items-center justify-center">
          <div className="flex flex-col items-center">
            <LogoIcon className="w-20 h-20" />
            <h1 className="font-bold text-3xl text-black">Ingest IQ</h1>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h1 className="font-bold text-2xl text-black mt-2">Login</h1>
            <p className="text-16">
              Welcome back! Please log in to your account.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-[#828282] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="relative w-full">
                {" "}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 pr-12 border border-[#828282] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <img
                    src={showPassword ? eyeClose : eyeOpen}
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {passError && <p className="text-red-500 text-sm">{passError}</p>}

              <div className="flex items-center justify-between w-full max-w-md mt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="text-black">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="ml-4 text-[#828282] hover:underline hover:text-black"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-[#1E1E1E] mt-2 w-full"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4 w-full max-w-md">
            <hr className="flex-1 border-[#828282]" />
            <p className="text-[#828282] whitespace-nowrap">or continue with</p>
            <hr className="flex-1 border-[#828282]" />
          </div>

          <div className="flex justify-center w-full max-w-md">
            <button
              type="button"
              disabled={loading}
              className="flex items-center justify-center bg-[#EEEEEE] text-black py-2 px-4 rounded-md hover:bg-[#D3D3D3] mt-2 w-full"
              onClick={handleGoogleLogin}
            >
              <img src={Google} alt="Google Logo" className="w-5 h-5 mr-5" />
              <p>{loading ? "Logging in..." : "Login with Google"}</p>
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
              No account yet?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Go to Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
