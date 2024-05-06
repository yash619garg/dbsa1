import React from "react";
import { banners } from "../../data";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="w-[90%] gap-5 justify-center items-center  flex flex-wrap ">
        {banners.map((banner, index) => {
          return (
            <div
              data-aos="zoom-in-down"
              key={index}
              className="w-[584px] shadow-lg shadow-slate-400 h-[310px] gap-3 rounded-lg flex justify-between text-white first:text-black p-5 bg-[black] first:bg-[#F3F3F3] "
            >
              <div className="flex flex-col gap-3 justify-center">
                <div className="text-[31px] vsm:text-[24px] font-semibold ">
                  {banner.title}
                </div>
                <div className="text-gray-400">{banner.caption}</div>
                <Link
                  to={banner.link}
                  className={`${
                    index === 1 && "bg-[#282A3A] "
                  } bg-[#282a3a] w-[164px] h-[44px] rounded-md flex justify-center items-center px-4 py-3 text-white  `}
                >
                  {banner.buttonText}
                </Link>
              </div>
              <div className="flex  justify-center items-center">
                <img src={banner.image} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;
