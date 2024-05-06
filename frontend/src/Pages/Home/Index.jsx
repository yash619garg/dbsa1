import React from "react";
import HeroSection from "./HeroSection";
import About from "./About";
import LatestProjects from "./LatestProjects";
import PageLinks from "./PageLinks";
import TopProducts from "./TopProducts";
import Banner from "./Banner";
import Category from "./Category";
import Certificates from "./Certificates";
import Brands from "./Brands";

const Home = () => {
  return (
    <div className="w-full styleFont">
      <HeroSection />
      <About />
      <LatestProjects />
      <PageLinks />
      <TopProducts />
      <Banner />
      <Category />
      <Certificates />
      <Brands />
    </div>
  );
};

export default Home;
