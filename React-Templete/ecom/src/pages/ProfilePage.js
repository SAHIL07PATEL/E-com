import React, { useEffect, useState } from 'react';
import { Edit2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
  </div>
);

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios
        .get('https://e-come-hyh8.onrender.com/person/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch user data.');
          setLoading(false);
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 text-center bg-indigo-600 text-white">
            <div className="h-20 w-20 mx-auto bg-blue-500 text-4xl text-white flex justify-center items-center rounded-full">
              {user?.name?.slice(0, 1).toUpperCase()}
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-200">{user?.email}</p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700">Account Information</h3>
              <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-600">Password</span>
                  <button className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm">
                    <Edit2 className="h-4 w-4 mr-1" /> Change Password
                  </button>
                </div>
              </div>
              <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email Preferences</span>
                  <button className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm">
                    <Edit2 className="h-4 w-4 mr-1" /> Edit Preferences
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
              </button>
            </div>
          </div>
          <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
            <span className="text-gray-600 text-sm">Member since {user?.createdAt ? user.createdAt.slice(0, 4) : 'N/A'}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-200"
            >
              <LogOut className="h-4 w-4 mr-1" /> Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
