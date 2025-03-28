import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { checkValidData, checkValidSignUpData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleFormSubmit = () => {
    let message = null;
    const emailVal = email.current.value;
    const passwordVal = password.current.value;
    if (isSignInForm) {
      message = checkValidData(emailVal, passwordVal);
    } else {
      message = checkValidSignUpData(name.current.value, emailVal, passwordVal);
    }
    setErrorMsg(message);
    if (message) return;
    // login / sign up the user
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " " + errorMessage);
        });
    }
  };
  return (
    <div className="h-screen w-full bg-black login-container">
      <Header />
      <div className="absolute w-full md:w-[28%] mx-auto wrapper px-12 py-6 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-white font-bold text-[2rem] my-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <div className="flex flex-col gap-6 w-full">
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-3 input-bg rounded-lg focus-visible:outline-none caret-white focus-visible:border focus-visible:border-white text-white"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email or mobile number"
              className="p-3 input-bg rounded-lg focus-visible:outline-none caret-white focus-visible:border focus-visible:border-white text-white"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-3 input-bg rounded-lg focus-visible:outline-none caret-white focus-visible:border focus-visible:border-white text-white"
            />
            <p className="text-base font-bold text-red-500">{errorMsg}</p>
            <button
              className="p-3 rounded-lg text-white bg-[#e50914]"
              onClick={handleFormSubmit}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <p className="text-white py-6 mb-6">
            <span className="opacity-70 font-normal">
              {isSignInForm ? "New to Netflix? " : "Already registered? "}
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
