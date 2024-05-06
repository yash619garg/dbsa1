import React, { useEffect, useState } from "react";
// import { useCreateBlogMutation } from "../../Redux/Api/blogSlice";
import { toast } from "react-toastify";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "../../Redux/Api/blogSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const { id } = useParams();

  const { data: blogData, isLoading: getBlog } = useGetBlogQuery(id);

  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setBlog(blogData?.blog);
    setTitle(blogData?.title);
  }, [blogData]);

  const updateBlogHandler = async () => {
    try {
      const res = await updateBlog({ title, blog, _id: id });
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`blog is updated successfully`);
        navigate("/blog");
      }
    } catch (error) {
      toast.error(error.data.error || error.error);
    }
  };

  const deleteBlogHandler = async () => {
    try {
      const res = await deleteBlog(id);

      toast.success(`blog is deleted successfully`);
      navigate("/blog");
    } catch (error) {
      toast.error(error.data.error || error.error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-8 items-center ">
      <h1 className="text-[28px] smd:w-[70%] sm:text-[22px] vsm:text-[18px] sm:w-[85%] vsm:w-[95%] flex justify-start  uppercase tracking-wider mb-4 ">
        Write a new blog here
      </h1>
      <div className="w-[70%] sm:w-[85%] vsm:w-[95%] flex flex-col gap-7 ">
        <div className="flex gap-3 flex-col">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border-[2px] focus:outline-none border-gray-400 px-3 py-2 rounded-md"
            placeholder="Blog title"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Blog</label>
          <textarea
            placeholder="Write your blog here "
            name=""
            id=""
            cols="20"
            rows="10"
            className="border-[2px] focus:outline-none border-gray-400 px-3 py-2 rounded-md "
            value={blog}
            onChange={(e) => {
              setBlog(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="flex gap-3 flex-wrap vsm:justify-center">
          <button
            onClick={updateBlogHandler}
            className="w-[160px] bg-[#525CEB] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
          >
            Update
          </button>
          <button
            onClick={deleteBlogHandler}
            className="w-[160px] bg-red-500 py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
