import React from "react";
import { Brand } from "../../data";
import { Link } from "react-router-dom";

const Brands = () => {
  return (
    <div className="w-full flex justify-center flex-col gap-12  items-center mt-20 ">
      <div className="flex w-[80%] vsm:w-[90%] gap-10 justify-between  items-center overflow-scroll">
        <div className="text-[30px] font-[600] sm:text-[20px]">
          Verified Brands
        </div>
        {/* <Link className="px-4 text-[16px] font-[600]" to="/">
          View All
        </Link> */}
      </div>
      <div className="w-[80%] vsm:w-[90%] flex flex-col gap-10 overflow-scroll">
        <div className="w-full flex justify-between md:justify-start  gap-8">
          {Brand.map((brand, index) => {
            return (
              <div key={index} className="min-w-[236px] h-[82px] p-4 ">
                <div className="w-full h-full">
                  <img src={brand.image} alt="" className="w-full h-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brands;
