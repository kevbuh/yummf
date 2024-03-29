import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import prisma from "../../utils/prisma";
import SignUpBanner from "../../components/SignUpBanner";
import Link from "next/link";
import RecipeCard from "../../components/RecipeCard";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";

const Chef = ({
  data,
  createdPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const [created, setCreated] = useState(true);
  const [liked, setLiked] = useState(false);

  const router = useRouter();

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
            <p className="text-4xl font-semibold">
              {data?.displayName !== null
                ? (data?.displayName as string)
                : data?.name}
            </p>
            <p className="text-lg font-medium text-gray-500 ">{data?.name}</p>
            {session?.userId !== data?.userId && (
              <button className="p-1 bg-rosa text-white font-semibold rounded mt-auto">
                Follow
              </button>
            )}
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
            {/* <p
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
            </p> */}
          </div>

          {/* {liked && (
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
          )} */}

          {created && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {createdPosts?.map((d: any, index: number) => {
                return (
                  <RecipeCard
                    key={index}
                    image_url={d.image_url}
                    name={d.name.slice(0, 36)}
                    caption={d.caption.slice(0, 42)}
                    id={d.id}
                    qualityRating={d.qualityRating}
                    tasteRating={d.tasteRating}
                    overallRating={d.overallRating}
                    numSaves={d.numSaves}
                    numViews={d.numViews}
                    ratingsLength={d.ratings.length > 0 ? d.ratings.length : 0}
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

  const result = await prisma?.recipe.findMany({
    where: {
      authorId: thisUser?.id,
    },
    include: {
      ratings: true,
    },
  });

  return {
    props: {
      createdPosts: JSON.parse(JSON.stringify(result)),
      data: JSON.parse(JSON.stringify(thisUser)),
    },
  };
}

export default Chef;
