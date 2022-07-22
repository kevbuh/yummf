import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";
import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="w-10 h-10"
      viewBox="0 0 48 48"
    >
      <defs>
        <path
          id="a"
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
        />
      </defs>
      <clipPath id="b">
        <use xlinkHref="#a" overflow="visible" />
      </clipPath>
      <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
      <path
        clipPath="url(#b)"
        fill="#EA4335"
        d="M0 11l17 13 7-6.1L48 14V0H0z"
      />
      <path
        clipPath="url(#b)"
        fill="#34A853"
        d="M0 37l30-23 7.9 1L48 0v48H0z"
      />
      <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
    </svg>
  );
};

const FacebookSVG = () => {
  return (
    <svg
      className="w-10 h-10 text-blue-600 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
};

export default function Landing() {
  const router = useRouter();
  const myRef = useRef<null | HTMLDivElement>(null);
  const arrowDown = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => myRef?.current?.scrollIntoView();
  const executeScroll2 = () => {
    setShouldShowLogin((shouldShowLogin) => !shouldShowLogin);
    myRef?.current?.scrollIntoView();
  };

  const executeScrollArrow = () => arrowDown?.current?.scrollIntoView();

  const [shouldShowLogin, setShouldShowLogin] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-2 w-full sm:max-w-6xl mx-auto mt-4 ">
        <a
          className="btn btn-ghost normal-case text-3xl text-rosa mr-auto my-auto"
          onClick={executeScroll}
        >
          kooki
        </a>
        <div className="grid grid-rows-1 sm:grid-cols-3 ml-auto my-auto gap-4 ">
          <a className="text-xl font-semibold my-auto ml-auto cursor-pointer ">
            {/* About */}
          </a>
          <>
            <button
              className="text-xl font-semibold rounded-xl bg-stone-100 px-3 py-2 sm:p-2 text-center cursor-pointer scroll-smooth"
              onClick={executeScroll2}
            >
              Log in
            </button>
            <button
              className="text-xl font-semibold rounded-xl bg-rosa text-white p-2 cursor-pointer"
              onClick={executeScroll}
            >
              Sign up
            </button>
          </>
        </div>
      </div>
      <div className="md:h-screen md:grid md:grid-cols-2">
        <div className="m-auto grid grid-rows-2 justify-evenly">
          <div>
            {/* The complete food solution, everything in one place */}
            <div className="text-7xl font-semibold mt-20 sm:mt-1">Recipes </div>
            <div className="text-7xl font-semibold">
              For <span className="underline">You</span>
            </div>
          </div>
          <div className="my-auto sm:mt-auto mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 m-auto cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={executeScrollArrow}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* put something cool here */}
        <div className="rounded-xl bg-stone-100 md:mt-20 h-2/5 mx-auto px-30 md:ml-1 md:mr-8 ">
          <Player
            autoplay={true}
            speed={0.1}
            loop={true}
            src="https://assets5.lottiefiles.com/packages/lf20_mutit5qg.json"
            style={{ height: "h-50", width: "500px" }}
          ></Player>
        </div>
      </div>

      <div className=" grid grid-cols-1 mt-40 sm:mt-0 mb-20" ref={arrowDown}>
        <div className="m-auto h-1/2">
          <div className="text-7xl font-semibold">Discover Recipes</div>
        </div>
      </div>
      <div className="h-96 grid grid-cols-2 my-4">
        <div className="m-auto text-7xl font-semibold">Search</div>

        {/* put something cool here */}
        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8">
          {/* <Player
            autoplay={true}
            speed={0.2}
            // loop={true}
            src="https://assets3.lottiefiles.com/packages/lf20_3c7ghk3c.json"
            style={{ height: "200px", width: "520px" }}
          ></Player> */}
        </div>
      </div>
      <div className="h-96 grid grid-cols-2">
        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8">
          {/* <Player
            autoplay={true}
            speed={0.2}
            // loop={true}
            src="https://assets7.lottiefiles.com/packages/lf20_irbx8ets.json"
            style={{ height: "200px", width: "200px" }}
          ></Player> */}
        </div>

        <div className="m-auto text-7xl font-semibold">Save</div>
      </div>
      <div className="h-96 grid grid-cols-2 my-4">
        <div className="m-auto text-7xl font-semibold">Start!</div>

        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8">
          {/* <Player
            autoplay={true}
            speed={0.2}
            // loop={true}
            src="https://assets8.lottiefiles.com/packages/lf20_yvvq3eqt.json"
            style={{ height: "200px", width: "200px" }}
          ></Player> */}
        </div>
      </div>
      <div className=" grid grid-row-1 mt-48">
        <div className="mx-auto mb-4">
          <div className="text-5xl md:text-7xl font-semibold">
            Technology First Approach to Food
          </div>
        </div>
        <div className="mx-auto">
          <div className="text-2xl md:text-3xl font-light mt-2">
            With a Fully Integrated Suite of Products
          </div>
        </div>
        <div className="mx-auto grid grid-cols-2 md:grid-cols-4 h-80 gap-8 mt-6 w-10/12 ">
          <div className="text-2xl font-semibold  rounded-lg bg-stone-100">
            Discover
          </div>
          <div className="text-2xl font-semibold  rounded-lg bg-stone-100">
            Create
          </div>
          <div className="text-2xl font-semibold  rounded-lg bg-stone-100">
            Learn
          </div>
          <div className="text-2xl font-semibold  rounded-lg bg-stone-100">
            Order
          </div>
        </div>
      </div>
      <div className="h-screen md:grid md:grid-cols-2 mt-20">
        <div className="m-auto invisible md:visible" ref={myRef}>
          <p className="md:mt-20 md:mb-20 text-7xl mx-auto font-bold border-4 border-rosa text-rosa rounded-full md:py-24 px-12 hover:text-white hover:bg-rosa hover:cursor-pointer">
            kooki
          </p>
        </div>
        <div className="m-auto">
          <div className="text-7xl font-semibold">
            {!shouldShowLogin ? "Sign Up " : "Log In "}&
          </div>
          <div className="text-7xl font-semibold">
            Start <span className="underline">Today</span>
          </div>
          <div>
            <div className="mx-auto text-2xl rounded-lg bg-stone-100 p-2 text-center space-y-4 py-8">
              <button
                onClick={() => signIn("google")}
                className="rounded-full p-2 mr-4 bg-white"
              >
                <GoogleSVG />
              </button>
              <button
                onClick={() => signIn("facebook")}
                className="rounded-full p-2 ml-4 bg-white"
              >
                <FacebookSVG />
              </button>

              <div className="w-1/2 mx-auto"></div>
              <p className="text-base ">or</p>
              <button
                onClick={() => signIn("google")}
                className="flex flex-row mx-auto space-evenly rounded-lg p-3 bg-white text-base font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 my-auto mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                Email address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <p className="text-base font-light">or</p> 
  <div className="bg-stone-100 px-2 rounded-xl flex flex-col ">
                {shouldShowLogin ? (
                  <div className="p-2">
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Required"),
                        password: Yup.string()
                          .required("No password provided.")
                          .min(
                            8,
                            "Password is too short - should be 8 chars minimum."
                          ),
                      })}
                      onSubmit={async (values, { setSubmitting }) => {
                        // register user here

                        setSubmitting(false);
                      }}
                    >
                      <Form>
                        <div className="rounded-lg bg-stone-100 px-8  flex flex-col text-lg">
                          <label htmlFor="email" className="bg-stone-100">
                            Email Address
                          </label>
                          <Field
                            name="email"
                            type="email"
                            className="p-2 my-1 text-lg"
                          />
                          <ErrorMessage name="email">
                            {(msg) => <p className="text-red-600">{msg}</p>}
                          </ErrorMessage>

                          <label htmlFor="password" className="mt-1">
                            Password
                          </label>
                          <Field
                            name="password"
                            type="password"
                            className="p-2 my-1 text-lg"
                          />
                          <ErrorMessage name="password">
                            {(msg) => <p className="text-red-600">{msg}</p>}
                          </ErrorMessage>

                          <button
                            type="submit"
                            className="rounded py-2 px-8 mt-2 bg-pink-600 text-white "
                          >
                            Continue
                          </button>
                        </div>
                      </Form>
                    </Formik>
                    <div className="mt-2 flex text-lg items-center ">
                      Haven&apos;t Signed Up? &nbsp;
                      <button
                        className="underline"
                        onClick={() => {
                          setShouldShowLogin(
                            (shouldShowLogin) => !shouldShowLogin
                          );
                        }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2">
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Required"),
                        password: Yup.string()
                          .required("No password provided.")
                          .min(
                            8,
                            "Password is too short - should be 8 chars minimum."
                          )
                          .matches(
                            /[a-zA-Z]/,
                            "Password can only contain Latin letters."
                          ),
                      })}
                      onSubmit={async (values, { setSubmitting }) => {
                        // register user here

                        setSubmitting(false);
                      }}
                    >
                      <Form>
                        <div className="rounded-lg bg-stone-100 px-8 flex flex-col text-lg">
                          <label htmlFor="email" className="bg-stone-100 ">
                            Email Address
                          </label>
                          <Field
                            name="email"
                            type="email"
                            className="p-2 my-1"
                          />
                          <ErrorMessage name="email">
                            {(msg) => <p className="text-red-600">{msg}</p>}
                          </ErrorMessage>

                          <label htmlFor="password" className="bg-stone-100 ">
                            Password
                          </label>
                          <Field
                            name="password"
                            type="password"
                            className="p-2 my-1"
                          />
                          <ErrorMessage name="password">
                            {(msg) => <p className="text-red-600">{msg}</p>}
                          </ErrorMessage>

                          <button
                            type="submit"
                            className="rounded py-2 px-8 mt-2 bg-pink-600 text-white "
                          >
                            Sign Up
                          </button>
                        </div>
                      </Form>
                    </Formik>

                    <div className="mt-2 flex ml-auto items-center text-lg ">
                      Already eating? &nbsp;
                      <button
                        className="underline"
                        onClick={() =>
                          setShouldShowLogin(
                            (shouldShowLogin) => !shouldShowLogin
                          )
                        }
                      >
                        Login
                      </button>
                    </div>
                  </div>
                )}
              </div> */
}
