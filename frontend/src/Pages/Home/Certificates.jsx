import React from "react";
import { certificates } from "../../data";

const Certificates = () => {
  return (
    <div className="w-full flex gap-6 mt-20 p-6 justify-between md:justify-start  bg-[#F3F3F3] h-[419px]  overflow-scroll flex-row items-center">
      {certificates.map((data, index) => {
        return (
          <div
            key={index}
            className="min-w-[350px] flex flex-col gap-5 items-center justify-start h-full"
          >
            <img src={data.image} className="w-[220px] h-[220px]" alt="" />
            <div className="text-[18px] text-center font-[600]">
              {data.title}
            </div>
            <div className="text-[12px]">{data.caption}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Certificates;
