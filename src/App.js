import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mix from './pages/Mix';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mix" element={<Mix />} />
    </Routes>
  );
}

export default App;
