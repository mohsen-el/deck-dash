import { useState } from 'react';
import { addCard } from '../utils/api';

export default function InputBar() {
  const [values, setValues] = useState({
    question: '',
    answer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await addCard(values, token); 
      setValues({ question: '', answer: '' }); // Reset form
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center p-4">
      <div className="flex flex-col gap-4 w-full">
        {/* input fields */}
        <div className='flex flex-col gap-4 items-center'>
        <input
          type="text"
          name="question"
          placeholder="Question"
          className="p-3 border rounded w-full max-w-[75%]"  
          value={values.question}
          onChange={handleChange}
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          className="p-3 border rounded w-full max-w-[75%]" 
          value={values.answer}
          onChange={handleChange}
        />
        </div>
        {/* add button */}
        <div className='flex justify-center'>
        <div className="flex justify-start">
          <button
            type="submit"
            className="p-2 bg-gradient-to-r from-cyan-600 to-blue-800 text-white rounded-md w-[100px] shadow-lg hover:bg-gradient-to-l hover:from-cyan-600 hover:to-blue-800 hover:shadow-2xl duration-300"
          >
            Add
          </button>
          </div>
        </div>
      </div>
    </form>
  );
}
