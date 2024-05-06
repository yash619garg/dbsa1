import React, { useEffect, useState } from "react";
// import img2 from "../../images/profile-img.webp";
import bg from "../../images/Rectangle 25.png";
import design from "../../images/Mask group.png";
import { newProduct } from "../../data";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaQuoteRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../Redux/Api/categorySlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
// import { useSelector } from "react-redux";

const HeroSection = () => {
  const {
    data: categories,
    isLoading: categoryLoading,
    error,
  } = useGetAllCategoryQuery();


  const [currentIndex, setIndex] = useState(0);
  useEffect(() => {
    const slide = setInterval(() => {
      setIndex(currentIndex + 1);
    }, 3000);
    return () => clearInterval(slide);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex > newProduct.length - 1) {
      setIndex(0);
    }
    if (currentIndex < 0) {
      setIndex(newProduct.length - 1);
    }
  }, [currentIndex]);

  const nextIndex = () => {
    if (currentIndex < newProduct.length - 1) {
      setIndex(currentIndex + 1);
    } else {
      setIndex(0);
    }
  };
  const prevIndex = () => {
    if (currentIndex !== 0) {
      setIndex(currentIndex - 1);
    } else {
      setIndex(newProduct.length - 1);
    }
  };
  return categoryLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error?.data?.error || error?.error}</Message>
  ) : (
    <div className="flex w-[100vw] font2 mt-20 bg-transparent min-h-[320px] smd:min-h-[580px] gap-5 justify-center relative overflow-hidden  ">
      {categories.allCategory.map((product, index) => {
        let position = "nextSlide";
        const { image, name, startingRate } = product;
        if (index === currentIndex) {
          position = "activeSlide";
        }
        if (
          index === currentIndex - 1 ||
          (currentIndex === 0 && index === newProduct.length - 1)
        ) {
          position = "prevSlide";
        }
        return (
          <div
            key={index}
            className={`flex w-[80vw] h-full gap-5 flex-col justify-center md:rounded-none rounded-lg items-center absolute transition-all duration-700 text-center  ${
              position === "prevSlide" && "translate-x-[-100vw] opacity-0"
            } ${position === "nextSlide" && "translate-x-[100vw] opacity-0"} ${
              position === "activeSlide" && "translate-x-[0vw]"
            }`}
          >
            <div className="w-full h-full flex justify-center overflow-hidden md:rounded-none rounded-lg absolute left-0 top-0">
              <img src={bg} alt="" className="w-full h-full  " />
            </div>
            <div className="w-full flex smd:flex-col px-10 py-4 justify-between items-center h-full absolute left-0 top-0 ">
              <div className="flex flex-col gap-2 smd:h-1/2 smd:w-full smd:justify-center smd:items-center smd:gap-4  smd:order-2 text-white items-start px-5  ">
                <div className="text-5xl flex text-start smd:text-center sm:text-4xl sm:tracking-wider ">
                  {name}
                </div>
                <div className="text-3xl sm:text-2xl ">
                  From Rs. {startingRate}{" "}
                </div>
                <Link
                  to={`/shop?category=${product._id}`}
                  className="bg-[#282a3a] rounded-md px-4 py-3"
                >
                  Shop Now
                </Link>
              </div>
              <div className="h-full min-w-1/3 smd:w-full smd:h-1/2 relative smd:order-1">
                <div className="h-full w-full ">
                  <img
                    src={design}
                    alt=""
                    className="w-full h-full smd:hidden "
                  />
                  <div className="absolute px-3 object-contain left-0 top-0 w-full h-full flex justify-center items-center">
                    <img
                      className=" w-[80%] max-h-[90%] smd:w-[95%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.75)] object-contain "
                      src={image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className="absolute left-[-30px] border-[2px] border-gary-600 rounded-full text-xl p-6 bg-[#f7f4f4]"
              onClick={() => {
                prevIndex();
              }}
            >
              <GrPrevious />{" "}
            </button>
            <button
              onClick={() => {
                nextIndex();
              }}
              className="absolute border-[2px] border-gary-600 right-[-30px] rounded-full text-xl p-6 bg-[#f7f4f4]"
            >
              <GrNext />{" "}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default HeroSection;
