import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from './Hero';
import About from './About';
import Proficiencies from "../Proficiencies";
import Projects from './Projects';
import Hackathons from './Hackathons';
import Contact from './Contact';
import Extra from './Extra';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Proficiencies />
      <Projects />
      <Hackathons />
      <Contact />
      <Extra />
    </>
  );
};

export default Home;
