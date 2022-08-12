import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
// import RecipeSidebar from "../../components/RecipeSidebar";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import prisma from "../../utils/prisma";
import SignUpBanner from "../../components/SignUpBanner";
import { MiniNormalBoldArrow, NormalBoldArrow } from "../../utils/arrows";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  SaveSVG,
  ShareSVG,
  GitHubForkSVG,
  StarSVG,
} from "../../utils/socialSVGs";

const NewIDPage: NextPage = ({
  data,
  avg_rating,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);
  const [clickedExpand, setClickedExpand] = useState(false);

  type ComponentProps = {
    data: any;
    session: any;
    edit: any;
  };

  const RecipeSidebar = ({ data, session, edit }: ComponentProps) => {
    type RatingProps = {
      category: string;
      rating: number;
    };

    const router = useRouter();

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
              // router.push(`/create?edit=${data.id}`);
              setEdit(!edit);
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

    return (
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
    <>
      <NavBar />

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
                <p className="text-2xl mt-4 font-semibold pr-4">Ingredients</p>

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
                              <MiniNormalBoldArrow />
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
                {data.comments.length > 3 && (
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
            <p>{edit ? "true" : "false"} test</p>
            {/* big */}
            <div className="hidden sm:block">
              <RecipeSidebar data={data} session={session} edit={edit} />
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

        {session && <SignUpBanner />}
        <Footer />
      </div>
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

  // const aggregations = await prisma?.rating.aggregate({
  //   _avg: {
  //     overallRating: true,
  //   },
  //   where: {
  //     recipeId: parseInt(query.id),
  //   },
  // });

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisRecipe)),
      // avg_rating: aggregations?._avg.overallRating,
    },
  };
};

export default NewIDPage;
