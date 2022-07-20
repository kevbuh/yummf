import RecipeCard from "./RecipeCard";
import React, { useRef } from "react";
import prisma from "../utils/prisma";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

const DashboardItems: NextPage = ({ recipes }: any) => {
  const myRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className=" flex flex-col m-3  ">
      <div className="mt-4 mb-6">
        <p className="text-3xl font-semibold">For You</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <>
          {recipes.map((d: any, index: any) => (
            <RecipeCard
              key={index}
              name={d.name}
              author={d.authorId}
              // rating={d.avgRating ? d.avgRating?.toFixed(2) : null}
              cook_time={d.cookTime}
              caption={d.caption}
              id={d.id}
              // image={
              //   d.featured_image !== null && d.featured_image !== undefined
              //     ? API_URL + d.featured_image?.url.split("?")[0]
              //     : null
              // }
            />
          ))}
        </>
      </div>

      <div className="mx-auto mt-4 "></div>

      <div className="bg-stone-100 rounded-lg" ref={myRef}></div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipes = await prisma?.recipe?.findMany();
  return { props: { recipes: JSON.parse(JSON.stringify(recipes)) } };
};

export default DashboardItems;
