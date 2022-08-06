import Footer from "../../components/Footer";

import NavBar from "../../components/NavBar";
import RecipeSidebar from "../../components/RecipeSidebar";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import prisma from "../../utils/prisma";
import SignUpBanner from "../../components/SignUpBanner";
import { Formik, Form, Field } from "formik";

const NewIDPage: NextPage = ({
  data,
  avg_rating,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState(false);

  return (
    <>
      <NavBar />
      <div className="flex flex-col-reverse md:flex-row pb-40">
        {/* left side */}
        <div className="md:w-8/12 mx-8">
          <div className="h-48 md:h-2/5 grid grid-cols-2 gap-2 rounded-xl md:my-8">
            <div className="rounded-xl bg-stone-100 "></div>
            <div className=" gap-2 grid grid-rows-2">
              <div className=" rounded-xl bg-stone-100"></div>
              <div className=" rounded-xl bg-stone-100"></div>
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
              <p className="text-2xl mt-4 font-semibold">Instructions</p>
              <p className="font-light whitespace-pre-line">
                {" "}
                {data?.directions}
              </p>
            </div>
          </div>
          <hr />

          <div className="mb-20">
            <p className="text-2xl mt-4 font-semibold">Comments</p>

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
              <div className="mt-2 ">
                <p>No comments</p>{" "}
              </div>
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
                  className="p-2 ml-4 bg-stone-100 hover:bg-rosa hover:text-white font-semibold rounded-xl"
                  onClick={() => setComment((comment) => !comment)}
                >
                  Comment
                </button>
              )}
            </div>
          </div>
          <br />
        </div>
        {/* right */}
        <div className="md:w-4/12">
          <RecipeSidebar data={data} session={session} />
        </div>
      </div>
      {!session && <SignUpBanner />}
      <div className="my-8">
        <Footer />
      </div>
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
      overallRating: true,
    },
    where: {
      recipeId: parseInt(query.id),
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisRecipe)),
      avg_rating: aggregations?._avg.overallRating,
    },
  };
};

export default NewIDPage;
