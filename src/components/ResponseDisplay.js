import React from 'react';

const ResponseDisplay = ({ response }) => {
  if (!response) {
    return null;
  } 

  return (
    <div>
      <h2>Response:</h2>
      <p>"windowPrevState": {JSON.stringify(response.windowPrevState)}</p>
      <p>"windowCurrState": {JSON.stringify(response.windowCurrState)}</p>
      <p>"numbers": {JSON.stringify(response.numbers)}</p>
      <p>"avg": {response.avg}</p>
    </div>
  );
};

export default ResponseDisplay;
