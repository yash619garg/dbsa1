import React, { useState } from "react";
import { useCreateBlogMutation } from "../../Redux/Api/blogSlice";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");

  const [createBlog, isLoading] = useCreateBlogMutation();

  const createBlogHandler = async () => {
    try {
      const res = await createBlog({ title, blog });
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`blog is created`);
        navigate("/blog");
      }
    } catch (error) {
      toast.error(error.data.error || error.error);
    }
  };

  return (
    <div className="w-full min-h-screen font2 flex flex-col p-8 items-center ">
      <h1 className="text-[28px] smd:w-[70%] sm:text-[22px] vsm:text-[18px] sm:w-[85%] flex justify-start  uppercase tracking-wider mb-4 ">
        Write a new blog here
      </h1>
      <div className="w-[70%] sm:w-[85%] flex flex-col gap-7 ">
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

        <button
          onClick={createBlogHandler}
          className="w-[160px] bg-[#525CEB] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
