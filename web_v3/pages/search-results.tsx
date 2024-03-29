import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import SideNavLayout from "../components/sideNavLayout";
import Link from "next/link";
import { SaveSVG } from "../utils/socialSVGs";

const Spinner = () => {
  return (
    <div role="status" className="mx-auto p-4">
      <svg
        aria-hidden="true"
        className="mr-2 w-8 h-8 text-stone-100 animate-spin fill-blue-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

function SearchResultPage() {
  const { query } = useRouter();

  const fetchSearchResults = async (url: string) => {
    const apiRes = await fetch(`/api/search?q=${url}`);
    const data = await apiRes.json();

    const cat_search = query.result?.slice(0, 4) == "cat_";

    if (cat_search) {
      return data.searchResults[0].recipes;
    } else {
      return data.searchResults;
    }
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    ["searchResults", query.result],
    () => fetchSearchResults(query.result as string)
  );

  // if (isError) {
  //   return <span>Error: {(error as Error).message}</span>;
  // }

  return (
    <>
      <SideNavLayout>
        <div className="flex flex-col m-3">
          {isError && null}

          {isSuccess && data.length > 0 ? (
            <>
              <div className="flex flex-col items-center my-8 mx-auto">
                <p className="text-6xl font-semibold">
                  {query?.result?.slice(0, 4) == "cat_" ||
                  query?.result?.slice(0, 4) == "ing_" ||
                  query?.result?.slice(0, 4) == "qas_"
                    ? query.result.slice(4, query.result.length)
                    : query.result}
                </p>
              </div>
              <div
                className={
                  isLoading
                    ? "grid grid-cols-1 mt-2.5 animate-pulse"
                    : "grid grid-cols-1 gap-3 mt-2.5 cursor-pointer"
                }
              >
                {data.map((d: any, index: number) => {
                  return (
                    <Link
                      href={
                        query.result?.slice(0, 4) == "qas_"
                          ? `/community/discussion/${d.id}`
                          : `/recipes/${d.id}`
                      }
                      key={index}
                    >
                      <div
                        className="bg-stone-100 p-3 rounded-xl w-full flex flex-row"
                        key={index}
                      >
                        <div className="my-auto ml-2 mr-4">
                          <SaveSVG />
                        </div>
                        {query.result?.slice(0, 4) == "qas_" ? (
                          <div>
                            <p className="font-semibold">{d.title}</p>
                            <p className="my-auto">{d.createdAt}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-semibold">{d.name}</p>
                            <p className="my-auto">{d.authorDisplayName}</p>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center my-8  mx-auto">
                <p className="text-6xl font-semibold">No Search Results!</p>
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
          {isLoading && <Spinner />}
        </div>
      </SideNavLayout>
      <Footer />
    </>
  );
}

export default SearchResultPage;
