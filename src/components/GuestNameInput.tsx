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
        <div className="guest-suggestions">
          {allGuests.map((guest) => {
            const isMatch = name.trim() === '' || 
              guest.toLowerCase().includes(name.toLowerCase());
            return (
              <button
                key={guest}
                className={`guest-button ${isMatch ? '' : 'disabled'} ${
                  name.trim() !== '' && isMatch ? 'active-match' : ''
                }`}
                onClick={() => navigate(`/venue?qrName=${encodeURIComponent(guest)}`)}
                disabled={!isMatch}
              >
                {guest}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GuestNameInput;
