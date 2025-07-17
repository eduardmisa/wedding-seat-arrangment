import React from 'react';
import './Table.css';
import QRCode from 'react-qr-code';

interface TableProps {
  position: string;
  guests: string[];
  qrName?: string;
  showQr?: boolean;
}

const Table: React.FC<TableProps> = ({ position, guests, qrName, showQr }) => {
  const shouldGrayOut = qrName && !guests.includes(qrName);
  const tableClass = shouldGrayOut ? `table ${position} grayed-out` : `table ${position}`;

  const downloadQRCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, guest: string) => {
    e.stopPropagation();
    const svg = e.currentTarget.parentElement?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height + 30; // Extra space for text
        ctx?.drawImage(img, 0, 0);

        // Add guest name text
        if (ctx) {
          ctx.fillStyle = '#000';
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(guest, canvas.width / 2, canvas.height - 10);
        }

        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${guest}-qr-code.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  }

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
            {showQr && (
              <div className="qr-popup">
                <QRCode
                  value={`https://rom-seating.emisa.me/?qrName=${encodeURIComponent(guest)}`}
                  size={80}
                  level="H"
                />
                <button className="qr-download" onClick={(e) => downloadQRCode(e, guest)}>Download QR</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="table-label">{position.replace('-', ' ')}</div>
    </div>
  );
};

export default Table;
