import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mix from './pages/Mix';
import { GlobalStyles } from './styles/GlobalStyles';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mix" element={<Mix />} />
      </Routes>
    </>
  );
}

export default App;
