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
          <div className="h-2/5 grid grid-cols-2 gap-2 rounded-xl  my-8">
            <div className=" rounded-xl bg-stone-100"></div>
            <div className="gap-2 grid grid-rows-2">
              <div className="rounded-xl bg-stone-100"></div>
              <div className="rounded-xl bg-stone-100"></div>
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
              <p className="text-2xl mt-4 font-semibold">Ingredients</p>
              <div className="grid grid-cols-2 mt-4 font-semibold">
                <p className="">Ingredient</p>
                <p className=" mr-auto">Amount</p>
              </div>

              <p className="font-light">
                {data?.ingredientList?.length > 0
                  ? JSON.parse(JSON.stringify(data.ingredientList)).map(
                      (d: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="grid grid-cols-2 rounded-lg "
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
              <p className="font-light"> {data?.directions}</p>
            </div>
          </div>
          <hr />

          <div>
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
              <div className="mt-2">No Comments</div>
            )}
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
