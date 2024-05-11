import React from "react";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import MainFooter from "./Components/MainFooter";
import { RiWhatsappFill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  offset: 120,
  duration: 500,
  mirror: true,
  // disable: "tablet",
});

const App = () => {
  return (
    <div className="font1">
      <ToastContainer />
      <Navbar />
      <main className="">
        {/* <a
          href="http://wa.me/+919416482163"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-[120px] sm:top-[100px] z-50 right-[30px]"
        >
          <RiWhatsappFill className="text-[50px] text-green-500 bg-white rounded-full px-2 shadow-md shadow-slate-400" />
        </a> */}
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default App;
