"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const VerifyEmailPage: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setError(false);
      setVerified(true);
    } catch (error) {
      setError(true);
      console.error("Error verifying email:", error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token found"}
      </h2>
      {verified && (
        <div>
          <h2 className="p-2 bg-green-500 text-black">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="p-2 bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
