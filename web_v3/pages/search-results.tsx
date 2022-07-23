import Footer from "../components/Footer";
import { useRouter } from "next/router";
import RecipeCard from "../components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import SideNavLayout from "../components/sideNavLayout";

function SearchResultPage() {
  const { query } = useRouter();

  const fetchSearchResults = async (url: string) => {
    const apiRes = await fetch(`/api/search?q=${url}`);
    const data = await apiRes.json();
    return data.searchResults;
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    ["searchResults", query.result],
    () => fetchSearchResults(query.result as string)
  );

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    <>
      <SideNavLayout>
        <div className="flex flex-col m-3">
          {isLoading && <p>loading...</p>}
          {isError && <p>{(error as Error).message}</p>}

          {isSuccess && data.length > 0 ? (
            <div
              className={
                isLoading
                  ? "grid grid-cols-2 mt-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse"
                  : "grid grid-cols-2 mt-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              }
            >
              {data.map((d: any, index: number) => {
                return (
                  <RecipeCard
                    key={index}
                    name={d.name}
                    author={d.user_id}
                    cook_time={d.cook_time}
                    caption={d.caption}
                    id={d.id}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-3xl mt-6 mb-96">No Search Results!</p>
          )}
        </div>
      </SideNavLayout>
      <Footer />
    </>
  );
}

export default SearchResultPage;
