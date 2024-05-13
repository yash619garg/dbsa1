import React, { useEffect } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
// import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

import "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
import { useLocation } from "react-router-dom";

const ContactUs = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const defaultProps = {
    center: {
      lat: -26.12071,
      lng: 28.09332,
    },
    zoom: 14,
  };
  return (
    <div className="flex w-[100vw] min-h-[100vh] font2 md:flex-col md:min-h-0 py-5">
      <div className="w-1/2 h-full p-10 md:w-full">
        <h1 className="text-3xl logo text-center text-secondary">Contact Us</h1>
        <dotlottie-player
          src="https://lottie.host/074631f5-e5f8-4eb2-a9b8-cb75a8242a72/8A37bLt7kF.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></dotlottie-player>
        {/* <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact> */}
        {/* </div> */}
        <p className="text-xl logo text-center text-third md:text-xl vsm:text-lg">
          Have questions or want to learn more about our services? We're here to
          help! Feel free to reach out to us using the contact information below
          or fill out the form, and we'll get back to you as soon as possible.
        </p>
      </div>
      <div className="w-1/2 p-10 flex flex-col logo text-3xl text-center sm:px-10 md:w-full md:min-h-0 text-secondary">
        <h1 className="text-3xl">OUR DETAILS</h1>
        <div className="w-full min-h-[70vh] text-third tracking-widest flex flex-col gap-5 justify-center items-center md:min-h-0 md:mt-6 vsm:tracking-normal">
          <div className="flex flex-col items-center w-full justify-center gap-5 text-xl">
            <FaPhoneAlt className="text-5xl text-sixth" />
            <h1>+27765123912</h1>
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-5 text-xl">
            <MdEmail className="text-5xl text-sixth" />
            <h1>info@electricalboards.co.za</h1>
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-5 text-xl">
            <FaLocationDot className="text-5xl text-sixth" />
            <h1>79 9th Road, Kew, JHB, 2090</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
