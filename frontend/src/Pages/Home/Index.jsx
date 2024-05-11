import React from "react";
import HeroSection from "./HeroSection";
import About from "./About";
import LatestProjects from "./LatestProjects";
import PageLinks from "./PageLinks";
import TopProducts from "./TopProducts";
import Banner from "./Banner";
import Category from "./Category";
import { RiWhatsappFill } from "react-icons/ri";
import Certificates from "./Certificates";
import Brands from "./Brands";

const Home = () => {
  return (
    <div className="w-full relative styleFont">
      <a
        href="http://wa.me/+919416482163"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[120px] sm:top-[100px] z-50 right-[30px]"
      >
        <RiWhatsappFill className="text-[50px] text-green-500 bg-white rounded-full px-2 shadow-md shadow-slate-400" />
      </a>
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
