import Head from "next/head";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import MoreLikeThis from "../../components/moreLikeThis";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import React from "react";
import prisma from "../../utils/prisma";

const SelectRecipePage: NextPage = ({
  data,
  avg_rating,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showRate, setShowRate] = useState(false);
  const [comment, setComment] = useState(false);
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const router = useRouter();

  const initialValues = {
    name: data.name,
    directions: data.directions,
    source_url: data.sourceURL,
    serving: data.servingSize,
    cook_time: data.cookTime,
    caption: data.caption,
    featured_image: null,
    id: data.id,
    authorId: session?.userId,

    ingredient_list: [
      {
        ingredient_name: "",
        ingredient_amount: "",
      },
    ],
  };

  const getStars = (num_stars: number) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return steps;
  };

  return (
    <>
      <Head>
        <title>{data?.name} | Kooki </title>
        <meta name="description" content={data?.caption} key="desc" />
      </Head>
      <NavBar />

      <div className="mt-20 rounded-lg md:w-2/3 item-center mx-4 md:mx-auto">
        {showEdit ? (
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
              // console.log("formik values:", values);

              fetch("/api/update_recipe", {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                },
                body: JSON.stringify(values),
              });

              router.reload();

              setSubmitting(false);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="flex flex-col ">
                  <input
                    type="file"
                    name="featured_image"
                    className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 hover:file:bg-pink-600 my-3 hover:file:text-white hover:file:cursor-pointer"
                  />
                  <Field
                    name="name"
                    placeholder="Title"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <Field
                    name="caption"
                    placeholder="Enter caption"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="caption">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <Field
                    name="directions"
                    component="textarea"
                    placeholder="Enter directions of this recipe"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="directions">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <Field
                    name="source_url"
                    placeholder="Add recipe origin"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="source_url">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <label htmlFor="serving" className="mt-4 text-xl">
                    Serving
                  </label>
                  <Field
                    name="serving"
                    placeholder="4 people"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="serving">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <label htmlFor="cook_time" className="mt-4 text-xl">
                    Cook Time
                  </label>
                  <Field
                    name="cook_time"
                    placeholder="1hr 30mins"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="cook_time">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <label htmlFor="ingredients" className="mt-4 text-xl">
                    Ingredients
                  </label>
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
                                      className="text bg-stone-100 rounded p-3 w-full"
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
                                      className="text bg-stone-100 rounded p-3 w-full"
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
                          className="p-2 my-1 rounded bg-stone-100"
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
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      className="p-2 mx-auto w-full bg-stone-100 mt-4 mb-20 rounded-lg"
                      onClick={() => setShowEdit((showEdit) => !showEdit)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="p-2 mx-auto w-full  mt-4 mb-20 bg-rosa text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <div className="">
              <div className="flex flex-col-reverse lg:flex-row justify-between align-top">
                <div className="my-auto h-full">
                  <div className="lg: mt-4">
                    <h1 className="text-5xl font-light mb-1">{data?.name}</h1>
                  </div>
                  <div className="mb-4">
                    <p
                      className="
                text-stone-400 text-sm"
                    >
                      {data?.caption}
                    </p>
                    <p
                      className="
                text-stone-400 text-sm font-light mt-1"
                    >
                      Recipe #{data?.id} submitted by{" "}
                      <span className="underline ">
                        Author {data?.authorId}
                      </span>
                      .
                      <span className="underline">
                        {" "}
                        {data?.url !== "undefined" ? data?.url : null}
                      </span>
                    </p>
                  </div>
                  <hr />
                  <div className="">
                    {/* {data?.category.map((d) => (
                      <div>
                        <button className="border-stone-100 mx-2 border-2 rounded-2xl py-1 px-5 ">
                          {d.name}
                        </button>
                      </div>
                    ))} */}

                    {/* <button className="border-stone-100 mx-2 border-2 rounded-2xl py-1 px-5 ">
                      {data?.num_views} views
                    </button> */}
                  </div>
                  <div className="flex flex-col my-5">
                    <div className=" flex flex-row items-center">
                      <p className="text-2xl mr-1">Time </p>
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className=" text-lg">
                      <p>{data?.cook_time ? data.cook_time : "N/A time"}</p>
                    </div>
                    <div className="stat-desc">Community Average</div>
                  </div>
                  <hr />
                  <div className="my-5">
                    <p className="text-2xl mr-1">Rating </p>
                    <div className=" text-lg flex flex-row">
                      <p>
                        {avg_rating ? avg_rating.toFixed(2) : "No Rating!"}{" "}
                      </p>
                      <p className="flex flex-row my-auto">
                        {getStars(avg_rating)}
                      </p>
                    </div>

                    <div className="font-light text-stone-400">
                      <div>
                        <>
                          {session?.userId == data?.authorId ? (
                            <div className="">
                              <button
                                className="bg-stone-100 p-2 mr-2 rounded font-semibold"
                                onClick={() =>
                                  setShowEdit((showEdit) => !showEdit)
                                }
                              >
                                Edit Recipe
                              </button>
                              <button
                                className="bg-red-500 p-2 rounded text-white font-semibold"
                                onClick={() => {
                                  fetch(`/api/delete_recipe`, {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(data.id),
                                  }).catch((error) =>
                                    console.log("error", error)
                                  );
                                  router.push("/");
                                }}
                              >
                                Delete Recipe
                              </button>
                            </div>
                          ) : (
                            <>
                              {showRate ? (
                                <div className="mb-4">
                                  <Formik
                                    initialValues={{
                                      value: 5,
                                    }}
                                    validationSchema={Yup.object({
                                      value: Yup.number()
                                        .min(1, "Be nice!")
                                        .max(5, "Was is really that good?")
                                        .required(),
                                    })}
                                    onSubmit={async (
                                      values,
                                      { setSubmitting }
                                    ) => {
                                      const res = await fetch(
                                        "/api/create_rating",
                                        {
                                          method: "POST",
                                          headers: {
                                            Accept: "application/json",
                                          },
                                          body: JSON.stringify({
                                            recipeId: data.id,
                                            values: values,
                                            userEmail: session?.user?.email,
                                          }),
                                        }
                                      );

                                      setSubmitting(false);
                                    }}
                                  >
                                    <Form className="p-3 flex flex-col rounded bg-stone-100 mt-6 mx-2">
                                      <label htmlFor="value" className="">
                                        Rate this recipe:
                                      </label>
                                      <Field
                                        id="value"
                                        name="value"
                                        type="number"
                                        placeholder="Give a rating 1-5 stars"
                                        className="rounded p-2 my-2 "
                                      />
                                      <ErrorMessage name="value">
                                        {(msg) => <p>{msg}</p>}
                                      </ErrorMessage>

                                      <div className="flex flex-row justify-between pr-1">
                                        <button
                                          className="font-semibold "
                                          onClick={() =>
                                            setShowRate((showRate) => !showRate)
                                          }
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className=" font-semibold"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </Form>
                                  </Formik>
                                </div>
                              ) : (
                                <button
                                  className=" "
                                  onClick={() =>
                                    setShowRate((showRate) => !showRate)
                                  }
                                >
                                  Rate this recipe
                                </button>
                              )}
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="flex flex-col my-5">
                    <p className="text-2xl mr-1">Cost </p>
                    <div className=" text-lg">$$$</div>

                    {/* <div className=" text-lg">{data?.price}</div> */}
                    <div className="stat-desc">Estimated Ingredient Cost</div>
                  </div>

                  <div>
                    {data?.numSaves} Saves
                    {/* ({data?.reviews.length}) */}
                    {/* Reviews */}
                  </div>
                  <div className="flex flex-row w-40 justify-center border rounded-lg py-2">
                    <button
                      className={liked ? "bg-pink-600 text-black rounded" : ""}
                      onClick={async () => {
                        const res = await fetch("/api/save_recipe", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                          },
                          body: JSON.stringify({
                            recipeId: data.id,
                            userEmail: session?.user?.email,
                          }),
                        });
                        setLiked((liked) => !liked);
                      }}
                    >
                      {data?.likedBy[0]?.email === session?.user?.email ? (
                        <p>Saved!</p>
                      ) : (
                        <>
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
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="lg:w-3/5">
                  {
                    // !isLoading && data && !isError && isSuccess
                    null ? (
                      <div>
                        {/* <Image
                      // className="rounded-3xl shadow p-2"
                      loader={() =>
                        API_URL + data.featured_image?.url.split("?")[0]
                      }
                      src={API_URL + data.featured_image?.url.split("?")[0]}
                      unoptimized={true}
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      priority="true"
                      quality={50}
                    /> */}
                      </div>
                    ) : (
                      <div className="bg-stone-100 h-full rounded"></div>
                    )
                  }
                </div>
              </div>
            </div>

            <br />
            <br />
            <hr />
            <br />
            <br />

            <div>
              {data?.private ? (
                <>
                  <p className="text-xl">Private Recipe </p>
                  <div className="text-xs mt-1">Created {data?.created_at}</div>
                </>
              ) : null}
              <div className="text-2xl mt-6 mb-4 w-full">Ingredients</div>
              <div className="w-1/2">
                <div className=" w-full grid grid-cols-2 mb-2">
                  <p className=" p-1  mr-auto font-lg">Ingredient</p>
                  <p className=" p-1  mr-auto font-lg">Amount</p>
                </div>

                <div className="font-light">
                  {data?.ingredientList?.length > 0
                    ? JSON.parse(JSON.stringify(data.ingredientList)).map(
                        (d: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className="grid grid-cols-2 p-2 rounded-lg my-2"
                            >
                              <p>{JSON.parse(d).ingredient_name}</p>
                              <p>{JSON.parse(d).ingredient_amount}</p>
                            </div>
                          );
                        }
                      )
                    : null}
                </div>
              </div>

              <br />
              <br />
              <hr />
              <br />
              <br />

              <p className="text-2xl mt-6">Directions</p>

              <div className="mb-4  my-2  w-full">
                <p className="font-light whitespace-pre-line">
                  {data?.directions}
                </p>
              </div>
            </div>

            <br />
            <br />
            <hr />
            <br />
            <br />

            <div className="text-2xl w-full">Reviews</div>
            <div className="mb-4  my-2 border rounded p-3 shadow-sm w-full">
              {data?.comments?.length > 0 ? (
                <div>
                  {data?.comments.map((d: any, index: number) => (
                    <div className="my-2 p-3 flex flex-row" key={index}>
                      <div className="avatar">
                        <div className="w-12 rounded-full mr-4 bg-stone-100"></div>
                      </div>
                      <div className="my-auto">
                        <p>{d?.text}</p>
                        <p className="text-sm text-stone-400">
                          {d.createdAt.slice(5, 7)}/{d.createdAt.slice(2, 4)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2">No Comments</div>
              )}
              <div>
                {comment ? (
                  <div className="mt-2">
                    <Formik
                      initialValues={{
                        text: "",
                      }}
                      onSubmit={async (values) => {
                        const res = await fetch("/api/create_comment", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                          },
                          body: JSON.stringify({
                            recipeId: data.id,
                            values: values,
                            userEmail: session?.user?.email,
                          }),
                        });
                      }}
                    >
                      <Form className="p-3 flex flex-col">
                        <Field
                          id="text"
                          name="text"
                          placeholder="Comment..."
                          className="bg-stone-100 rounded p-2 my-2"
                        />

                        <div className="flex flex-row items-end ">
                          <button
                            className=" p-2 mr-3 my-2 rounded  font-semibold "
                            onClick={() => setComment((comment) => !comment)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-rosa p-2 my-2 rounded text-white font-semibold "
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                ) : (
                  <button
                    className="p-2 font-semibold "
                    onClick={() => setComment((comment) => !comment)}
                  >
                    Comment
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <br />
        <br />
        <hr />
        <br />
        <br />
        <MoreLikeThis />

        <div className="h-40"></div>
      </div>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  const thisRecipe = await prisma?.recipe.findUnique({
    where: {
      id: parseInt(query.id),
    },
    include: {
      comments: true,
      ratings: true,
      likedBy: true,
    },
  });

  const aggregations = await prisma?.rating.aggregate({
    _avg: {
      value: true,
    },
    where: {
      recipeId: parseInt(query.id),
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisRecipe)),
      avg_rating: aggregations?._avg.value,
    },
  };
};

export default SelectRecipePage;
