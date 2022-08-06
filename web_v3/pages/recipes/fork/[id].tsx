import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import React from "react";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import RecipeSidebar from "../../../components/RecipeSidebar";
import prisma from "../../../utils/prisma";

const Fork: NextPage = ({
  data,
  avg_rating,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center my-16 max-w-2xl mx-auto ">
        <p className="text-2xl font-medium">
          Create a new fork for:{" "}
          <span className="font-2xl italic font-light ">
            {data.name.slice(0, 10)}
          </span>
        </p>
        <div>
          <p className="mt-8 mb-2 mr-auto font-semibold">
            What does fork mean?
          </p>
          <p className="font-light">
            According to github.com, "A fork is a copy of a (recipe). Forking a
            (recipe) allows you to freely experiment with changes without
            affecting the original (recipe)".{" "}
          </p>
          <p className=" font-semibold mt-8">
            This will allow you to freely experiment with this recipe, and add
            your own touches to it.
          </p>
        </div>
        <button className="rounded-xl bg-fresh text-white font-semibold p-2 max-w-xs my-12">
          <a>Create Fork</a>
        </button>
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

export default Fork;
