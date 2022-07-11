import RecipeCard from "./RecipeCard";
import { useInfiniteQuery } from "react-query";
import { getAllRecipes } from "../fetches/allFetches";
import { API_URL } from "../config/index";
import React, { useRef, useEffect } from "react";

function DashboardItems() {
  const myRef = useRef();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery("allRecipes", getAllRecipes, {
    getNextPageParam: (lastPage) => {
      // console.log("PAGES", lastPage.pagination);
      if (lastPage.pagination.current_page < lastPage.pagination.total_pages) {
        lastPage.nextCursor = lastPage.pagination.next_page;
        return lastPage.nextCursor;
      }
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // console.log("entry", entry);
      fetchNextPage();
    });
    observer.observe(myRef.current);
  }, []);

  // console.log(data.pages.);

  return (
    <div className=" flex flex-col m-3  ">
      <div>
        <p className="text-2xl font-semibold mb-4">For You</p>
      </div>

      <div
        className={
          isFetchingNextPage
            ? "grid grid-cols-4 animate-pulse gap-3"
            : "grid grid-cols-4 gap-3"
        }
      >
        <>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group?.recipes?.map((d, index) => (
                <RecipeCard
                  key={index}
                  name={d.name}
                  author={d.user_id}
                  num_saves={d.num_saves}
                  rating={d.past_hour_average?.toFixed(2)}
                  cook_time={d.cook_time}
                  caption={d.caption}
                  id={d.id}
                  image={
                    d.featured_image !== null && d.featured_image !== undefined
                      ? API_URL + d.featured_image?.url.split("?")[0]
                      : null
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </>
      </div>

      <div className="mx-auto mt-4 ">
        <button
          onClick={() => fetchNextPage()}
          disabled={(isFetchingNextPage, !hasNextPage)}
          className={isFetchingNextPage ? "btn loading" : ""}
        >
          {isFetchingNextPage
            ? null
            : hasNextPage
            ? "View More"
            : !isLoading
            ? "You scrolled to the bottom!"
            : null}
        </button>
      </div>
      {isFetching && !isFetchingNextPage ? (
        <div className="btn border-stone-100 loading h-96 mx-auto w-full"></div>
      ) : null}
      <div className="bg-stone-100 rounded-lg" ref={myRef}></div>
    </div>
  );
}

export default DashboardItems;

{
  /* {isSuccess &&
          data.map((d, index) => {
            // console.log("@@@@", API_URL + d.featured_image?.url.split("?")[0]);
            return (
              <RecipeCard
                key={index}
                name={d.name}
                author={d.user_id}
                num_saves={d.num_saves}
                rating={d.rating}
                cook_time={d.cook_time}
                id={d.id}
                image={
                  d.featured_image !== null && d.featured_image !== undefined
                    ? API_URL + d.featured_image?.url.split("?")[0]
                    : null
                }
              />
            );
          })} */
}
