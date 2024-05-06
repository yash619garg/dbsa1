import React from "react";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import MainFooter from "./Components/MainFooter";
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
      <main>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default App;
