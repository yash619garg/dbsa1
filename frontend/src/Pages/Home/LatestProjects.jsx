import React from "react";
// import { Projects } from "../../data";
import { Link } from "react-router-dom";
import { useAllProjectQuery } from "../../Redux/Api/projectSlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

const LatestProjects = () => {
  const { data: projects, isLoading, error } = useAllProjectQuery();
  console.log(projects);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error?.data?.error || error?.error}</Message>
  ) : (
    <div className="w-full flex justify-center flex-col gap-12 items-center mt-20 ">
      <div className="flex w-[80%] vsm:w-[90%] justify-between items-center">
        <div className="text-[30px] vsm:text-[24px] font-[600]">
          Our Latest Projects
        </div>
        <Link className="px-4 text-[16px] font-[600]" to="/project">
          View All
        </Link>
      </div>
      <div className="w-[80%] vsm:w-[90%] flex flex-col gap-10 overflow-scroll">
        <div className="w-full flex gap-6">
          {projects.map((project, index) => {
            return (
              <Link
                data-aos="fade-out"
                data-aos-duration="300"
                key={index}
                to={`/project/${project._id}`}
                className="min-w-[228px] h-[137px]"
              >
                <div className="w-full h-full">
                  <img src={project.image} alt="" className="w-full h-full" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestProjects;
