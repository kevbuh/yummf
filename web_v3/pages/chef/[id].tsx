import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import prisma from "../../utils/prisma";
import SignUpBanner from "../../components/SignUpBanner";
import Link from "next/link";
import RecipeCard from "../../components/RecipeCard";
import { Formik, Form, Field, ErrorMessage } from "formik";
import router from "next/router";

const Chef = ({
  data,
  createdPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const [created, setCreated] = useState(true);
  const [liked, setLiked] = useState(false);

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/explore">
                <a>Explore</a>
              </Link>
            </li>
            <li>
              <p>Chefs</p>
            </li>
          </ul>
        </div>
        <div className="avatar mt-4 mb-8">
          <div className="w-28 rounded-full mr-8">
            <img src={data?.image as string} alt="User profile image" />
          </div>
          <span className="flex flex-col">
            {data?.displayName == null && (
              <>
                <label
                  htmlFor="my-modal-5"
                  className="block py-4 px-2 mx-auto text-sm text-black rounded-xl bg-stone-100"
                >
                  {/* open modal */}
                  Choose a name you like....
                </label>

                {/* actual */}
                <input
                  type="checkbox"
                  id="my-modal-5"
                  className="modal-toggle t"
                />
                <label
                  htmlFor="my-modal-5"
                  className="modal cursor-pointer bg-smoke-light"
                >
                  <label
                    className="modal-box relative py-8 border bg-white md:w-full "
                    htmlFor=""
                  >
                    <p className="mb-4 font-semibold text-4xl flex justify-center ">
                      Welcome to Yummf
                    </p>
                    <Formik
                      initialValues={{
                        displayName: "",
                        authorId: session?.userId,
                      }}
                      onSubmit={async (values) => {
                        console.log("er");
                        const apiRes: any = await fetch(
                          "/api/update_displayname",
                          {
                            method: "PUT",
                            headers: {
                              Accept: "application/json",
                            },
                            body: JSON.stringify({
                              values: values,
                              userEmail: session?.user?.email,
                            }),
                          }
                        );

                        const response = await apiRes.json();

                        if (response.data == 201) {
                          router.reload();
                        } else {
                          console.log("failed to update username");
                        }
                      }}
                    >
                      <Form className=" mt-8">
                        <Field
                          id="displayName"
                          name="displayName"
                          placeholder="Choose a username..."
                          className="block p-4 mx-auto placeholder-gray-400 text-lg rounded-xl border-stone-100 border-4  "
                        />
                        <ErrorMessage name="displayName" />

                        <button
                          className="p-3 mt-8 w-full rounded-xl font-semibold bg-stone-100 hover:bg-rosalight hover:text-white"
                          type="submit"
                        >
                          <p className="m-auto">Next</p>
                        </button>
                      </Form>
                    </Formik>
                  </label>
                </label>
              </>
            )}

            <p className="text-4xl font-semibold">
              {data?.displayName !== null
                ? (data?.displayName as string)
                : data?.name}
            </p>
            <p className="text-lg font-medium text-gray-500 ">{data?.name}</p>
            <button className="p-1 bg-rosa text-white font-semibold rounded mt-auto">
              Follow
            </button>
          </span>
        </div>
        <div className=" grid grid-cols-3 gap-4 md:w-3/5">
          {" "}
          <p className="text-lg  text-gray-500 ">
            <span className="font-bold">
              {createdPosts.length > 0 ? createdPosts.length : 0}
            </span>{" "}
            Recipes
          </p>
          <p className="text-lg  text-gray-500 ">
            <span className="font-bold">12</span> Helps
          </p>
          <p className="text-lg  text-gray-500 ">
            <span className="font-bold">1,023,703</span> Views
          </p>
        </div>
        <p className="text-lg mt-6">
          {data?.description !== null
            ? (data?.description as string)
            : "Shout out to my restaurant El Taco Tote and Snooze."}
        </p>
        <div>
          <div className="grid grid-cols-2 mt-8 mb-4">
            <p
              className={
                created
                  ? "text-xl font-semibold mx-2 py-4 underline cursor-pointer"
                  : "text-xl font-semibold mx-2 py-4 text-gray-500 cursor-pointer"
              }
              onClick={() => {
                setCreated(true);
                setLiked(false);
              }}
            >
              Created Recipes
            </p>
            <p
              className={
                liked
                  ? "text-xl font-semibold mx-2 py-4 underline cursor-pointer"
                  : "text-xl font-semibold mx-2 py-4 text-gray-500 cursor-pointer"
              }
              onClick={() => {
                setLiked(true);
                setCreated(false);
              }}
            >
              Saved Posts
            </p>
          </div>

          {liked && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {data?.savedRecipes?.map((d: any, index: number) => {
                return (
                  <RecipeCard
                    key={index}
                    name={d.name.slice(0, 36)}
                    caption={d.caption.slice(0, 42)}
                    id={d.id}
                    qualityRating={d.qualityRating}
                    tasteRating={d.tasteRating}
                    overallRating={d.overallRating}
                    numSaves={d.numSaves}
                    numViews={d.numViews}
                    ratingsLength={d.ratings?.length}
                    authorName={d.authorDisplayName}
                  />
                );
              })}
            </div>
          )}

          {created && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {createdPosts?.map((d: any, index: number) => {
                return (
                  <RecipeCard
                    key={index}
                    name={d.name.slice(0, 36)}
                    caption={d.caption.slice(0, 42)}
                    id={d.id}
                    qualityRating={d.qualityRating}
                    tasteRating={d.tasteRating}
                    overallRating={d.overallRating}
                    numSaves={d.numSaves}
                    numViews={d.numViews}
                    ratingsLength={d.ratings?.length}
                    authorName={d.authorDisplayName}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {!session && <SignUpBanner />}
      <Footer />
    </>
  );
};

export async function getServerSideProps({ query }: any) {
  const thisUser = await prisma?.user.findUnique({
    where: {
      id: query.id,
    },
  });

  // console.log(savedRecipes);

  const result = prisma
    ? await prisma.$queryRaw`SELECT * FROM "Recipe" WHERE "authorId"=${thisUser?.id};`
    : null;

  return {
    props: {
      createdPosts: JSON.parse(JSON.stringify(result)),
      data: JSON.parse(JSON.stringify(thisUser)),
    },
  };
}

export default Chef;
