// PersonList.js
import React, { useState } from 'react';
import axios from 'axios';

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/testing/'); // URL of your Django API
      console.log(response);
      setPeople(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchPeople} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch People'}
      </button>
      <ul>
        {people.map(person => (
          <li key={person.id}>
            {person.first_name} {person.last_name}, Age: {person.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
