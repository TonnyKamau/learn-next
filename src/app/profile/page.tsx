"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      setIsLoggingOut(true);
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="divider"></div>
        <p className="mb-4">Profile page content goes here</p>
        <button 
          className={`btn btn-primary ${loading ? 'loading' : ''}`} 
          onClick={handleLogout} 
          disabled={loading}
        >
          {loading ? 'Logging out' : 'Logout'}
        </button>
      </div>
      
      {isLoggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4 text-lg font-semibold">Logging out...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
