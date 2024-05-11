import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetBlogQuery } from "../../Redux/Api/blogSlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { useSelector } from "react-redux";

const SingleBlog = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(id);
  const { data: blogs, isLoading, error } = useGetBlogQuery(id);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.error || error.error}</Message>
  ) : (
    <div className="w-full flex flex-col items-center gap-5 p-6">
      <h1 className="text-[36px] capitalize font-[600] font2 tracking-widest md:text-[30px] smd:text-[36px] ">
        {blogs?.title}
      </h1>
      <img src={blogs?.image} alt="" className="" />
      <div className="w-[50%] md:w-[70%] sm:w-[85%] vsm:w-[95%] text-[#82828B] text-[16px] tracking-widest text-center mt-4 font-[400]">
        {blogs?.blog}
      </div>
      <div className="mt-5 gap-3 flex flex-wrap">
        <Link
          to="/blog"
          className="w-[140px] bg-[#525CEB] py-2 px-5 flex justify-center items-center capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
        >
          Back
        </Link>
        {userInfo && userInfo.isAdmin && (
          <Link
            to={`/adminMenu/update/blog/${blogs?._id}`}
            className="w-[140px] bg-[#525CEB] py-2 px-5 flex justify-center items-center capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
          >
            Update
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
