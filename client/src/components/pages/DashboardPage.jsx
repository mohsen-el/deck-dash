import React, { useEffect, useState } from 'react';
import { getCards } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import InputBar from '../../components/InputBar'
import ViewCard from '../ViewCard';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
 
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate('/login');  // Redirect to login if no token found
    } else {
      const fetchCards = async () => {
        try {
          const data = await getCards(token);
        } catch (error) {
          console.error('Error fetching cards:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCards();
    }
  }, [token, navigate]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

    return (
        <div>
        <InputBar />
        <div className="flex flex-row mt-2 p-4 justify-start flex-wrap gap-8">
            <ViewCard token={token} />
        </div>
        </div>
    );
  
};

export default DashboardPage;
