import RecipeCard from "./RecipeCard";
import React from "react";
import type { NextPage } from "next";
import { useInfiniteQuery } from "@tanstack/react-query";

const DashboardItems: NextPage = () => {
  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["recipes"],
      async ({ pageParam = "" }) => {
        const apiRes = await fetch("/api/infinite_recipes?cursor=" + pageParam);
        const data = await apiRes.json();
        return data;
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      }
    );

  return (
    <div className=" flex flex-col m-3">
      <div className="flex flex-col items-center mb-8 md:my-8  mx-auto">
        <p className="text-6xl font-semibold">Recipes</p>
      </div>
      <div
        className={
          isFetchingNextPage
            ? "grid grid-cols-2 mt-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse"
            : "grid grid-cols-2 mt-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        }
      >
        <>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group?.recipes?.map((d: any, index: number) => (
                <RecipeCard
                  key={index}
                  name={d.name.slice(0, 36)}
                  caption={d.caption.slice(0, 42)}
                  id={d.id}
                  rating={d.overallRating / d.ratings?.length}
                  length={d.ratings?.length}
                />
              ))}
            </React.Fragment>
          ))}
        </>
      </div>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        className={
          isFetchingNextPage
            ? "btn btn-ghost loading my-8"
            : "my-8 w-1/2 mx-auto bg-stone-100 font-medium rounded-xl py-3"
        }
      >
        {isFetchingNextPage
          ? null
          : hasNextPage
          ? "Show More"
          : !isLoading
          ? "You've reached the bottom!"
          : null}
      </button>
    </div>
  );
};

export default DashboardItems;
