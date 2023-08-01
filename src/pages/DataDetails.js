import React from 'react';

const DataDetails = ({ dataDetails }) => {
  return (
    <div>
      {/* Display data if available */}
      {dataDetails && dataDetails.Meg === 'success' && dataDetails.Data && dataDetails.Data.length > 0 ? (
        dataDetails.Data[0].List ? (
          dataDetails.Data[0].List.map((item) => (
            <div key={item.Session_id}>
              <li>user: {item.Question}</li>
              <li>assistant: {item.Answer}</li>
            </div>
          ))
        ) : (
          // If dataDetails.Data[0].List is null or undefined, show the "No data available" message
          <p>No data available</p>
        )
      ) : (
        // Show a loading message when data is still being fetched
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DataDetails;
