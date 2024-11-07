// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); 

    // Check for a saved token in localStorage on app load
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) setAuth(token);
    }, []);

    // Login function to save token
    const login = (token) => {
        localStorage.setItem('authToken', token); // Save token
        setAuth(token); // Update state
    };

    // Logout function to clear token
    const logout = () => {
        localStorage.removeItem('authToken'); // Clear storage
        setAuth(null); // Clear state
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
