"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(
      !(
        user.username.length > 0 &&
        user.email.length > 0 &&
        user.password.length > 0
      )
    );
  }, [user]);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Signup failed", error.response?.data?.message || error.message);
      } else {
        console.log("Signup failed", "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold justify-center mb-6">
            Sign Up
          </h1>
          <form onSubmit={onSignup} className="space-y-2">
            {["username", "email", "password"].map((field) => (
              <div key={field} className="form-control">
                <label htmlFor={field} className="label">
                  <span className="label-text capitalize">{field}</span>
                </label>
                <input
                  id={field}
                  className="input input-bordered w-full"
                  type={
                    field === "password"
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  value={user[field as keyof typeof user]}
                  onChange={(e) =>
                    setUser({ ...user, [field]: e.target.value })
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              </div>
            ))}
            <button
              disabled={buttonDisabled}
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
              ) : buttonDisabled ? (
                "No Sign Up"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="divider">OR</div>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
