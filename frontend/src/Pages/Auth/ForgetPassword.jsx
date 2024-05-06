import React, { useState } from "react";
import { useForgetPasswordMutation } from "../../Redux/Api/userApiSlice";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword] = useForgetPasswordMutation();

  const forgetPasswordHandler = async () => {
    try {
      const res = await forgetPassword({ email }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(
          `token has been sent to your email. please check in spam also`
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(error.data.error || error.error);
    }
  };
  return (
    <div className="w-full min-h-[400px] relative left-0 p-4 top-0 py-10 flex flex-col justify-center items-center">
      <div className="text-[21px] text-center font-[400]">
        Forgot Password ?{" "}
      </div>
      <div className="w-[30%] md:w-[50%] sm:w-[80%] vsm:w-[95%] flex gap-5 flex-col mt-5 items-center">
        <div className="flex w-full  flex-col gap-2 mt-6 ">
          <div className="w-full bg-[#c1c1c133]  rounded-lg">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your Email"
              className="bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none "
            />
          </div>
        </div>
        <button
          onClick={forgetPasswordHandler}
          className={`w-full h-[48px] rounded-lg tracking-wider text-[17px] font-[500] bg-[#525CEB] text-white
          } `}
        >
          Sent Link
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
