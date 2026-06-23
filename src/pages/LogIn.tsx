import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

import LogoIcon from "../assets/Logo.svg?react";
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

  useEffect(() => {
    if (token) {
      navigate("/Layout/dashboard");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="page-bg flex flex-col md:flex-row h-screen">
        <div className="flex justify-center items-center md:block h-full px-40">
          <h3 className="font-semibold text-2xl text-white mt-40 text-shadow">
            Ingest IQ
          </h3>
          <h1 className="font-extrabold text-5xl md:text-8xl text-white mt-8 text-shadow">
            Welcome <br />
            Back!
          </h1>
          <p className="text-white text-xl font-semibold mt-10  text-shadow">
            Get started with our powerful data ingestion platform.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 items-center justify-center ">
          <div className="flex flex-col bg-white rounded-3xl p-10 h-full my-10 w-fit items-center justify-center shadow-2xl">
            {/* <LogoIcon className="w-20 h-20" /> */}
            <h1 className="font-black text-3xl text-fourth">Ingest IQ</h1>

            <p className="text-sm mb-10 mt-2">
              Manage, Process, and Approve Documents Efficiently
            </p>

            <div className="w-full max-w-md items-center">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <p className="text-sm font-light ml-2">Enter email</p>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-[#828282] rounded-full focus:outline-none focus:ring-1 focus:ring-fourth text-sm"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-[#828282] rounded-full focus:outline-none focus:ring-1 focus:ring-fourth"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <img
                      src={showPassword ? eyeClose : eyeOpen}
                      alt={showPassword ? "Hide password" : "Show password"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>

                {passError && (
                  <p className="text-red-500 text-sm">{passError}</p>
                )}

                <div className="flex items-center justify-between w-full max-w-md mt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember" className="text-fourth">
                      Remember me
                    </label>
                  </div>

                  <Link
                    to="/forgot-password"
                    className="ml-4 text-[#828282] hover:underline hover:text-fourth"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-fourth text-white py-2 px-4 rounded-full hover:bg-[#1E1E1E] mt-2 w-full"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
              <p className="text-[#828282] text-sm w-2/3 text-center justify-self-center py-4 ">
                By continuing, you agree to our{" "}
                <span className="text-fourth hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-fourth hover:underline">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
