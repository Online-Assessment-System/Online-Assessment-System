import React from "react";
import Cards from "./Cards";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel from "./Carousel";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <Cards />
      <Footer />
    </>
  );
};

export default Home;
