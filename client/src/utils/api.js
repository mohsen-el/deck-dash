import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

const authenticateJWT = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token
    
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' }); // Forbidden if invalid token
      }
      req.user = user; // Attach the decoded user information to the request
      next();
    });
  };
  

// Register a new user
export const registerUser = async ({ username, email, password }) => {
    try {
        const response = await axios.post('http://localhost:3000/register', { username, email, password });
        return response.data; 
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error(error.response?.data?.error || 'Registration failed');
    }
};


  
  // Login user and get token
  export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.post('http://localhost:3000/login', { email, password });
        return response.data.token;
    } catch (error) {
        console.error("Login failed:", error);
        throw new Error(error.response?.data?.error || "Login failed");
    }
};


  // Get cards
  export const getCards = async (token) => {
    try {
        const response = await axios.get('http://localhost:3000/cards', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; 
    } catch (error) {
        console.error(error);
        throw error.response?.data || error;
    }
};

export const addCard = async (cardData) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add card');
    }
    return response.json();
  };

// Update a card
export const updateCard = async (cardId, updatedData, token) => {
    try {
        const response = await axios.put(`http://localhost:3000/cards/${cardId}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; 
    } catch (error) {
        console.error(error);
        throw error.response?.data || error;
    }
};

// Delete a card
export const deleteCard = async (cardId, token) => {
    try {
        const response = await axios.delete(`http://localhost:3000/cards/${cardId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; 
    } catch (error) {
        console.error(error);
        throw error.response?.data || error;
    }
};

export default api;
