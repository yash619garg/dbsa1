import React, { useEffect } from "react";
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
import { useLoginGoogleQuery } from "../../Redux/Api/googleSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredential } from "../../Redux/features/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
// import { useGoogleSuccessQuery } from "../../Redux/Api/userApiSlice";

// const { data: userInfo } = useGoogleSuccessQuery();

const Home = () => {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await axios.get(
        `https://dbsa2.onrender.com/auth/login/success`,
        {
          withCredentials: true,
        }
      );
      dispatch(
        setCredential({
          email: res.data.email,
          _id: res.data._id,
          isAdmin: res.data.isAdmin,
          username: res.data.displayName,
        })
      );
      // toast.success("user logged in successfully");
    } catch (error) {
      toast.error(error?.data?.error || error?.error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full relative styleFont">
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
