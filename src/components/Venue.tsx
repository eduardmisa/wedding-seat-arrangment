import Table from './Table';
import './Venue.css';
import { useLocation } from 'react-router-dom';

const Venue = () => {
  const tablesTop = {
    'Table-1': ['Sennen', 'Cherry', 'CJ', 'Jojie', 'Chona'],
    'Table-2': ['Ally', 'Bert', 'Yasser', 'Anna', 'Chuck', 'Steph']
  };
  const tablesBottom = {
    'Table-3': ['Vai', 'Jamie', 'Kernce', 'Guizelle', 'Raffy'],
    'Table-4': ['Xinrong', 'Derrick', 'Sivam', 'Archie']
  };

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const qrName = query.get('qrName') || "";

  return (
    <div className="venue-container">
      <div className="venue">
        {/* Bride & Groom Square */}
        <div className="bride-groom">
          <div className="square">
            <span className="couple-label">Bride & Groom</span>
          </div>
        </div>

        <br />

        {/* Tables */}
        <div className="tables-column-container">
          <div className="tables-row-container">
            {Object.entries(tablesTop).map(([position, guests]) => (
              <Table key={position} position={position} guests={guests} qrName={qrName} />
            ))}
          </div>
          <div className="tables-row-container">
            {Object.entries(tablesBottom).map(([position, guests]) => (
              <Table key={position} position={position} guests={guests} qrName={qrName} />
            ))}
          </div>
        </div>

        {/* Entrance */}
        <div className="catering">Catering</div>

        <span className="seating-note" >Seat ordering within the table can be re-arranged.</span>
      </div>
    </div>
  );
};

export default Venue;
