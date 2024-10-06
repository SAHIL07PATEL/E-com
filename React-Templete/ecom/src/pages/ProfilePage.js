import React, { useEffect, useState } from 'react';
import { Edit2, LogOut, Mail, Lock, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  let timeoutId;
  const inactivityLimit = 60000; // 60 seconds (you can adjust this)

  // Function to handle user logout
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  // Reset timeout function on user activity
  const resetTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout
    timeoutId = setTimeout(handleLogout, inactivityLimit); // Set new timeout
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('https://e-come-hyh8.onrender.com/person/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch user data.');
          setLoading(false);
        });

      // Add event listeners for user activity
      const events = ['mousemove', 'keydown', 'click'];
      events.forEach((event) => window.addEventListener(event, resetTimeout));

      // Set the initial inactivity timeout
      resetTimeout();

      return () => {
        // Cleanup on component unmount
        events.forEach((event) => window.removeEventListener(event, resetTimeout));
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <h1>Welcome, {user?.name}</h1>
      {/* Other profile page content */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
