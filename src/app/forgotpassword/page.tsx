"use client";
import axios from "axios";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

const ForgotPasswordPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email.length > 0));
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post("/api/users/forgotpassword", { email });
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>
      {success ? (
        <p className="text-success">
          Password reset email sent. Please check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-error mb-2">{error}</p>}
          <button
            disabled={disabled}
            type="submit"
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
              "No Email"
            ) : (
              "Send Reset Password Email"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
