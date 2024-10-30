// src/Alert.js
import React, { useState } from 'react';
import axios from 'axios';

const Alert = () => {
  const [country, setCountry] = useState('');
  const [disasterData, setDisasterData] = useState(null);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const fetchDisasterData = async () => {
    const url = `https://api.reliefweb.int/v1/disasters?filter[field]=country&filter[value]=${country}`;
    try {
      const response = await axios.get(url);
      setDisasterData(response.data);
    } catch (error) {
      console.error('Error fetching data from ReliefWeb API:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDisasterData();
  };

  return (
    <div>
      <h1>Disaster Alert</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Country:
          <input type="text" value={country} onChange={handleCountryChange} />
        </label>
        <button type="submit">Check Disasters</button>
      </form>
      {disasterData && (
        <div>
          <h2>Disaster Data</h2>
          <pre>{JSON.stringify(disasterData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Alert;