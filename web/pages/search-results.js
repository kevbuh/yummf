import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { API_URL } from "../config/index";
import Link from "next/link";
import { useQuery } from "react-query";
import RecipeCard from "../components/RecipeCard";

function SearchResultPage() {
  const { query } = useRouter();

  const fetchSearchResults = async (url) => {
    const res = await fetch(`${API_URL}/api/v1/search?q=${url}`);
    return res.json();
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    ["searchResults", query.result],
    () => fetchSearchResults(query.result)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <NavBar />
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col my-10 ">
            {isLoading && <p>loading...</p>}
            {isError && <p>{error.message}</p>}

            {isSuccess && data.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 bg-stone-100 p-3 rounded-lg">
                {data.map((d) => {
                  return (
                    <RecipeCard
                      name={d.name}
                      author={d.user_id}
                      num_saves={d.num_saves}
                      rating={d.rating}
                      cook_time={d.cook_time}
                      id={d.id}
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
