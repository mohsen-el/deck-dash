import * as jwt_decode from 'jwt-decode';

export const checkAuth = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return false; // No token, not authenticated
  }
  
  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token'); // Remove expired token
      return false;
    }
    
    return true; // Token is valid
  } catch (error) {
    return false; // Invalid token, not authenticated
  }
};
