import React, { useEffect, useState } from "react";
// import { useCreateBlogMutation } from "../../Redux/Api/blogSlice";
import { toast } from "react-toastify";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "../../Redux/Api/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useUploadProductImageMutation } from "../../Redux/Api/productSlice";

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  const { data: blogData, isLoading: getBlog } = useGetBlogQuery(id);

  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const navigate = useNavigate();

  const [uploadImage] = useUploadProductImageMutation();

  useEffect(() => {
    setBlog(blogData?.blog);
    setTitle(blogData?.title);
    setImage(blogData?.image);
  }, [blogData]);

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlogHandler = async () => {
    try {
      const res = await updateBlog({ title, blog, image, _id: id });
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
    <div className="w-full min-h-screen flex-wrap flex smd:flex-col  items-start justify-around smd:justify-start smd:items-center  p-7 md:px-4  smd:p-5 gap-10 md:gap-3">
      <div className="flex relative flex-col w-[320px] justify-start gap-12 min-h-[320px] items-center  rounded-[20px]">
        <div className="w-full h-[180px] flex justify-center items-center group rounded-[20px] bg-[#EDEBE9] ">
          <img
            src={image}
            alt=""
            className={`w-[228px] bg-transparent h-[137px] object-contain ${
              image ? "block" : "hidden"
            } `}
          />
          <div className="absolute w-full h-[180px] left-0 top-0">
            <label
              className={`w-full h-full overflow-hidden  shadow-md shadow-slate-400 bg-[#EDEBE9] smd:bg-transparent flex-wrap text-black ${
                image ? "hidden" : "flex"
              } rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`}
            >
              {image ? image.name : "Upload Main Image"}
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={uploadImageHandler}
                className={`${!image ? "hidden" : "text-black"} `}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col w-full gap-3">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            className="focus:outline-none px-3 py-2 border-[2px] border-black rounded-lg"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col w-[380px] md:w-[280px] smd:w-[320px] relative  left-0 items-start  gap-5 ">
        <div className="flex flex-col w-full gap-3 items-center justify-between">
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="">Blog</label>
            <textarea
              placeholder="Write your blog here "
              name=""
              id=""
              cols="20"
              rows="10"
              className="border-[2px] h-[180px] focus:outline-none border-gray-400 px-3 py-2 rounded-md "
              value={blog}
              onChange={(e) => {
                setBlog(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap vsm:justify-center">
          <button
            onClick={updateBlogHandler}
            className="w-[160px] bg-[#525CEB] h-[50px] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
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
