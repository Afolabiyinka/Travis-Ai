import CustomBtn from "@/components/custom/CustomBtn";
import Input from "@/modules/auth/components/Input";
import { Link } from "react-router-dom";
import { easeIn, motion } from "motion/react";
import { User } from "lucide-react";
import useSignUp from "../hooks/useSignup";
import Loader from "@/components/custom/secondaryloader";

const SignUp = () => {
  const { handleSubmit, setSignUpData, signUpData, isLoading } = useSignUp();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <motion.form
        onSubmit={handleSubmit}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: -30 }}
        transition={{ duration: 0.5, ease: easeIn }}
        className="rounded-xl px-4 py-24 space-y-2 flex flex-col justify-center items-center  gap-3 "
      >
        <h1 className="text-[1.7rem] md:text-4xl  font-[inter]   tracking-normal font-semibold flex gap-3 items-center">
          Create a new account <User size={40} className="stroke-[2px]" />
        </h1>

        <Input
          startIcon={`User`}
          placeholder="Username"
          type="text"
          value={signUpData.username}
          onChange={(val) => setSignUpData({ ...signUpData, username: val })}
        />
        <Input
          startIcon={`Mail`}
          placeholder="Email"
          type="email"
          value={signUpData.email}
          onChange={(val) => setSignUpData({ ...signUpData, email: val })}
        />
        <Input
          startIcon="Lock"
          placeholder="Password"
          type="password"
          value={signUpData.password}
          onChange={(val) => setSignUpData({ ...signUpData, password: val })}
        />
        <Input
          startIcon="Lock"
          placeholder="Confirm Password"
          type="password"
          value={signUpData.confirmedPassword}
          onChange={(val) =>
            setSignUpData({ ...signUpData, confirmedPassword: val })
          }
        />
        <span className="w-full  mt-6">
          {isLoading ? (
            <span className="flex w-full rounded-full justify-center items-center h-full p-3 bg-m-accent">
              <Loader />
            </span>
          ) : (
            <CustomBtn text={`Create Account`} isSolid={true} type="submit" />
          )}{" "}
        </span>

        <p className="mt-3 text-lg md:text-xl">
          Already have an account?
          <Link to={`/auth/login`} className="text-m-accent">
            Sign In
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default SignUp;
