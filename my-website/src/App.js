import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import './styles/globals.css';
import Navigation from './components/Navigation';
import BackgroundMusic from './components/BackgroundMusic';
import Home from './components/Home';
import Writeups from './components/Writeups';
import WriteupDetail from './components/WriteupDetail';

function AppContent() {
  const location = useLocation();
  const isWriteups = location.pathname.startsWith('/writeups');

  React.useEffect(() => {
    if (isWriteups) {
      document.body.classList.add('writeups-theme');
    } else {
      document.body.classList.remove('writeups-theme');
    }
  }, [isWriteups]);

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
