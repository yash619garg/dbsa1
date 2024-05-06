import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiCubeLight } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineDocumentText } from "react-icons/hi";

const SideBar2 = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   console.log(userInfo?.isAdmin);
  return (
    <div className="absolute flex-col z-[1000] text-[#757575] font-[500] shadow-slate-500 shadow-md p-3 bg-white border-[1px]  rounded-md border-gray-400 text-[16px] w-[222px] left-0 top-[25px] ">
      <ul className="rounded-md text-start  first:rounded-md last:rounded-md ">
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#525CEB" : "#757575",
          })}
          to="adminDashboard"
          className="flex justify-start items-center gap-1 "
        >
          <span className="text-[18px]">
            <MdDashboard />
          </span>
          Dashboard
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#525CEB" : "#757575",
          })}
          to="usersList"
          className="flex justify-start items-center gap-1 "
        >
          <span className="text-[18px]">
            <LuUsers />
          </span>
          Users
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#525CEB" : "#757575",
          })}
          to="createProduct"
          className="flex justify-start items-center gap-1 "
        >
          <span className="text-[18px]">
            <PiCubeLight />
          </span>
          Create Products
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#525CEB" : "#757575",
          })}
          to="categoryList"
          className="flex justify-start items-center gap-1 "
        >
          <span className="text-[18px]">
            <MdOutlineCategory />
          </span>
          Category
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#525CEB" : "#757575",
          })}
          to="createCategory"
          className="flex justify-start items-center gap-1 "
        >
          <span className="text-[18px]">
            <MdOutlineCategory />
          </span>
          Create Category
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#525CEB" : "#757575",
          })}
          to="createBlog"
          className="flex justify-start items-center gap-1 "
        >
          <span className="text-[18px]">
            <HiOutlineDocumentText />
          </span>
          Create Blog
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#525CEB" : "#757575",
          })}
          to="createProject"
          className="flex justify-start items-center gap-1 "
        >
          <span className="text-[18px]">
            <HiOutlineDocumentText />
          </span>
          Create Project
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#525CEB" : "#757575",
          })}
          to="orderList"
          className="flex justify-start items-center gap-1 "
        >
          <span className="text-[20px]">
            <CiShoppingCart />
          </span>
          Orders
        </NavLink>
      </ul>
    </div>
  );
};

export default SideBar2;
