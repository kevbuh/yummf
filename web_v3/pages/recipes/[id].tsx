import Footer from "../../components/Footer";

import NavBar from "../../components/NavBar";
import RecipeSidebar from "../../components/RecipeSidebar";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import React from "react";
import prisma from "../../utils/prisma";

const test: NextPage = ({
  data,
  avg_rating,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        {/* left side */}
        <div className="w-8/12 mx-8">
          <div className="h-3/5 rounded-xl bg-stone-100 my-8"></div>
          <div className="mb-8">
            <div>
              <p className="text-2xl mt-4 font-semibold">Description</p>
              <p className="font-light">{data?.caption}</p>
            </div>
          </div>
          <hr />
          <div className="mb-8">
            <div>
              <p className="text-2xl mt-4 font-semibold">Ingredients</p>
              <p className="font-light">
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
              </p>
            </div>
          </div>
          <hr />

          <div className="mb-8">
            <div>
              <p className="text-2xl mt-4 font-semibold">Instructions</p>
              <p className="font-light"> {data?.directions}</p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-4/12">
          <RecipeSidebar data={data} />
        </div>
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

export default test;
