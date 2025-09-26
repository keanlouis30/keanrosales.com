import React from "react";
import './App.css';
import './styles/globals.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Proficiencies from "./Proficiencies";
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Contact from './components/Contact';
import Extra from './components/Extra';
import BackgroundMusic from './components/BackgroundMusic';

function App() {
  return (
    <div className="app">
      <BackgroundMusic />
      <Navigation />
      <Hero />
      <About />
      <Proficiencies />
      <Projects />
      <Hackathons />
      <Contact />
      <Extra />
    </div>
  );
}

export default App;
