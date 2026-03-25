// Logout.jsx
import React from 'react';
import { useAuth } from '../context/Authprovider'; // Make sure filename matches exactly
import toast from 'react-hot-toast';

function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    try {
      // Clear user info in context
      setAuthUser({
        ...authUser,
        user: null,
      });

      // Remove user info + token from localStorage
      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      // Refresh page to update UI
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  return (
    <div>
      <button 
        className='px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 duration-200'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;