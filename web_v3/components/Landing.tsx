import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FacebookSVG, EmailSVG, GoogleSVG } from "../utils/socialSVGs";

export default function Landing() {
  const router = useRouter();
  const myRef = useRef<null | HTMLDivElement>(null);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const arrowDown = useRef<null | HTMLDivElement>(null);
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);

  const executeScroll = () => myRef?.current?.scrollIntoView();
  const executeScroll2 = () => {
    setShouldShowLogin((shouldShowLogin) => !shouldShowLogin);
    myRef?.current?.scrollIntoView();
  };

  const executeScrollArrow = () => arrowDown?.current?.scrollIntoView();

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/search-results?result=${searchField}`);
  };

  return (
    <div>
      <div className="grid grid-cols-2 w-full sm:max-w-6xl mx-auto mt-4 ">
        <a
          className="btn btn-ghost normal-case text-3xl text-rosa mr-auto my-auto"
          onClick={executeScroll}
        >
          kooki
        </a>
        <div className="grid grid-rows-1 sm:grid-cols-3 ml-auto my-auto gap-4 ">
          <a className="text-xl font-semibold my-auto ml-auto cursor-pointer ">
            {/* About */}
          </a>
          <>
            <button
              className="text-xl font-semibold rounded-xl bg-stone-100 px-3 py-2 sm:p-2 text-center cursor-pointer scroll-smooth"
              onClick={executeScroll2}
            >
              Log in
            </button>
            <button
              className="text-xl font-semibold rounded-xl bg-rosa text-white p-2 cursor-pointer"
              onClick={executeScroll}
            >
              Sign up
            </button>
          </>
        </div>
      </div>
      <div className="space-x-20 my-auto w-full">
        <div className="m-auto flex flex-col justify-evenly h-3/4 w-full">
          <div className="m-auto mt-20 mb-10">
            {/* The complete food solution, everything in one place */}
            <div
              className="text-7xl font-semibold mt-20 sm:mt-1 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-rosa via-pink-500 to-orange-500
            animate-text"
            >
              Recipes{" "}
            </div>
            <div className="text-7xl font-semibold">For You</div>
          </div>
          <div className="w-3/4 lg:w-1/2 mx-auto mb-10">
            <form className="w-full mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Search
              </label>
              <div className="relative ">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-zine-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  {/* @ts-ignore */}
                  <button onClick={onSubmit}></button>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-black rounded-lg dark:bg-stone-100 bg-stone-100"
                  placeholder="Search Recipes, Ingredients..."
                  onChange={(e) => setSearchField(e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  required
                />
              </div>
            </form>
          </div>
          <div className=" mx-auto mt-20 mb-32">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 m-auto cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={executeScrollArrow}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
        {/* put something cool here */}
      </div>

      <div className=" grid grid-cols-1 mt-40 sm:mt-0 mb-20" ref={arrowDown}>
        <div className="m-auto h-1/2">
          <div className="text-7xl font-semibold">Discover Recipes</div>
        </div>
      </div>
      <div className="h-96 grid grid-cols-2 my-4">
        <div className="m-auto text-7xl font-semibold">Search</div>
        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8"></div>
      </div>
      <div className="h-96 grid grid-cols-2">
        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8">
          {/* <Player
            autoplay={true}
            speed={0.2}
            // loop={true}
            src="https://assets7.lottiefiles.com/packages/lf20_irbx8ets.json"
            style={{ height: "200px", width: "200px" }}
          ></Player> */}
        </div>
        <div className="m-auto text-7xl font-semibold">Save</div>
      </div>
      <div className="h-96 grid grid-cols-2 my-4">
        <div className="m-auto text-7xl font-semibold">Start!</div>
        <div className="rounded-xl bg-stone-100 h-full p-30 mx-8"></div>
      </div>

      <div className="h-screen md:grid md:grid-cols-2 mt-20">
        <div className="m-auto invisible md:visible" ref={myRef}>
          <p className="md:mt-20 md:mb-20 text-7xl mx-auto font-bold border-4 border-rosa text-rosa rounded-full md:py-24 px-12 hover:text-white hover:bg-rosa hover:cursor-pointer">
            kooki
          </p>
        </div>
        <div className="m-auto">
          <div className="text-7xl font-semibold">
            {!shouldShowLogin ? "Sign Up " : "Log In "}&
          </div>
          <div className="text-7xl font-semibold mb-2">
            Start <span className="underline">Today</span>
          </div>
          <div>
            <div className="mx-auto text-2xl rounded-lg bg-stone-100 p-2 text-center space-y-4 py-8">
              <button
                onClick={() => signIn("google")}
                className="rounded-full p-2 mr-4 bg-white"
              >
                <GoogleSVG />
              </button>
              <button
                onClick={() => signIn("facebook")}
                className="rounded-full p-2 ml-4 bg-white"
              >
                <FacebookSVG />
              </button>

              <div className="w-1/2 mx-auto"></div>
              <p className="text-base ">or</p>
              <button
                onClick={() => signIn("google")}
                className="flex flex-row mx-auto space-evenly rounded-lg p-3 bg-white text-base font-semibold"
              >
                <EmailSVG />
                Email address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
