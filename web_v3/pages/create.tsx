import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../utils/prisma";
import { InferGetServerSidePropsType } from "next";

function CreateRecipePage({
  data,
  edit,
  yee,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const initialValues = {
    name: edit ? data.name : "",
    directions: edit ? data.name : "",
    source_url: edit ? data.name : "",
    serving: edit ? data.name : "",
    cook_time: edit ? data.name : "",
    caption: edit ? data.name : "",
    featured_image: null,
    authorId: yee,
    id: edit ? data.id : null,

    ingredient_list: [
      {
        ingredient_name: "",
        ingredient_amount: "",
      },
    ],

    direction_list: [
      {
        direction_description: "",
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center my-16 mx-auto min-h-screen">
        <div>
          <p className="text-6xl font-semibold mb-4">Create your own recipe</p>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: Yup.string().required("Please enter a recipe title!"),
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
            onSubmit={async (values, { setSubmitting }) => {
              if (edit) {
                fetch("/api/update_recipe", {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                  },
                  body: JSON.stringify(values),
                });

                router.reload();

                setSubmitting(false);
              } else {
                const apiRes = await fetch("/api/create_recipe", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                  },
                  body: JSON.stringify(values),
                });

                const data = await apiRes.json();

                router.push(`/confirm-recipe?type=${data.data}`);
                setSubmitting(false);
              }
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
                    <FieldArray name="direction_list">
                      {({ insert, remove, push }) => (
                        <div className="">
                          {values.direction_list.length > 0 &&
                            values.direction_list.map(
                              (direction_list, index) => (
                                <div key={index}>
                                  <div className="flex flex-row my-4 w-full">
                                    <div className="w-full">
                                      <Field
                                        name={`direction_list.${index}.direction_description`}
                                        placeholder={`Step ${index + 1}`}
                                        type="text"
                                        component="textarea"
                                        className="text bg-stone-100 rounded-xl p-3 w-full"
                                      />
                                      <ErrorMessage
                                        name={`direction_list.${index}.direction_description`}
                                        component=""
                                        className=""
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
                                direction_description: "",
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
                            Add Step
                          </button>
                        </div>
                      )}
                    </FieldArray>
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
  const { query, req, res } = context;

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/signup",

        permanent: false,
      },
    };
  }

  let edit = false;
  let thisRecipe = null;

  if (query.edit) {
    edit = true;
    thisRecipe = await prisma?.recipe.findUnique({
      where: {
        id: parseInt(query.edit),
      },
      include: {
        comments: true,
        ratings: true,
        likedBy: true,
      },
    });
  }

  return {
    props: {
      yee: session.userId,
      edit: edit,
      data: JSON.parse(JSON.stringify(thisRecipe)),
    },
  };
}

export default CreateRecipePage;
