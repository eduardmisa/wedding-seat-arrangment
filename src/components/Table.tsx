import React from 'react';
import './Table.css';

interface TableProps {
  position: string;
  guests: string[];
  qrName?: string;
}

const Table: React.FC<TableProps> = ({ position, guests, qrName }) => {
  const shouldGrayOut = qrName && !guests.includes(qrName);
  const tableClass = shouldGrayOut ? `table ${position} grayed-out` : `table ${position}`;

  return (
    <div className={tableClass}>
      <div className="table-circle">
        {guests.map((guest, index) => (
          <div key={index} className={
            qrName && guest === qrName ? 'guest highlighted' :
            qrName && guests.includes(qrName) ? 'guest grayed-out' :
            shouldGrayOut ? 'guest grayed-out' : 'guest'
          }>
            {guest}
          </div>
        ))}
      </div>
      <div className={`table-label ${shouldGrayOut ? 'grayed-out' : ''}`}>
        {position.replace('-', ' ')}
      </div>
    </div>
  );
};

export default Table;
