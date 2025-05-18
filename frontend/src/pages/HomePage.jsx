import React from 'react'
import Navbar from "../components/Navbar";
import Lander from "../components/HomePage/Lander";
import Services from "../components/HomePage/Services";
import ContactUs from '../components/HomePage/ContactUs';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Lander />
      <Services />
      <ContactUs />
      <Footer/>
    </>
  );
};

export default HomePage