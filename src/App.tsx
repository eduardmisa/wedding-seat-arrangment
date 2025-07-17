import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Venue from './components/Venue';
import GuestNameInput from './components/GuestNameInput';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestNameInput />} />
        <Route path="/venue" element={<Venue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
