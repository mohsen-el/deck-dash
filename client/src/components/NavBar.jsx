import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [flipped, setFlipped] = useState(false);
  const [fullTextVisible, setFullTextVisible] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Handle the flipping animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlipped(true);
    }, 1500); // After 1.5 seconds, start flipping

    const fullTextTimer = setTimeout(() => {
      setFullTextVisible(true);
    }, 3000); // After 3 seconds, show the full text

    return () => {
      clearTimeout(timer);
      clearTimeout(fullTextTimer);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="w-full p-4 flex justify-between items-center bg-gradient-to-r from-cyan-600 to-blue-700 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <motion.div
          className="relative flex justify-center items-center w-24 h-12 rounded-xl bg-white shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-lg font-semibold text-cyan-700"
            animate={{ opacity: flipped ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            Flash
          </motion.div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-lg font-semibold text-cyan-700"
            animate={{ opacity: flipped ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Deck
          </motion.div>
        </motion.div>
        {fullTextVisible && (
          <motion.div
            className="text-white font-bold text-xl sm:text-2xl ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Flash Deck
          </motion.div>
        )}
      </div>

      {/* Navigation & User Actions */}
      <div className="flex items-center gap-6">
        {token ? (
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition duration-300"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
