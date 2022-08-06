import Footer from "../components/Footer";
import { useRouter } from "next/router";
import RecipeCard from "../components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import SideNavLayout from "../components/sideNavLayout";
import Link from "next/link";
import { SaveSVG } from "../utils/socialSVGs";

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
            <>
              <div className="my-4 text-4xl font-semibold">Search Results</div>
              <div
                className={
                  isLoading
                    ? "grid grid-cols-1 mt-2.5 animate-pulse"
                    : "grid grid-cols-1 gap-3 mt-2.5 cursor-pointer"
                }
              >
                {data.map((d: any, index: number) => {
                  console.log("@", d);
                  return (
                    // <RecipeCard
                    //   key={index}
                    //   name={d.name}
                    //   author={d.user_id}
                    //   cook_time={d.cook_time}
                    //   caption={d.caption}
                    //   id={d.id}
                    // />
                    <Link href={"/recipes/" + d.id}>
                      <div className="bg-stone-100 p-3 rounded-xl w-full flex flex-row">
                        <div className="my-auto ml-2 mr-4">
                          <SaveSVG />
                        </div>
                        <div>
                          <p className="font-semibold">{d.name}</p>
                          <p className="my-auto">{d.authorId}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="my-4 text-4xl font-semibold">
                No Search Results!
              </div>
              <div>
                <div className="bg-stone-100 p-3 rounded-xl w-full flex flex-row">
                  <div>
                    <p className="my-2 font-semibold">
                      Sorry, there were no recipes that came up. If you believe
                      there is an issue, click{" "}
                      <Link href="/help">
                        <a className="underline text-blue-500">here.</a>
                      </Link>{" "}
                    </p>
                    <p>Maybe the recipes below suit your needs?</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SideNavLayout>
      <Footer />
    </>
  );
}

export default SearchResultPage;
