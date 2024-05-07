import React from "react";
import { pageLinks } from "../../data";
import { Link } from "react-router-dom";

const PageLinks = () => {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="w-[80%] vsm:w-[90%] p-4 flex flex-col gap-10 overflow-scroll">
        <div className="w-full flex gap-10">
          {pageLinks.map((page, index) => {
            return (
              <Link
                to={page.link}
                key={index}
                className="min-w-[155px] sm:min-w-[100px]  flex flex-col"
              >
                <div className="w-full h-[155px] sm:h-[100px] flex justify-center items-center border-[1px] shadow-lg shadow-slate-500 border-black bg-[#f3f3f3] rounded-full">
                  <img
                    src={page.image}
                    alt=""
                    className="w-[85px] h-[85px] sm:w-[55px] sm:h-[55px]"
                  />
                </div>
                <div className="text-[#222222] font2 text-center text-[18.8px] font-[600] mt-6">
                  {page.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageLinks;
