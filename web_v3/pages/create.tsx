import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

function CreateRecipePage() {
  // const [image, setImage] = useState(null);
  const router = useRouter();

  const { data: session } = useSession();

  console.log("@@@", session);

  const initialValues = {
    name: "",
    directions: "",
    source_url: "",
    serving: "",
    cook_time: "",
    caption: "",
    featured_image: null,
    userId: session?.userId,

    ingredient_list: [
      {
        ingredient_name: "",
        ingredient_amount: "",
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center my-16 mx-auto min-h-screen">
        <div>
          <p className="text-6xl font-semibold mb-4">Create your own recipe</p>
          <hr />

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: Yup.string().required("Please enter a recipe title!"),
              directions: Yup.string().required("Please enter directions"),
              source_url: Yup.string(),
              serving: Yup.string().required("Please enter serving size!"),
              cook_time: Yup.string().required(
                "Please enter the total cook time"
              ),
              caption: Yup.string().required(
                "Please enter a short description"
              ),
              featured_image: Yup.mixed(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              fetch("/api/create_recipe", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                },
                body: JSON.stringify(values),
              });

              router.push("/confirm-recipe");

              setSubmitting(false);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="flex flex-col ">
                  <div className="my-8">
                    <p className="mt-8 mb-2 font-semibold mx-auto text-xl">
                      Enter an image for this recipe{" "}
                    </p>
                    <input
                      type="file"
                      name="featured_image"
                      className="mb-8 block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 hover:file:bg-pink-600 my-3 hover:file:text-white hover:file:cursor-pointer"
                    />
                  </div>
                  <div className="my-8">
                    <p className="my-2 font-semibold mx-auto text-xl">
                      What&apos;s the recipe name?{" "}
                    </p>
                    <Field
                      name="name"
                      placeholder="Name"
                      className="text bg-stone-100 rounded-xl p-3 w-full mt-1 mb-8"
                    />
                    <ErrorMessage name="name">
                      {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="my-8">
                    <p className="mt-8 mb-2 font-semibold mx-auto text-xl">
                      Give a short caption for the recipe{" "}
                    </p>
                    <Field
                      name="caption"
                      placeholder="Enter caption"
                      className="text bg-stone-100 rounded-xl p-3 w-full mt-1 mb-8"
                    />
                    <ErrorMessage name="caption">
                      {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="my-8">
                    <p className="mt-8 mb-2 font-semibold mx-auto text-xl">
                      Next, enter detailed directions{" "}
                    </p>
                    <Field
                      name="directions"
                      component="textarea"
                      placeholder="Enter directions of this recipe"
                      className="text bg-stone-100 rounded-xl p-3 w-full mt-1 mb-8"
                    />
                    <ErrorMessage name="directions">
                      {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="my-8">
                    <p className="mt-8 mb-2 font-semibold mx-auto text-xl">
                      Did this come from an external source?{" "}
                    </p>
                    <Field
                      name="source_url"
                      placeholder="Add recipe origin"
                      className="text bg-stone-100 rounded-xl p-3 w-full mt-1 mb-8"
                    />
                    <ErrorMessage name="source_url">
                      {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
                  </div>

                  {/* <label htmlFor="serving" className="mt-4 text-xl">
                    Serving
                  </label> */}
                  <div className="my-8">
                    <p className="mt-8 mb-2 font-semibold mx-auto text-xl">
                      How many servings does this create?{" "}
                    </p>
                    <Field
                      name="serving"
                      placeholder="4 people"
                      className="text bg-stone-100 rounded-xl p-3 w-full mt-1 mb-8"
                    />
                    <ErrorMessage name="serving">
                      {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
                  </div>
                  {/* <label htmlFor="cook_time" className="mt-4 text-xl">
                    Cook Time
                  </label> */}

                  <div className="my-8">
                    <p className="mt-8 mb-2 font-semibold mx-auto text-xl">
                      What&apos;s the cook time?{" "}
                    </p>
                    <Field
                      name="cook_time"
                      placeholder="1hr 30mins"
                      className="text bg-stone-100 rounded-xl p-3 w-full mt-1 mb-8"
                    />
                    <ErrorMessage name="cook_time">
                      {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
                  </div>
                  {/* <label htmlFor="ingredients" className="mt-4 text-xl">
                    Ingredients
                  </label> */}

                  <div className="my-8">
                    <p className="mt-8 mb-2 font-semibold mx-auto text-xl">
                      Last step! Enter all the ingredients
                    </p>
                    <FieldArray name="ingredient_list">
                      {({ insert, remove, push }) => (
                        <div className="">
                          {values.ingredient_list.length > 0 &&
                            values.ingredient_list.map(
                              (ingredient_list, index) => (
                                <div key={index}>
                                  <div className="grid grid-cols-3 gap-4 my-4">
                                    <div className="">
                                      <Field
                                        name={`ingredient_list.${index}.ingredient_name`}
                                        placeholder="Ingredient"
                                        type="text"
                                        className="text bg-stone-100 rounded-xl p-3 w-full"
                                      />
                                      <ErrorMessage
                                        name={`ingredient_list.${index}.ingredient_name`}
                                        component=""
                                        className=""
                                      />
                                    </div>
                                    <div className="">
                                      <Field
                                        name={`ingredient_list.${index}.ingredient_amount`}
                                        placeholder="Amount"
                                        className="text bg-stone-100 rounded-xl p-3 w-full"
                                      />
                                      <ErrorMessage
                                        name={`ingredient_list.${index}.ingredient_name`}
                                        component=""
                                        className="f"
                                      />
                                    </div>
                                    <div className="flex flex-row">
                                      <button
                                        type="button"
                                        className="p-2 my-1"
                                        onClick={() => remove(index)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          <button
                            type="button"
                            className="p-2 my-1 rounded-xl bg-stone-100 font-semibold flex flex-row"
                            onClick={() =>
                              push({
                                ingredient_name: "",
                                ingredient_amount: "",
                              })
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            Add Ingredient
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <button
                    type="submit"
                    className="px-2 py-4 font-semibold mx-auto w-1/2 bg-stone-100 mt-16 mb-20 hover:bg-rosa hover:text-white rounded-xl"
                  >
                    Publish
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/signup",

        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}

export default CreateRecipePage;
