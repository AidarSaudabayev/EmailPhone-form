import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import InputMask from 'react-input-mask';

import './App.css';

const BASE_URL = 'http://localhost:3001';

const App = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [searchResults, setSearchResults] = useState([]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/search`, data);
      console.log('Response:', response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input {...register('email', { required: true })} />

        <label>Number:</label>
        <InputMask
          mask="99-99-99"
          maskChar={null}
          value={watch('number')}
          onChange={(e) => setValue('number', e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            <p>Email: {result.email}</p>
            <p>Number: {result.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;