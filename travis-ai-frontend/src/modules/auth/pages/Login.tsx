import CustomBtn from "@/components/custom/CustomBtn";
import Input from "@/modules/auth/components/Input";
import { Link } from "react-router-dom";
import { easeIn, motion } from "motion/react";
import useLogin from "../hooks/useLogin";
import Loader from "@/components/custom/secondaryloader";

const Login = () => {
  const { handlelogin, loginData, setLoginData, isLoading } = useLogin();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <motion.form
        onSubmit={handlelogin}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: -30 }}
        transition={{ duration: 0.5, ease: easeIn }}
        className="rounded-xl px-2 py-24 space-y-2 flex flex-col justify-center items-center gap-3 "
      >
        <h1 className="text-[1.6rem] md:text-4xl tracking-normal font-bold">
          Sign in to your account
        </h1>
        <div className="w-full  gap-3 flex flex-col md:justify-center md:items-center justify-start items-start ">
          <Input
            value={loginData.email}
            startIcon={`Mail`}
            placeholder="Email"
            type="email"
            onChange={(val) =>
              setLoginData({
                ...loginData,
                email: val,
              })
            }
          />
          <Input
            value={loginData.password}
            startIcon="Lock"
            placeholder="Password"
            type="password"
            onChange={(val) =>
              setLoginData({
                ...loginData,
                password: val,
              })
            }
          />

          <div className="flex mt-2 justify-between w-full">
            <span className="flex gap-2  mt-3 w-fit items-center  justify-start">
              <input type="checkbox" id="checkbox" className="w-4 h-4" />
              <label htmlFor="checkbox" className="font-semibold text-lg">
                Remember me{" "}
              </label>
            </span>
            <span>
              <a className="flex gap-2  mt-3  p-2 w-full items-center md:justify-center justify-start">
                Forgot passsword?
              </a>
            </span>
          </div>
        </div>
        <span className="w-full mt-3">
          {isLoading ? (
            <span className="flex w-full rounded-full justify-center items-center h-full p-3 bg-m-accent">
              <Loader />
            </span>
          ) : (
            <CustomBtn text={`Log in`} isSolid={true} type="submit" />
          )}
        </span>
        <p className="mt-3 text-lg md:text-xl">
          Don't have an account?{" "}
          <Link to={`/auth/signup`} className="text-m-accent">
            Create One
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
