import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import './styles/globals.css';
import Navigation from './components/Navigation';
import BackgroundMusic from './components/BackgroundMusic';
import Home from './components/Home';
import Writeups from './components/Writeups';
import WriteupDetail from './components/WriteupDetail';
import GeworldFinal from './components/GeworldFinal';

function AppContent() {
  const location = useLocation();
  const isWriteups = location.pathname.startsWith('/writeups');
  const isGeworld = location.pathname.startsWith('/geworld-final');

  React.useEffect(() => {
    if (isWriteups) {
      document.body.classList.add('writeups-theme');
    } else {
      document.body.classList.remove('writeups-theme');
    }
  }, [isWriteups]);

  if (isGeworld) {
    return (
      <Routes>
        <Route path="/geworld-final" element={<GeworldFinal />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <BackgroundMusic />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writeups" element={<Writeups />} />
        <Route path="/writeups/:id" element={<WriteupDetail />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
