import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register, resetRegistered, login } from "../redux/features/user";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { getUser } from "../fetches/allFetches";
import { useQuery } from "react-query";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { API_URL } from "../config";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    "getUserData", // could probably add cookie to differentiate
    getUser
  );
  const myRef = useRef(null);
  const myRef2 = useRef(null);

  const responseGoogle = (response) => {
    console.log("GOOG", response, jwt_decode(response.credential));

    var token = jwt_decode(response.credential);

    var data = {
      provider: "google_oauth2",
      uid: token.sub,
      id_token: token.sub,
      info: {
        email: token.email,
      },
      client_id: process.env.CLIENT_ID,
    };

    console.log("USER OBJECT FROM GOOGLE", data);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.jti}`,
        "Content-Type": "application/json",
        access_token: `${token.jti}`,
      },
      body: JSON.stringify(data),
    };

    return fetch(`${API_URL}/api/v1/users/social_auth/callback`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response, "I AM  RESPONSE FROM THE BACKEND");
        // login({
        //   email: response.data.email,
        //   password: values.password,
        // });
        // do something
      })
      .catch((err) => console.log(err));
  };

  const arrowDown = useRef(null);

  // run this function from an event handler or an effect to execute scroll
  const executeScroll = () => myRef.current.scrollIntoView();
  const executeScroll2 = () => {
    setShouldShowLogin((shouldShowLogin) => !shouldShowLogin);
    myRef.current.scrollIntoView();
  };

  const executeScrollArrow = () => arrowDown.current.scrollIntoView();

  const [shouldShowLogin, setShouldShowLogin] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-2 max-w-6xl mx-auto mt-4 ">
        <a
          className="btn btn-ghost normal-case text-3xl text-rosa mr-auto my-auto"
          onClick={executeScroll}
        >
          kooki
        </a>
        <div className="grid grid-cols-3 ml-auto my-auto gap-4 ">
          <a className="text-xl font-semibold my-auto ml-auto cursor-pointer ">
            {/* About */}
          </a>
          <button
            className="text-xl font-semibold rounded-xl bg-stone-100 p-2 text-center cursor-pointer scroll-smooth"
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
        </div>
      </div>
      <div className="h-screen grid grid-cols-2">
        <div className="m-auto grid grid-rows-2 justify-evenly">
          <div>
            <div className="text-7xl font-semibold">Food Platform</div>
            <div className="text-7xl font-semibold">
              For <span className="underline">Everyone</span>
            </div>
          </div>
          <div className="mt-auto mx-auto">
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
        <div className="rounded-xl bg-stone-100 h-3/5 my-auto p-30 ml-1 mr-8 bg-gradient-to-l from-rosa to-white"></div>
      </div>

      <div className=" grid grid-cols-1 mb-20" ref={arrowDown}>
        <div className="m-auto h-1/2">
          <div className="text-7xl font-semibold">Discover Recipes</div>
        </div>
      </div>
      <div className="h-96 grid grid-cols-2 my-4">
        <div className="m-auto text-7xl font-semibold">Search</div>

        {/* put something cool here */}
        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8"></div>
      </div>
      <div className="h-96 grid grid-cols-2">
        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8"></div>

        <div className="m-auto text-7xl font-semibold">Save</div>
      </div>
      <div className="h-96 grid grid-cols-2 my-4">
        <div className="m-auto text-7xl font-semibold">Start!</div>

        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8"></div>
      </div>
      <div className=" grid grid-row-1 mt-48">
        <div className="mx-auto mb-4">
          <div className="text-7xl font-semibold">
            Technology First Approach to Food
          </div>
        </div>
        <div className="mx-auto">
          <div className="text-4xl font-semibold font-light">
            With a Fully Integrated Suite of Products
          </div>
        </div>
        <div className="mx-auto grid grid-cols-4 h-80 gap-8 mt-8">
          <div className="text-4xl font-semibold font-light rounded-lg bg-stone-100 w-60">
            &nbsp;
          </div>
          <div className="text-4xl font-semibold font-light rounded-lg bg-stone-100">
            &nbsp;
          </div>
          <div className="text-4xl font-semibold font-light rounded-lg bg-stone-100">
            &nbsp;
          </div>
          <div className="text-4xl font-semibold font-light rounded-lg bg-stone-100">
            &nbsp;
          </div>
        </div>
      </div>
      <div className="h-screen grid grid-cols-2 mt-20">
        <div className="m-auto" ref={myRef}>
          <p className="mt-20 mb-20 text-7xl mx-auto font-bold border-4 border-rosa text-rosa rounded-full py-24 px-12 hover:text-white hover:bg-rosa hover:cursor-pointer">
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
              {/* <p className="bg-white rounded-lg mb-4 p-2 w-2/3 mx-auto">
                Google
              </p> */}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  responseGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />

              <p className="bg-white rounded-lg mb-4 p-2 w-2/3 mx-auto">
                Facebook
              </p>
              <p className="text-base font-light">or</p>
              <div className="bg-stone-100 px-2 rounded-xl flex flex-col ">
                {isSuccess && !isLoading && !isError && data?.user ? (
                  <button>
                    <p>Welcome, {data?.user?.email}</p>
                    <p
                      className="mt-1 text-rosa"
                      onClick={() => {
                        router.push("/dashboard");
                      }}
                    >
                      Go to Kooki dashboard
                    </p>
                  </button>
                ) : isLoading ? (
                  <div className="btn loading"></div>
                ) : shouldShowLogin ? (
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

                        const res = await dispatch(
                          login({
                            email: values.email,
                            password: values.password,
                          })
                        );

                        if (res) {
                          router.push("/dashboard");
                        }

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
                      Haven't Signed Up? &nbsp;
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

                        const result = await dispatch(
                          register({
                            email: values.email,
                            password: values.password,
                          })
                        );

                        if (result) {
                          const result2 = await dispatch(
                            login({
                              email: values.email,
                              password: values.password,
                            })
                          );

                          if (result2.status == 200) {
                            dispatch(resetRegistered());
                          }

                          router.push("/dashboard");
                        }
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
              </div>
            </div>
          </div>
        </div>
        {/* <div className="h-10"></div> */}
      </div>
    </div>
  );
}

// <div className="flex flex-col items-center">
//   <p className="mt-20 mb-20 text-7xl mx-auto font-bold border-4 border-rosa text-rosa rounded-full py-24 px-12 hover:text-white hover:bg-rosa hover:cursor-pointer">
//     kooki
//   </p>
// </div>
