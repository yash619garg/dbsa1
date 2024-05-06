import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Redux/Api/userApiSlice";
import { toast } from "react-toastify";
import { logout } from "../Redux/features/authSlice";
import { partners } from "../data";

const SideBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [company, setCompany] = useState("ABB");

  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutUser().unwrap();
      console.log(res);
      dispatch(logout());
      toast.success("user logout successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };

  console.log(userInfo?.isAdmin);
  return (
    <div className="absolute flex-col font2 z-[1000] text-[#757575] font-[500] shadow-slate-500 shadow-md p-3 bg-white border-[1px]  rounded-md border-gray-400 text-[16px] w-[222px] left-0 top-[85px] ">
      <ul className="rounded-md text-start  first:rounded-md last:rounded-md ">
        {userInfo?.isAdmin && (
          <li className="bg-white hover:bg-[#F6F6F6] text-start  rounded-md  py-1 px-3">
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#525CEB" : "#757575",
              })}
              className="w-full h-full"
              to="/adminMenu/adminDashboard"
            >
              Admin Menu
            </NavLink>
          </li>
        )}
        <li className="bg-white  rounded-md hover:bg-[#F6F6F6] py-1 px-3">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="/project"
            className="w-full h-full"
          >
            Projects
          </NavLink>
        </li>
        <li className="bg-white  rounded-md hover:bg-[#F6F6F6] py-1 px-3">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            className="w-full h-full"
            to="/blog"
          >
            Blog
          </NavLink>
        </li>
        <li className="bg-white  rounded-md hover:bg-[#F6F6F6] py-1 px-3">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            className="w-full h-full"
            to="/contact"
          >
            Contact Us
          </NavLink>
        </li>
        {userInfo && (
          <>
            <li className="bg-white  rounded-md hover:bg-[#F6F6F6]   py-1 px-3">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#525CEB" : "#757575",
                })}
                className="w-full h-full"
                to="/privateRoute"
              >
                Profile
              </NavLink>
            </li>
            <li
              onClick={logoutHandler}
              className="bg-white  rounded-md hover:bg-[#F6F6F6]   py-1 px-3"
            >
              <NavLink onClick={logoutHandler}>Logout</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
