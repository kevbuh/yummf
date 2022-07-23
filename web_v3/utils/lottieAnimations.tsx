{
  /* <div className="rounded-xl bg-stone-100 md:mt-20 h-2/5 mx-auto px-30 md:ml-1 md:mr-8 ">
          <Player
            autoplay={true}
            speed={0.1}
            loop={true}
            src="https://assets5.lottiefiles.com/packages/lf20_mutit5qg.json"
            style={{ height: "h-50", width: "500px" }}
          ></Player>
        </div> */
}

{
  /* <Player
            autoplay={true}
            speed={0.2}
            // loop={true}
            src="https://assets3.lottiefiles.com/packages/lf20_3c7ghk3c.json"
            style={{ height: "200px", width: "520px" }}
          ></Player> */
}

{
  /* <Player
            autoplay={true}
            speed={0.2}
            // loop={true}
            src="https://assets8.lottiefiles.com/packages/lf20_yvvq3eqt.json"
            style={{ height: "200px", width: "200px" }}
          ></Player> */
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

//  <div className=" grid grid-row-1 mt-48">
//    <div className="mx-auto mb-4">
//      <div className="text-5xl md:text-7xl font-semibold">
//        Technology First Approach to Food
//      </div>
//    </div>
//    <div className="mx-auto">
//      <div className="text-2xl md:text-3xl font-light mt-2">
//        With a Fully Integrated Suite of Products
//      </div>
//    </div>
//    <div className="mx-auto grid grid-cols-2 md:grid-cols-4 h-80 gap-8 mt-6 w-10/12 ">
//      <div className="text-2xl font-semibold  rounded-lg bg-stone-100">
//        Discover
//      </div>
//      <div className="text-2xl font-semibold  rounded-lg bg-stone-100">
//        Create
//      </div>
//      <div className="text-2xl font-semibold  rounded-lg bg-stone-100">
//        Learn
//      </div>
//      <div className="text-2xl font-semibold  rounded-lg bg-stone-100">
//        Order
//      </div>
//    </div>
//  </div>;

import React from "react";

function lottieAnimations() {
  return <div>lottieAnimations</div>;
}

export default lottieAnimations;
