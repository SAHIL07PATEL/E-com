import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
      <h2 className="text-2xl mb-4">Welcome, {user ? user.username : 'Guest'}!</h2>
      <p className="mb-4">This is your welcome page.</p>
      <button
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login'; // Redirect to login page
        }}
        className="bg-red-500 text-white p-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
