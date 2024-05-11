import React, { useState } from "react";
import { useCreateBlogMutation } from "../../Redux/Api/blogSlice";
import { toast } from "react-toastify";
import { useUploadProductImageMutation } from "../../Redux/Api/productSlice";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState("");

  const [createBlog, isLoading] = useCreateBlogMutation();
  const [uploadImage] = useUploadProductImageMutation();
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

  const createBlogHandler = async () => {
    try {
      const res = await createBlog({ title, blog, image });
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
    <div className="w-full min-h-screen font2 flex-wrap flex smd:flex-col  items-start justify-around smd:justify-start smd:items-center  p-7 md:px-4  smd:p-5 gap-10 md:gap-3">
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
        <button
          onClick={createBlogHandler}
          className="w-[160px] bg-[#525CEB] h-[50px] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
