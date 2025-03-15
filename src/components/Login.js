import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="h-screen w-full bg-black login-container">
      <Header />
      <div className="absolute w-[28%] mx-auto wrapper px-12 py-6 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <form>
          <h1 className="text-white font-bold text-[2rem] my-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <div className="flex flex-col gap-6 w-full">
            {!isSignInForm && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 input-bg rounded-lg focus-visible:outline-white caret-white"
              />
            )}
            <input
              type="text"
              placeholder="Email or mobile number"
              className="p-3 input-bg rounded-lg focus-visible:outline-white caret-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 input-bg rounded-lg focus-visible:outline-white caret-white"
            />
            <button className="p-3 rounded-lg text-white bg-[#e50914]">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <p className="text-white py-6 mb-6">
            <span className="opacity-70 font-normal">
              {isSignInForm ? "New to Netflix?" : "Already registered?"}
            </span>
            <span
              className="cursor-pointer hover:underline font-medium"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Sign up now." : "Sign In Now."}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
