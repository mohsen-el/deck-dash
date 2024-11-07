import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser, registerUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [username, SetUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const toggleForm = () => setIsSignUpMode(!isSignUpMode);

  const handleThemeToggle = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      if (isSignUpMode) {
        if (password !== confirmPassword) throw new Error("Passwords don't match");
        await registerUser({ username, email, password });
        alert("Registration successful! Please log in.");
        setIsSignUpMode(false);
      } else {
        const token = await loginUser({ email, password });
        localStorage.setItem('token', token);
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isSignUpMode ? 'signUp' : 'signIn'}
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-center">{isSignUpMode ? 'Register' : 'Login'}</h2>
              {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Username (Only for Register) */}
                {isSignUpMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => SetUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
                  required
                />
              </div>

              {/* Confirm Password (Only for Register) */}
              {isSignUpMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? 'Loading...' : isSignUpMode ? 'Register' : 'Login'}
              </button>

              {/* Toggle between Register and Login */}
              <div className="text-center mt-2">
                <button
                  type="button"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                  onClick={toggleForm}
                >
                  {isSignUpMode ? 'Already have an account? Sign in' : 'Don’t have an account? Register'}
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>

        {/* Theme Toggle Buttons */}

      </div>
    </div>
  );
};

export default AuthForm;
