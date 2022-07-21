import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import RecipeCard from "../components/RecipeCard";
import { useQuery } from "@tanstack/react-query";

function SearchResultPage() {
  const { query } = useRouter();

  const fetchSearchResults = async (url: string) => {
    const apiRes = await fetch(`/api/search?q=${url}`);
    const data = await apiRes.json();
    console.log("data", data);
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
      <NavBar />
      <div className=" flex flex-col justify-self-center   my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col my-10 ">
            {isLoading && <p>loading...</p>}
            {isError && <p>{(error as Error).message}</p>}

            {isSuccess && data.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 ">
                {data.map((d: any, index: number) => {
                  return (
                    <RecipeCard
                      key={index}
                      name={d.name}
                      author={d.user_id}
                      // num_saves={d.num_saves}
                      // rating={
                      //   d.past_hour_average
                      //     ? d.past_hour_average?.toFixed(2)
                      //     : null
                      // }
                      cook_time={d.cook_time}
                      caption={d.caption}
                      id={d.id}
                      // image={
                      //   d.featured_image !== null &&
                      //   d.featured_image !== undefined
                      //     ? API_URL + d.featured_image?.url.split("?")[0]
                      //     : null
                      // }
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-3xl mt-6 mb-96">No Search Results!</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResultPage;
