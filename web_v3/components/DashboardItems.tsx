import RecipeCard from "./RecipeCard";
import React, { useRef } from "react";
import type { NextPage } from "next";
import { useInfiniteQuery } from "@tanstack/react-query";

const DashboardItems: NextPage = () => {
  const myRef = useRef<HTMLDivElement>(null);
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
    <div className=" flex flex-col m-3  ">
      <div className="mt-4 mb-6">
        <p className="text-3xl font-semibold">For You</p>
      </div>

      <div
        className={
          isFetchingNextPage
            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse"
            : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        }
      >
        <>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group?.recipes?.map((d: any, index: number) => (
                <RecipeCard
                  key={index}
                  name={d.name}
                  author={d.user_id}
                  // num_saves={d.numSaves}
                  // rating={
                  //   d.past_hour_average ? d.past_hour_average?.toFixed(2) : null
                  // }
                  cook_time={d.cook_time}
                  caption={d.caption}
                  id={d.id}
                  // image={
                  //   d.featured_image !== null && d.featured_image !== undefined
                  //     ? API_URL + d.featured_image?.url.split("?")[0]
                  //     : null
                  // }
                />
              ))}
            </React.Fragment>
          ))}
        </>
      </div>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        className={isFetchingNextPage ? "btn btn-ghost loading" : ""}
      >
        {isFetchingNextPage
          ? null
          : hasNextPage
          ? "View More"
          : !isLoading
          ? "You reached the bottom!"
          : null}
      </button>
    </div>
  );
};

export default DashboardItems;
