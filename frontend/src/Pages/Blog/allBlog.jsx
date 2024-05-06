import React, { useEffect } from "react";
import { useAllBlogQuery } from "../../Redux/Api/blogSlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import moment from "moment/moment";
import { Link, useLocation } from "react-router-dom";

const AllBlog = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const { data: blogs, isLoading, error } = useAllBlogQuery();
  // console.log(blogs);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.error || error.error}</Message>
  ) : (
    <div className="w-full flex flex-col p-5 items-center">
      <h1 className="text-[30px] font2 font-[500] mb-4 ">Blogs</h1>
      <div className="w-[80%] sm:w-[90%] vsm:w-[100%] flex flex-wrap justify-center gap-8">
        {blogs.map((b) => {
          return (
            <div
              key={b._id}
              className="min-w-[340px] vsm:w-[280px] gap-2 rounded-md shadow-md shadow-slate-600 p-4 h-auto flex flex-col"
            >
              <h1 className="text-[20px] uppercase my-4 font1 font-[600] tracking-wider">
                {b.title}
              </h1>
              <p className="text-[15px] text-[#82828B] uppercase font2 tracking-wider font-[400] ">
                {moment(b.createAt).format("MMMM Do YYYY")}
              </p>
              <p className="text-[#82828B] flex flex-col text-[16px] tracking-wider mt-4 font-[400]">
                {b?.blog.substring(0, 200)}...
                <Link
                  to={b._id}
                  className="text-[#525CEB] hover:underline font-[500]"
                >
                  Read more
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBlog;
