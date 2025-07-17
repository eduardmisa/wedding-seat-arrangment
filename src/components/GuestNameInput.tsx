import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
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
      <h1>Find your seat</h1>
      <div className="search-container">
        <Select
          options={filteredGuests.map(g => ({
            value: g,
            label: `${g} 💐 ${Object.keys(guestTables).find(key => guestTables[key as keyof typeof guestTables].includes(g))}`
          }))}
          onChange={(option) => {
            if (option) {
              setName(option.value);
              navigate(`/venue?qrName=${encodeURIComponent(option.value)}`);
            }
          }}
          onInputChange={(input) => setName(input)}
          inputValue={name}
          placeholder="Search for your name..."
          isSearchable={true}
          className="react-select-container"
          classNamePrefix="react-select"
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
