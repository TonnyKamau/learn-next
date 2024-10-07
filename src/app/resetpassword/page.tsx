"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (
      password !== confirmPassword ||
      password.length < 8 ||
      confirmPassword.length < 8
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [password, confirmPassword]);
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
    } else {
      setLoading(true);

      try {
        const response = await axios.post("/api/users/resetpassword", {
          token,
          newPassword: password,
        });
        if (response.data.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            router.push("/login"); // Redirect to login page after successful reset
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to reset password. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Reset Your Password</h2>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">New Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="confirm-password">
                <span className="label-text">Confirm New Password</span>
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="input input-bordered"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="form-control mt-6">
              <button
                disabled={disabled}
                type="submit"
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing
                  </span>
                ) : disabled ? (
                  "No Reset"
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
