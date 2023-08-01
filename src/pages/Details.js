import React, { useState } from 'react';

const Details = ({ User_id, datalist }) => {
  const [dataDetails, setData] = useState(null);

  const handleInputSubmit = (itemId) => {
    const requestData = {
      Session_id: itemId,
      User_id: User_id,
    };

    const apiUrl = 'http://167.172.75.201:8877/detail';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((dataDetails) => {
        // Handle the response data if needed
        setData(dataDetails);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      {/* Display buttons */}
      {datalist && datalist.Meg === 'success' && datalist.Data && datalist.Data.length > 0 && datalist.Data.map((item) => (
        <div key={item.Session_id}>
          <button className="new-chat-button" onClick={() => handleInputSubmit(item.Session_id)}>
            {item.Title}
          </button>
        </div>
      ))}
      {datalist && datalist.Meg === 'success' && datalist.Data && datalist.Data.length === 0 && (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Details;
