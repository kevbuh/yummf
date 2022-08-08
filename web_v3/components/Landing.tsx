import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FacebookSVG, EmailSVG, GoogleSVG } from "../utils/socialSVGs";
import LandingShow from "./LandingShow";
import LandingCategories from "./LandingCategories";
import Footer from "./Footer";
import LandingFeatured from "./LandingFeatured";
import Head from "next/head";
import LandingLearn from "./LandingLearn";
import SignUpPage from "../pages/signup";
import Link from "next/link";

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

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
      {/* <Test /> */}

      <div className="grid grid-cols-2 w-full mt-8 px-6">
        <a
          className="btn btn-ghost normal-case text-3xl text-rosa mr-auto my-auto"
          onClick={executeScroll}
        >
          kooki{" "}
          <span className="text-stone-300 italic text-sm mb-auto">
            &nbsp; beta
          </span>
        </a>
        <div className="grid grid-cols-2 mr-2 gap-2 sm:grid-cols-2 ml-auto my-auto sm:gap-4">
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
      <div className="my-auto w-full ">
        <div className="m-auto flex flex-col justify-evenly  w-full">
          <div className="m-auto mt-20 mb-10">
            {/* The complete food solution, everything in one place */}
            <div
              className="text-7xl font-semibold mt-20 sm:mt-1 
          "
            >
              The{" "}
              <span
                className="text-7xl font-semibold mt-20 sm:mt-1 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-rosa to-pink-400
            animate-text"
              >
                Complete{" "}
              </span>
            </div>
            <div className="text-7xl font-semibold">Food Solution</div>
            {/* <svg
                className="fill-secondary col-start-1 row-start-1 h-auto w-full bg-rosa "
                width="1600"
                height="595"
                viewBox="0 0 1600 595"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"></path>
              </svg> */}
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
                  className="block p-4 pl-10 w-full  text-black rounded-lg border-stone-100 border-4 "
                  placeholder="Search Recipes, Ingredients..."
                  onChange={(e) => setSearchField(e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  required
                />
              </div>
            </form>
            <div className="flex flex-row mt-4">
              <p className="font-semibold text-lg m-auto">
                Today&apos;s Popular Searches
              </p>
              <div className="grid grid-cols-4 gap-4 m-auto w-3/5">
                <Link href="/search-results?result=tacos">
                  <button className="font-semibold px-3 py-1 rounded-xl bg-stone-100 text-blue-400 ">
                    tacos
                  </button>
                </Link>
                <Link href="/search-results?result=fried rice">
                  <button className="font-semibold px-3 py-1 rounded-xl bg-stone-100 text-blue-400 ">
                    fried rice
                  </button>
                </Link>
                <Link href="/search-results?result=mexican">
                  <button className="font-semibold px-3 py-1 rounded-xl bg-stone-100 text-blue-400 ">
                    mexican
                  </button>
                </Link>
                <Link href="/search-results?result=pasta">
                  <button className="font-semibold px-3 py-1 rounded-xl bg-stone-100 text-blue-400 ">
                    pasta
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className=" mx-auto my-16">
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
      </div>

      <LandingFeatured />

      <br />
      <br />
      <br />
      <br />

      <LandingShow />

      <br />
      <br />
      <br />
      <br />

      <LandingLearn />

      <br />
      <br />
      <br />
      <br />

      <LandingCategories />

      {/* Sign up */}
      <div ref={myRef}></div>

      <SignUpPage />

      {/* <Footer /> */}
    </div>
  );
}

// const SignUpFull = () => {
//   return (
//     <div className="h-full md:grid md:grid-cols-2 rounded-xl mx-4">
//       <div className="m-auto invisible md:visible">
//         <p className="md:mt-20 md:mb-20 text-7xl mx-auto font-bold border-4 border-stone text-rosa rounded-full md:py-24 px-12 hover:text-white hover:bg-rosa hover:cursor-pointer">
//           kooki
//         </p>
//       </div>
//       <div className="m-auto">
//         <div className="text-5xl font-semibold">
//           {!shouldShowLogin ? "Sign Up " : "Log In "}&
//         </div>
//         <div className="text-5xl font-semibold mb-2">
//           Start <span className="underline">Today</span>
//         </div>
//         <div>
//           <div className="mx-auto text-2xl rounded-lg bg-stone-100 p-2 text-center space-y-4 py-8">
//             <button
//               onClick={() => signIn("google")}
//               className="rounded-full p-2 mr-4 bg-white"
//             >
//               <GoogleSVG />
//             </button>
//             <button
//               onClick={() => signIn("facebook")}
//               className="rounded-full p-2 ml-4 bg-white"
//             >
//               <FacebookSVG />
//             </button>

//             <div className="w-1/2 mx-auto"></div>
//             <p className="text-base ">or</p>
//             <button
//               onClick={() => signIn("google")}
//               className="flex flex-row mx-auto space-evenly rounded-lg p-3 bg-white text-base font-semibold"
//             >
//               <EmailSVG />
//               Email address
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
