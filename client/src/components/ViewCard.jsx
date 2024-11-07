import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getCards, updateCard, deleteCard } from '../utils/api';

export default function ViewCard({ token }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards(token);
        setCards(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    if (token) {
      fetchCards();
    }
  }, [token]);

  const handleEditCard = async (cardId, updatedData) => {
    try {
      const updatedCard = await updateCard(cardId, updatedData, token);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.card_id === cardId ? { ...card, ...updatedCard } : card
        )
      );
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId, token);
      setCards((prevCards) => prevCards.filter((card) => card.card_id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="flex flex-row p-4 justify-start flex-wrap gap-8">
      {cards.map((card) => (
        <Card
          key={card.card_id}
          card_id={card.card_id}
          question={card.question}
          answer={card.answer}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
        />
      ))}
    </div>
  );
}
