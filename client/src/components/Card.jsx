import React, { useState } from 'react';
import './cardStyle.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function Card({ card_id, question, answer, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ question, answer });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    onEdit(card_id, editValues);
    setIsEditing(false);
  };

  return (
    <div className="container h-[250px] w-[450px]">
      <div className="card">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="question"
              value={editValues.question}
              onChange={handleEditChange}
              className="p-2 border rounded w-full mb-2"
            />
            <input
              type="text"
              name="answer"
              value={editValues.answer}
              onChange={handleEditChange}
              className="p-2 border rounded w-full"
            />
            <button onClick={handleEditSubmit} className="bg-green-500 text-white p-1 rounded mt-2">Save</button>
          </div>
        ) : (
          <>
            <h1>{question}</h1>
            <span className="info">i</span>
            <div className="answer">
              <p>{answer}</p>
            </div>
          </>
        )}
        <div className="card-actions flex gap-4 mt-auto">
          <FaEdit
            onClick={handleEditToggle}
            className="icon edit-icon"
          />
          <FaTrashAlt
            onClick={() => onDelete(card_id)}
            className="icon delete-icon"
          />
        </div>
      </div>
    </div>
  );
}
