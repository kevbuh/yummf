import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import prisma from "../../utils/prisma";
import SignUpBanner from "../../components/SignUpBanner";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  SaveSVG,
  ShareSVG,
  GitHubForkSVG,
  StarSVG,
} from "../../utils/socialSVGs";
import { YumScore } from "../../utils/yum_score";
import { ThumbsDown, ThumbsUp } from "../../utils/icons";

const NewIDPage: NextPage = ({
  data,
  avg_rating,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [showRateInfo, setShowRateInfo] = useState(false);

  const [edit, setEdit] = useState(false);
  const [clickedExpand, setClickedExpand] = useState(false);

  // console.log(
  //   "1",
  //   YumScore(
  //     data.tasteRating,
  //     data.overallRating,
  //     data.qualityRating,
  //     data.ratings.length,
  //     data.numViews,
  //     data.numSaves
  //   )
  // );

  console.log("2", YumScore(5, 5, 5, 1000, 1000000, 1000));

  const RatingModal = () => {
    return (
      <div className="mb-4">
        <Formik
          initialValues={{
            overallRating: undefined,
            qualityRating: undefined,
            tasteRating: undefined,
            userId: session?.userId,
          }}
          validationSchema={Yup.object({
            overallRating: Yup.number()
              .min(1, "Be nice! Give a rating of at least 1 stars")
              .max(5, "Was is really that good? Max of 5 stars :)")
              .required(),
            qualityRating: Yup.number().min(1).max(5).required(),
            tasteRating: Yup.number().min(1).max(5).required(),
          })}
          onSubmit={(values) => {
            try {
              fetch("/api/create_rating", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  recipeId: data.id,
                  values: values,
                }),
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Form className="p-3 flex flex-col ">
            <label htmlFor="value" className="text-black font-semibold">
              &nbsp;
            </label>
            <p className="mb-4 font-semibold text-4xl flex justify-center ">
              Rate Recipe
            </p>

            <Field
              id="overallRating"
              name="overallRating"
              type="number"
              placeholder="Give an overall rating 1-5 stars"
              className="rounded p-2 my-2 bg-stone-100 text-black font-semibold"
            />
            <ErrorMessage name="overallRating">
              {(msg) => <p>{msg}</p>}
            </ErrorMessage>

            <Field
              id="tasteRating"
              name="tasteRating"
              type="number"
              placeholder="Give a taste rating 1-5 stars"
              className="rounded p-2 my-2 bg-stone-100 text-black font-semibold"
            />
            <ErrorMessage name="tasteRating">
              {(msg) => <p>{msg}</p>}
            </ErrorMessage>

            <Field
              id="qualityRating"
              name="qualityRating"
              type="number"
              placeholder="Give a quality rating 1-5 stars"
              className="rounded p-2 my-2 bg-stone-100 text-black font-semibold"
            />
            <ErrorMessage name="presentationRating">
              {(msg) => <p>{msg}</p>}
            </ErrorMessage>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setShowRate((showRate) => !showRate);
                }}
                className="p-2 mt-4 w-full rounded-xl font-semibold "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 mt-4 w-full rounded-xl font-semibold bg-stone-100 hover:bg-rosalight hover:text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  };

  const RatingModalTest = () => {
    return (
      <>
        <label
          htmlFor="my-modal"
          className="ml-auto text-sm text-gray-500 my-auto cursor-pointer"
        >
          Create Rating
        </label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal  bg-smoke-light">
          <div className="modal-box bg-white">
            <RatingModal />
          </div>
        </div>
      </>
    );
  };

  type ComponentProps = {
    data: any;
    session: any;
    edit: any;
  };

  const router = useRouter();

  const SkeletonButton = () => {
    return (
      <div className="h-full w-full rounded-xl bg-stone-100 p-2">&nbsp;</div>
    );
  };

  type RatingProps = {
    category: string;
    rating: number;
  };
  const Rating = ({ category, rating }: RatingProps) => {
    return (
      <dl>
        <dt className="text-sm  text-gray-500 ">{category}</dt>
        <dd className="flex items-center">
          <div className="w-full bg-stone-100 rounded h-2 mr-2">
            <div
              className="bg-black h-2 rounded"
              style={{ width: `${rating * 20}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500 ">{rating}</span>
        </dd>
      </dl>
    );
  };

  const OwnRecipeButtons = () => {
    return (
      <div className="grid grid-cols-2 gap-4 mb-2">
        <button
          className="p-2 bg-stone-100 hover:bg-fresh hover:text-white font-semibold rounded-xl"
          onClick={() => {
            // setEdit(!edit);
          }}
        >
          Edit
        </button>
        <button
          className="p-2 bg-stone-100 hover:bg-red-500 hover:text-white font-semibold rounded-xl"
          onClick={() => {
            fetch(`/api/delete_recipe`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data.id),
            }).catch((error) => console.log("error", error));
            router.push("/explore");
          }}
        >
          Delete
        </button>
      </div>
    );
  };

  const RecipeSidebar = ({ data, session, edit }: ComponentProps) => {
    return (
      <div className="px-6 sm:py-6 mb-8 ">
        {session?.userId == data?.authorId ? (
          <OwnRecipeButtons />
        ) : (
          <div className="mb-4">{/* <p>test</p> */}</div>
        )}

        <p className="text-4xl font-semibold mb-4 ">
          {data?.name.slice(0, 100)}
        </p>

        <Link href="/chef/1">
          <div className="flex flex-row mb-4 cursor-pointer">
            <div className="h-12 w-12 bg-stone-100 rounded-full mr-2"></div>
            <div>
              <p className="text-stone-400 text-sm">Author</p>
              <p className="font-semibold ">{data?.authorId}</p>
            </div>
          </div>
        </Link>
        <hr />
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {data?.likedBy[0]?.email === session?.user?.email ? (
            <p className="mr-auto my-auto flex flex-row text-gray-500">
              Saved!
            </p>
          ) : (
            <button
              className="mr-auto my-auto flex flex-row text-gray-500"
              onClick={() => {
                try {
                  fetch("/api/save_recipe", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      recipeId: data.id,
                      userEmail: session?.user?.email,
                    }),
                  });
                  router.reload();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <SaveSVG />
              <p>{data?.numSaves} Saves</p>
            </button>
          )}

          <div className="dropdown">
            <button
              className="mr-auto my-auto flex flex-row text-gray-500"
              tabIndex={0}
            >
              <ShareSVG />
              Share
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 shadow w-full rounded-box bg-white"
            >
              <li>
                <a className="p-1 text-gray-500">Email</a>
              </li>
              <li>
                <a className="p-1 text-gray-500">Link</a>
              </li>
              <li>
                <a className="p-1 text-gray-500">Pinterest</a>
              </li>
            </ul>
          </div>

          <button
            className="mr-auto my-auto flex flex-row text-gray-500"
            onClick={() => router.push(`fork/${data.id}`)}
          >
            <GitHubForkSVG /> Fork
          </button>

          <div className="dropdown">
            <button
              className="mr-auto my-auto text-gray-500 font-bold"
              tabIndex={0}
            >
              ...
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 shadow w-full rounded-box bg-white"
            >
              <li>
                <Link href="/help">
                  <a className="p-1 text-gray-500">Report</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="my-8">
          <div className="grid grid-cols-2 ">
            <p className="text-xl font-semibold mb-2">Rating</p>

            <button className="text-sm text-gray-500 ml-auto">
              Show all reviews
            </button>
          </div>
          <div className="flex flex-row mb-4">
            <StarSVG />

            <p className="font-semibold text-lg">
              4.88 - {data?.ratings.length > 0 ? data?.ratings.length : "No"}{" "}
              reviews
            </p>
            <button className="ml-auto text-sm text-gray-500 my-auto">
              Create review
            </button>
          </div>
          <Rating category="Taste" rating={4.5} />
          <Rating category="Presentation" rating={3.8} />
          <Rating category="Value" rating={4.8} />
        </div>
        <hr />
        <div className="my-8">
          <p className="text-xl font-semibold mb-4">Time</p>
          <div className="bg-stone-100 rounded-xl p-2 mb-4">
            <p className="text-lg">Total</p>
            <p className="font-semibold text-xl ">
              {data?.cookTime.slice(0, 36)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-100 rounded-xl p-2">
              <p className="text-lg">Prep</p>
              <p className="font-semibold text-xl">25 mins</p>
            </div>
            <div className="bg-stone-100 rounded-xl p-2">
              <p className="text-lg">Cook</p>
              <p className="font-semibold text-xl">40 mins</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-8">
          <p className="text-xl font-semibold mb-4">Serving Size</p>
          <div className="bg-stone-100 rounded-xl p-2 mb-4">
            <p className="text-lg">Servings</p>
            <p className="font-semibold text-xl truncate">
              {data?.servingSize.slice(0, 36)}
            </p>
          </div>
        </div>
        <hr />
        <div className="my-8">
          <p className="text-xl font-semibold mb-4">Tags</p>
          <div>
            <button className="p-2 rounded-xl bg-stone-100 font-medium ">
              Vegetarian
            </button>
            <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
              Fast
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ingredient_list_init: any[] = [];
  const direction_list_init: any[] = [];

  const ingredient_list_1: string = data?.ingredientList;

  const direction_list_1: string = JSON.stringify(data?.directions);

  const initialValues = {
    name: edit ? data.name : "",
    directions: edit ? data.name : "",
    source_url: edit ? data.sourceURL : "",
    serving: edit ? data.servingSize : "",
    cook_time: edit ? data.cookTime : "",
    caption: edit ? data.caption : "",
    featured_image: null,
    authorId: session?.userId,
    id: edit ? data.id : null,

    ingredient_list: ingredient_list_1,

    direction_list: direction_list_1,
  };

  return (
    <>
      <NavBar />

      {edit ? (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required("Please enter a recipe title!"),
            source_url: Yup.string(),
            serving: Yup.string().required("Please enter serving size!"),
            cook_time: Yup.string().required(
              "Please enter the total cook time"
            ),
            caption: Yup.string().required("Please enter a short description"),
            featured_image: Yup.mixed(),
          })}
          onSubmit={(values, { setSubmitting }) => {
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
              <div className="bg-fresh text-white mx-auto rounded-xl flex max-w-xs">
                <p className="my-2 font-semibold m-auto text-xl">Edit Mode</p>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col-reverse md:flex-row">
                  {/* left side */}
                  <div className="md:w-8/12 mx-8 ">
                    <div className="h-fit w-full grid grid-cols-2 gap-2 rounded-xl md:my-8">
                      <div className="h-full w-full rounded-xl bg-stone-100 p-20">
                        &nbsp;
                      </div>

                      <div className="h-full w-full gap-2 grid grid-rows-2">
                        <SkeletonButton />
                        <SkeletonButton />
                      </div>
                    </div>
                    <div className="mb-8">
                      <div>
                        <p className="text-2xl mt-4 font-semibold">
                          Description
                        </p>

                        <Field
                          name="caption"
                          placeholder="Enter caption"
                          className=" border-4 border-rosalight rounded-xl p-3 w-full mt-1 mb-8"
                        />
                        <ErrorMessage name="caption">
                          {(msg) => <p>{msg}</p>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <hr />
                    {/* ingredient edit */}
                    <div className="mb-8">
                      <div>
                        <p className="text-2xl mt-4 font-semibold pr-4">
                          Ingredients
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-4 font-semibold">
                          <p className="">Ingredient</p>
                          <p className="mr-auto">Amount</p>
                        </div>

                        {/* <FieldArray name="ingredient_list">
                          {({ insert, remove, push }) => (
                            <div>
                              {values.ingredient_list.length > 0 &&
                                values.ingredient_list.map(
                                  (ingredient_list: any, index: number) => (
                                    <div key={index}>
                                      <div className="grid grid-cols-3 gap-4 my-4">
                                        <div>
                                          <Field
                                            name={`ingredient_list.${index}.ingredient_name`}
                                            placeholder={
                                              JSON.parse(ingredient_list)
                                                .ingredient_name
                                            }
                                            type="text"
                                            className=" border-4 border-rosalight rounded-xl p-3 w-full"
                                          />
                                          <ErrorMessage
                                            name={`ingredient_list.${index}.ingredient_name`}
                                          />
                                        </div>
                                        <div>
                                          <Field
                                            name={`ingredient_list.${index}.ingredient_amount`}
                                            placeholder={
                                              JSON.parse(ingredient_list)
                                                .ingredient_amount
                                            }
                                            className=" border-4 border-rosalight  rounded-xl p-3 w-full"
                                          />
                                          <ErrorMessage
                                            name={`ingredient_list.${index}.ingredient_name`}
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
                        </FieldArray> */}
                      </div>
                    </div>
                    <hr />

                    {/* direction edit */}
                    <div className="mb-8">
                      <div>
                        <p className="text-2xl mt-4 font-semibold pr-4">
                          Directions
                        </p>

                        <div className=" mt-4 font-semibold">
                          <p className="">Steps</p>
                        </div>

                        {/* <FieldArray name="direction_list">
                          {({ insert, remove, push }) => (
                            <div className="">
                              {values.direction_list.length > 0 &&
                                values.direction_list.map(
                                  (direction_list: any, index: number) => (
                                    <div key={index}>
                                      <div className="flex flex-row my-4 w-full">
                                        <div className="w-full">
                                          <Field
                                            name={`direction_list.${index}.direction_description`}
                                            // placeholder={
                                            //   direction_list[index]
                                            //     .direction_description
                                            // }
                                            type="text"
                                            component="textarea"
                                            className="text border-4 border-rosalight rounded-xl p-3 w-full"
                                          />
                                          <ErrorMessage
                                            name={`direction_list.${index}.direction_description`}
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
                        </FieldArray> */}
                      </div>
                    </div>
                    <hr />

                    <div className="">
                      <p className="text-2xl my-4 font-semibold">Comments</p>

                      <SkeletonButton />
                    </div>

                    <br />
                  </div>

                  {/* right sidebar */}
                  <div className="md:w-4/12 ">
                    {/* big */}
                    <div className="hidden sm:block">
                      <div className="px-6 sm:py-6 mb-8 ">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <button
                            className="p-2 bg-stone-100  font-semibold rounded-xl"
                            onClick={() => setEdit(!edit)}
                          >
                            Cancel
                          </button>
                          <button
                            className="p-2 bg-fresh text-white font-semibold rounded-xl"
                            type="submit"
                          >
                            Save
                          </button>
                        </div>

                        <Field
                          name="name"
                          placeholder="Name"
                          className="text-4xl font-semibold border-4 border-rosalight rounded-xl p-3 w-full mt-1 mb-4"
                        />
                        <ErrorMessage name="name">
                          {(msg) => <p>{msg}</p>}
                        </ErrorMessage>

                        <div className="flex flex-row mb-4 cursor-pointer">
                          <div className="h-12 w-12 bg-stone-100 rounded-full mr-2"></div>
                          <div>
                            <p className="text-stone-400 text-sm">Author</p>
                            <p className="font-semibold ">{data?.authorId}</p>
                          </div>
                        </div>

                        <hr />
                        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                          <SkeletonButton />
                          <SkeletonButton />
                          <SkeletonButton />
                          <SkeletonButton />
                        </div>
                        <hr />
                        <div className="my-8">
                          <div className="grid grid-cols-2 ">
                            <p className="text-xl font-semibold mb-2">Rating</p>

                            <SkeletonButton />
                          </div>
                          <br />

                          <div className="grid grid-cols-2 gap-4 my-2">
                            <SkeletonButton />
                            <SkeletonButton />
                          </div>
                          <br />

                          <SkeletonButton />
                          <br />
                          <SkeletonButton />
                          <br />

                          <SkeletonButton />
                        </div>
                        <hr />
                        <div className="my-8">
                          <p className="text-xl font-semibold mb-4">Time</p>
                          <div className="bg-stone-100 rounded-xl p-2 mb-4">
                            <p className="text-lg">Total</p>

                            <Field
                              name="cook_time"
                              placeholder={data.cookTime}
                              className="font-semibold text-xl bg-stone-100 border-4 border-rosalight rounded-xl p-3 w-full mt-1 mb-8"
                            />
                            <ErrorMessage name="cook_time">
                              {(msg) => <p>{msg}</p>}
                            </ErrorMessage>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-stone-100 rounded-xl p-2">
                              <p className="text-lg">Prep</p>
                              <p className="font-semibold text-xl">25 mins</p>
                            </div>
                            <div className="bg-stone-100 rounded-xl p-2">
                              <p className="text-lg">Cook</p>
                              <p className="font-semibold text-xl">40 mins</p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="my-8">
                          <p className="text-xl font-semibold mb-4">
                            Serving Size
                          </p>
                          <div className="bg-stone-100 rounded-xl p-2 mb-4">
                            <p className="text-lg">Servings</p>

                            <Field
                              name="serving"
                              placeholder="4 people"
                              className="font-semibold text-xl bg-stone-100 border-4 border-rosalight rounded-xl p-3 w-full mt-1 mb-8"
                            />
                            <ErrorMessage name="serving">
                              {(msg) => <p>{msg}</p>}
                            </ErrorMessage>
                          </div>
                        </div>
                        <hr />
                        <div className="my-8">
                          <p className="text-xl font-semibold mb-4">Tags</p>
                          <div>
                            <SkeletonButton />
                            <br />

                            <SkeletonButton />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Footer />
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col-reverse md:flex-row">
            {/* left side */}
            <div className="md:w-8/12 mx-8 ">
              <div className="h-fit w-full grid grid-cols-2 gap-2 rounded-xl md:my-8">
                <div className="h-full w-full rounded-xl bg-stone-100 ">
                  &nbsp;
                </div>
                <div className="h-full w-full gap-2 grid grid-rows-2">
                  <div className="h-full w-full rounded-xl bg-stone-100 p-20">
                    &nbsp;
                  </div>
                  <div className="h-full w-full rounded-xl bg-stone-100">
                    &nbsp;
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div>
                  <p className="text-2xl mt-4 font-semibold">Description</p>
                  <p className="font-light">{data?.caption}</p>
                </div>
              </div>
              <hr />
              <div className="mb-8">
                <div>
                  <p className="text-2xl mt-4 font-semibold pr-4">
                    Ingredients
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4 font-semibold">
                    <p className="">Ingredient</p>
                    <p className="mr-auto">Amount</p>
                  </div>

                  <p className="font-light">
                    {data?.ingredientList?.length > 0
                      ? JSON.parse(JSON.stringify(data.ingredientList)).map(
                          (d: any, index: any) => {
                            return (
                              <div
                                key={index}
                                className="grid grid-cols-2 gap-4 rounded-lg "
                              >
                                <p>{JSON.parse(d).ingredient_name}</p>
                                <p className="mr-auto">
                                  {JSON.parse(d).ingredient_amount}
                                </p>
                              </div>
                            );
                          }
                        )
                      : null}
                  </p>
                </div>
              </div>
              <hr />

              <div className="mb-8">
                <div>
                  <p className="text-2xl mt-4 font-semibold pr-4">Directions</p>

                  <div className=" mt-4 font-semibold">
                    <p className="">Steps</p>
                  </div>

                  <ol className="ml-4 space-y-2">
                    {data?.directions?.length > 0
                      ? JSON.parse(JSON.stringify(data.directions)).map(
                          (d: any, index: any) => {
                            return (
                              <div className="flex flex-col" key={index}>
                                <div className="flex flex-row">
                                  <li className="mr-4 font-bold">{index}.</li>
                                  <li>{JSON.parse(d).direction_description}</li>
                                </div>
                              </div>
                            );
                          }
                        )
                      : null}
                  </ol>
                </div>
              </div>
              <hr />

              <div className="">
                <p className="text-2xl mt-4 font-semibold">Comments</p>

                {data?.comments?.length > 0 ? (
                  <div>
                    {data?.comments.slice(0, 6).map((d: any, index: number) => (
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
                  <div className="mt-2 ">
                    <p>No comments</p>{" "}
                  </div>
                )}
                <div className=" h-full ">
                  {data?.comments.length > 3 && (
                    <p className="mb-4 font-medium text-gray-500 ml-3 cursor-pointer">
                      View all comments
                    </p>
                  )}
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
                      className="p-2 mt-2 bg-stone-100 hover:bg-rosa hover:text-white font-semibold rounded-xl"
                      onClick={() => setComment((comment) => !comment)}
                    >
                      Comment
                    </button>
                  )}
                </div>
              </div>

              <br />
            </div>
            {/* right sidebar */}
            <div className="md:w-4/12 ">
              {/* big */}
              <div className="hidden sm:block">
                <div className="px-6 sm:py-6 mb-8 ">
                  {session?.userId == data?.authorId && <OwnRecipeButtons />}

                  <p className="text-4xl font-semibold mb-4 ">
                    {data?.name.slice(0, 100)}
                  </p>

                  <Link href="/chef/1">
                    <div className="flex flex-row mb-4 cursor-pointer">
                      <div className="h-12 w-12 bg-stone-100 rounded-full mr-2"></div>
                      <div>
                        <p className="text-stone-400 text-sm">Author</p>
                        <p className="font-semibold ">{data?.authorId}</p>
                      </div>
                    </div>
                  </Link>
                  <hr />
                  <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                    {data?.likedBy[0]?.email === session?.user?.email ? (
                      <p className="mr-auto my-auto flex flex-row text-gray-500">
                        Saved!
                      </p>
                    ) : (
                      <button
                        className="mr-auto my-auto flex flex-row text-gray-500"
                        onClick={() => {
                          try {
                            fetch("/api/save_recipe", {
                              method: "POST",
                              headers: {
                                Accept: "application/json",
                              },
                              body: JSON.stringify({
                                recipeId: data.id,
                                userEmail: session?.user?.email,
                              }),
                            });
                            router.reload();
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        <SaveSVG />
                        <p>{data?.numSaves} Saves</p>
                      </button>
                    )}

                    <div className="dropdown">
                      <button
                        className="mr-auto my-auto flex flex-row text-gray-500"
                        tabIndex={0}
                      >
                        <ShareSVG />
                        Share
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-3 shadow w-full rounded-box bg-white"
                      >
                        <li>
                          <a className="p-1 text-gray-500">Email</a>
                        </li>
                        <li>
                          <a className="p-1 text-gray-500">Link</a>
                        </li>
                        <li>
                          <a className="p-1 text-gray-500">Pinterest</a>
                        </li>
                      </ul>
                    </div>

                    <button
                      className="mr-auto my-auto flex flex-row text-gray-500"
                      onClick={() => router.push(`fork/${data.id}`)}
                    >
                      <GitHubForkSVG /> Fork
                    </button>

                    <div className="dropdown">
                      <button
                        className="mr-auto my-auto text-gray-500 font-bold"
                        tabIndex={0}
                      >
                        ...
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-3 shadow w-full rounded-box bg-white"
                      >
                        <li>
                          <Link href="/help">
                            <a className="p-1 text-gray-500">Report</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr />
                  <div className="my-8">
                    <div className="flex flex-row">
                      <div className="flex flex-row mb-4 w-3/5">
                        <p className="font-semibold text-3xl">
                          <span className="flex flex-row text-fresh">
                            {data.ratings
                              ? YumScore(
                                  data.tasteRating,
                                  data.overallRating,
                                  data.qualityRating,
                                  data.ratings.length,
                                  data.numViews,
                                  data.numSaves
                                )
                              : "No"}
                          </span>
                        </p>
                        <p className="text-3xl font-semibold ">
                          &nbsp;&nbsp;Yum Score
                        </p>
                      </div>
                      <div className="w-2/5 grid grid-cols-2 gap-4 mx-auto">
                        {/* <p>thumbs up</p> */}
                        <ThumbsUp />
                        <ThumbsDown />
                        {/* <p>thumbs down</p> */}
                      </div>
                    </div>
                    <div className="mb-2 grid grid-cols-3 text-lg">
                      <div>
                        {session?.userId !== data?.authorId && (
                          <RatingModalTest />
                        )}
                      </div>
                      <button
                        className="text-sm text-gray-500 mx-auto"
                        onClick={() => setShowRateInfo(!showRateInfo)}
                      >
                        Show Info
                      </button>
                      <button className="text-sm text-gray-500 ml-auto">
                        All reviews
                      </button>
                    </div>

                    {showRateInfo && (
                      <>
                        <div className="flex flex-row w-full my-auto">
                          <p className="flex flex-row my-auto">
                            {" "}
                            {data?.overallRating > 0 && data?.ratings
                              ? String(
                                  data.overallRating / data.ratings.length
                                ).slice(0, 3)
                              : "0"}
                            <StarSVG />
                            ,&nbsp;&nbsp;
                            {data?.ratings.length > 0
                              ? data.ratings.length
                              : "No "}
                            &nbsp; Ratings
                          </p>
                        </div>

                        <Rating
                          category="Overall"
                          rating={
                            data?.ratings?.length > 0
                              ? parseInt(
                                  String(
                                    data.overallRating / data.ratings?.length
                                  ).slice(0, 3)
                                )
                              : 0
                          }
                        />
                        <Rating
                          category="Quality"
                          rating={
                            data?.ratings?.length > 0
                              ? parseInt(
                                  String(
                                    data.qualityRating / data.ratings?.length
                                  ).slice(0, 3)
                                )
                              : 0
                          }
                        />
                        <Rating
                          category="Taste"
                          rating={
                            data?.ratings?.length > 0
                              ? parseInt(
                                  String(
                                    data.tasteRating / data.ratings?.length
                                  ).slice(0, 3)
                                )
                              : 0
                          }
                        />
                      </>
                    )}
                  </div>

                  <hr />
                  <div className="my-8">
                    <p className="text-xl font-semibold mb-4">Time</p>
                    <div className="bg-stone-100 rounded-xl p-2 mb-4">
                      <p className="text-lg">Total</p>
                      <p className="font-semibold text-xl ">
                        {data?.cookTime.slice(0, 36)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-stone-100 rounded-xl p-2">
                        <p className="text-lg">Prep</p>
                        <p className="font-semibold text-xl">25 mins</p>
                      </div>
                      <div className="bg-stone-100 rounded-xl p-2">
                        <p className="text-lg">Cook</p>
                        <p className="font-semibold text-xl">40 mins</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="my-8">
                    <p className="text-xl font-semibold mb-4">Serving Size</p>
                    <div className="bg-stone-100 rounded-xl p-2 mb-4">
                      <p className="text-lg">Servings</p>
                      <p className="font-semibold text-xl truncate">
                        {data?.servingSize.slice(0, 36)}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="my-8">
                    <p className="text-xl font-semibold mb-4">Tags</p>
                    <div>
                      <button className="p-2 rounded-xl bg-stone-100 font-medium ">
                        Vegetarian
                      </button>
                      <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
                        Fast
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile */}
              <div className="sm:hidden">
                <div className="px-6 my-4">
                  <button
                    onClick={() => setClickedExpand(!clickedExpand)}
                    className="font-semibold p-2 bg-stone-100 w-full rounded-xl"
                  >
                    <p className="mx-auto">
                      {clickedExpand ? "Less Info" : "More Info"}
                    </p>
                  </button>
                </div>
                {clickedExpand ? (
                  <RecipeSidebar data={data} session={session} edit={edit} />
                ) : null}
              </div>
            </div>
          </div>

          {!session && <SignUpBanner />}
          <Footer />
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  // uncomment to track number of views
  // const updatePosts = await prisma?.recipe.update({
  //   where: {
  //     id: parseInt(query.id),
  //   },
  //   data: {
  //     numViews: {
  //       increment: 1,
  //     },
  //   },
  // });

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

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisRecipe)),
    },
  };
};

export default NewIDPage;
