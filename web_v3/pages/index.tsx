import type { NextPage } from "next";
import React, { useState } from "react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/search-results?result=${searchField}`);
  };

  return (
    <>
      <div className="px-6 sm:px-0">
        <div className="flex flex-row sm:grid sm:grid-cols-2 bg-white py-6 sm:p-6">
          <p className="text-2xl font-bold my-auto">supayum</p>
          <div className="ml-auto grid grid-cols-2 sm:gap-4">
            <button className="text-lg sm:text-xl font-semibold p-2 rounded-xl ">
              Log in
            </button>
            <button className="text-lg sm:text-xl font-semibold p-2 rounded-xl bg-rosa text-white">
              Sign up
            </button>
          </div>
        </div>
        <div className="max-w-xl mt-40 mb-32 m-auto align-center justify-center items-center">
          <div className="flex flex-col h-full my-auto align-center justify-center">
            <p className="mx-auto font-semibold text-5xl text-center mb-16">
              <span className="text-rosa">supayum</span>
              <br />
              <br />

              <span className="italic">find something to eat</span>
            </p>
            <form className="w-full sm:mx-auto">
              <div className="relative ">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-6 h-6 ml-2 sm:ml-4"
                    fill="none"
                    stroke="#9CA38F" // this is text-gray-400
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  {/* @ts-ignore */}
                  <button onClick={onSubmit}></button>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="text-center block p-4 pl-14 md:pl-0 w-full text-black  font-medium placeholder-gray-400 text-lg rounded sm:rounded-xl border-stone-100 border-4 "
                  placeholder="Search Recipes, Categories, Ingredients, Chefs..."
                  onChange={(e) => setSearchField(e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <svg
        width="44"
        height="289"
        viewBox="0 0 44 289"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M22.0071 284.341C22.7125 276.243 16.7336 271.14 6.85917 265.324M22.0071 284.341C22.4802 275.784 28.925 268.234 39.1595 266.754M22.0071 284.341C21.0088 283.94 24.5322 269.719 23.879 252.285M23.7786 237.005L23.4941 221.006M22.727 206.854L22.2368 193.779M21.7896 180.425L21.105 165.103M20.0746 153.035L19.3489 138.298M18.748 126.13L17.5299 111.711M16.4078 98.2626L15.5998 84.6947M14.6685 72.8803L12.8247 59.0046M10.9436 46.3253C10.7732 43.1803 10.2192 35.9119 9.3666 31.9983M7.90227 21.0859L4.5105 4.16406"
          stroke="black"
          strokeWidth={7.94748}
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="items-center flex flex-col my-40 justify-center align-center">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 max-w-lg w-full px-6 sm:px-0">
          <button className="bg-stone-100 rounded-xl py-4 font-semibold text-xl">
            Tacos
            <br />
            Al Pastor{" "}
          </button>
          <button className="bg-stone-100 rounded-xl text-center font-semibold text-xl ">
            <p>
              Dinner
              <br />
              Recipes
            </p>
          </button>
          <button className="bg-stone-100 rounded-xl font-semibold text-xl">
            Boiling
            <br />
            Info
          </button>
        </div>
        <p className="font-semibold text-5xl text-center mb-8 max-w-lg">
          Find millions of the best recipes, categories, and ingredients
        </p>

        <Link href="/explore">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Explore
          </button>
        </Link>
      </div>
      <svg
        width="38"
        height="312"
        viewBox="0 0 38 312"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M3.99478 278.485C5.93218 288.053 12.5788 299.24 17.2591 307.972M17.2591 307.972C17.3496 308.14 19.2034 306.611 19.3443 306.489C25.6719 301 32.2974 287.509 33.8114 279.728M17.2591 307.972C21.1041 256.117 20.459 197.305 20.0306 139.224C19.685 92.3594 19.4806 45.9704 21.89 4.09583"
          stroke="black"
          strokeWidth="7.63695"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="items-center flex flex-col my-40 justify-center align-center text-center max-w-lg mx-auto">
        <p className="font-semibold text-5xl mb-4">Fork your favorites</p>
        <p className="mx-auto font-medium text-2xl text-gray-500 px-6 sm:px-0 mb-6">
          Clone your favorite recipes, and start freely adding your own tweaks
        </p>

        <Link href="/explore">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Start a fork
          </button>
        </Link>
      </div>
      <svg
        width="44"
        height="289"
        viewBox="0 0 44 289"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M22.0071 284.341C22.7125 276.243 16.7336 271.14 6.85917 265.324M22.0071 284.341C22.4802 275.784 28.925 268.234 39.1595 266.754M22.0071 284.341C21.0088 283.94 24.5322 269.719 23.879 252.285M23.7786 237.005L23.4941 221.006M22.727 206.854L22.2368 193.779M21.7896 180.425L21.105 165.103M20.0746 153.035L19.3489 138.298M18.748 126.13L17.5299 111.711M16.4078 98.2626L15.5998 84.6947M14.6685 72.8803L12.8247 59.0046M10.9436 46.3253C10.7732 43.1803 10.2192 35.9119 9.3666 31.9983M7.90227 21.0859L4.5105 4.16406"
          stroke="black"
          strokeWidth={7.94748}
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="items-center flex flex-col my-40 justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">
          Get <span className="text-fresh">paid</span> for top content
        </p>
        <p className="mx-auto font-medium text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0">
          Kooki allows the best chefs all over the world, from professional to
          home kitchens, to reap rewards from their recipes and articles.
        </p>
        <Link href="/earn">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Learn more
          </button>
        </Link>
      </div>
      <svg
        width="80"
        height="176"
        viewBox="0 0 80 176"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M13.573 161.887C20.7909 165.577 30.6168 170.336 38.268 172.716M38.268 172.716C39.1494 172.991 39.1629 166.062 39.1365 165.742C38.5648 158.733 37.0934 152.014 35.4468 145.199M38.268 172.716C4.4028 144.54 -4.85403 100.973 11.7232 74.2966C13.3662 71.6526 15.1572 68.7767 17.1964 66.0726M17.1964 66.0726C20.4439 61.7662 24.3209 57.8956 29.2321 56.0919C33.7646 54.4274 40.3703 54.1684 44.2179 57.442C51.4053 63.5575 46.9778 75.2647 38.0976 77.2313C30.2939 78.9597 19.8319 73.5277 17.1964 66.0726ZM17.1964 66.0726C17.1408 65.9153 17.0887 65.7572 17.0402 65.5982C5.32724 27.2193 44.0699 0.296595 76.7894 3.05751"
          stroke="black"
          strokeWidth={5.58817}
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="items-center flex flex-col my-40 text-center justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">
          Improve your cooking skills
        </p>
        <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
          Kooki has some of the best cooks in all of planet earth. Get help with
          cooking, or learn from the community.
        </p>

        <Link href="/learn">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Learn more
          </button>
        </Link>
      </div>
      <svg
        width="38"
        height="223"
        viewBox="0 0 38 223"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M25.4809 219.161C23.9541 213.011 27.7304 208.765 34.2918 203.748M25.4809 219.161C24.0684 212.646 18.3757 207.246 10.6418 206.705M25.4809 219.161C26.1675 218.796 21.8009 208.128 20.1159 194.762M18.2908 183.075L16.5123 170.829M15.3193 159.965L14.0558 149.941M12.726 139.706L11.3267 127.954M10.5869 118.669L9.29062 107.361M8.22171 98.0244L7.32813 86.931M6.48445 76.5851L5.39417 66.1661M4.61286 57.0806L4.24838 46.3665M4.06022 36.5649C3.79505 34.1508 3.30035 28.5623 3.44291 25.5213M3.16687 17.0945L3.5658 3.9624"
          stroke="black"
          strokeWidth={6.29803}
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="items-center flex flex-col mt-24 mb-40 justify-center align-center">
        <p className="font-semibold text-5xl my-4">Start cooking</p>

        <p className="mx-auto font-medium text-2xl mb-8 text-gray-500 text-center px-6 sm:px-0">
          Get personalized recommendations,
          <br />
          so you always know what to cook
        </p>
        <Link href="/signup">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-rosa text-white font-semibold">
            Get started with Kooki
          </button>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/explore",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}

export default Home;
