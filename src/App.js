import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';

const WINDOW_SIZE = 10;

const App = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numbersQueue, setNumbersQueue] = useState([]);
 
  // Retrieve test API token from environment variables
  const testApiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTU1OTgxLCJpYXQiOjE3MTIxNTU2ODEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImIzOWZhMDdlLWY2OWUtNDY4ZC04YTRlLWU4NDBlMDk0MmMyNCIsInN1YiI6InByODQ2NUBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiYXZlcmFnZUNhbGN1bGF0b3IiLCJjbGllbnRJRCI6ImIzOWZhMDdlLWY2OWUtNDY4ZC04YTRlLWU4NDBlMDk0MmMyNCIsImNsaWVudFNlY3JldCI6InBxTXZCb25kQVh4eklkQVciLCJvd25lck5hbWUiOiJUYWtzaCIsIm93bmVyRW1haWwiOiJwcjg0NjVAc3JtaXN0LmVkdS5pbiIsInJvbGxObyI6IlJBMjExMTA0MjAxMDA0OSJ9.H8OzzfKC2hCPTF-K2gATUYupzBvwwh4wGVEzJCYxuso"
 
  useEffect(() => {
    if (!testApiToken) {
      console.error('Missing test API token');
    }
  }, [testApiToken]);

  const fetchData = async (qualifiedId) => {
    setLoading(true);
    try {
      // Attempt to fetch data from the test API
      const res = await axios.get(`http://20.244.56.144/test/${qualifiedId}`, {
        headers: {
          Authorization: `Bearer ${testApiToken}`, // Include token in header
        },
      });

      // Handle response data
      const newNumbers = res.data.numbers;
      const windowPrevState = numbersQueue.slice(-WINDOW_SIZE);
      const windowCurrState = [...windowPrevState.slice(1), ...newNumbers];
      const avg = calculateAverage(windowCurrState);

      // Update state with response data
      setResponse({
        windowPrevState,
        windowCurrState,
        numbers: newNumbers,
        avg: avg.toFixed(2),
      });

      setNumbersQueue(windowCurrState);
    } catch (error) {
      // Log the error and set an appropriate error message
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
      // Display an error message to the user
      setResponse({
        error: 'Failed to fetch data. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAverage = (nums) => {
    if (!nums.length) return 0;
    const sum = nums.reduce((acc, num) => acc + num, 0);
    return sum / nums.length;
  };

  return (
    <div>
      <InputForm onSubmit={fetchData} loading={loading} />
      {loading && <p>Loading...</p>}
      {response && response.error && <p>{response.error}</p>}
      <ResponseDisplay response={response} />
    </div>
  );
};

export default App;
