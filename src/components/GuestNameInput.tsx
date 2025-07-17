import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuestNameInput.css';
import { tablesBottom, tablesTop } from './Venue';

const GuestNameInput: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // All guest names organized by table
  const guestTables = { ...tablesTop, ...tablesBottom };

  // Flatten all guest names for searching
  const allGuests = Object.values(guestTables).flat();

  // Filter guests based on input
  const filteredGuests = name.trim() 
    ? allGuests.filter(guest => 
        guest.toLowerCase().includes(name.toLowerCase()))
    : allGuests;

  return (
    <div className="name-input-container">
      <h1>Seat Finder</h1>
      <div className="search-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search for your name..."
          className="search-input"
        />
      </div>
      <div className="guest-list">
        {filteredGuests.length > 0 ? (
          <div className="guest-suggestions">
            {filteredGuests.map((guest) => (
              <button
                key={guest}
                className="guest-button"
                onClick={() => navigate(`/venue?qrName=${encodeURIComponent(guest)}`)}
              >
                {guest}
              </button>
            ))}
          </div>
        ) : (
          <p className="no-results">No matching guests found</p>
        )}
      </div>
    </div>
  );
};

export default GuestNameInput;
