import type { NextPage } from "next";
import React, { useRef, useState } from "react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CurlyArrow,
  CurveRightArrow,
  DottedArrow,
  ForkArrow,
  NormalBoldArrow,
} from "../utils/arrows";
import { SearchIcon } from "../utils/icons";
import { YumScore } from "../utils/yum_score";

const Home: NextPage = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);
  const myRef = useRef<null | HTMLDivElement>(null);
  const myRef2 = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => myRef?.current?.scrollIntoView();

  const executeScroll2 = () => myRef2?.current?.scrollIntoView();

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/search-results?result=${searchField}`);
  };

  // console.log("1", YumScore(76, 234, 4.2, 4.5, 4.7, 96, 139, 13279));
  // console.log("2", YumScore(2, 1, 3.4, 2.3, 1.4, 100, 139, 13279));

  return (
    <>
      <div className="px-6 sm:px-0">
        <div className="flex flex-row sm:grid sm:grid-cols-2 bg-white py-6 sm:p-6">
          <p className="text-xl sm:text-2xl font-bold my-auto">yummf</p>
          <div className="ml-auto grid grid-cols-2 sm:gap-4">
            <button
              className="text-lg sm:text-xl font-semibold p-2 rounded-xl "
              onClick={executeScroll}
            >
              Log in
            </button>
            <button
              className="text-lg sm:text-xl font-semibold p-2 rounded-xl bg-rosa text-white"
              onClick={executeScroll}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="max-w-xl mt-40 mb-32 m-auto align-center justify-center items-center">
          <div className="flex flex-col h-full my-auto align-center justify-center">
            <p className="mx-auto font-semibold text-center">
              <span className="text-rosa text-6xl">yummf</span>
              <br />
              <br />

              {/* <span className="italic text-3xl sm:text-5xl">
                find something to cook
              </span> */}
            </p>
            <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 text-center mb-8 max-w-lg px-6 sm:px-0 ">
              Get personalized recommendations so you always know what to cook.
            </p>

            <form className="w-full sm:mx-auto">
              <div className="relative ">
                <div className="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
                  <SearchIcon />
                  {/* @ts-ignore */}
                  <button onClick={onSubmit}></button>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="p-4 pl-14  w-full  placeholder-gray-400 text-lg rounded sm:rounded-xl border-stone-100 border-4 border-dashed focus:outline-none "
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

      <NormalBoldArrow />

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
          Find the <span className="text-rosa">best</span> recipes and cooking
          info
        </p>
        <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0 ">
          Finding worthwhile recipes and cooking information takes a lot of
          time. Yummf&apos;s{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => executeScroll2()}
          >
            new ranking system
          </span>{" "}
          places extreme emphasis on&nbsp;
          <span className="italic">quality</span>&nbsp; through community
          ratings.
        </p>

        <Link href="/explore">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Explore recipes
          </button>
        </Link>
      </div>

      <DottedArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">
          Earn <span className="text-fresh">rewards</span> for quality
        </p>
        <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0">
          In order to find good recipes, you need good ratings. Yummf rewards
          the authors of high quality, well written recipes.
        </p>
        <Link href="/earn">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Learn more
          </button>
        </Link>
      </div>

      <CurlyArrow />
      <div ref={myRef2}>&nbsp;</div>

      <div className="items-center flex flex-col my-40 justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">
          A <span className="text-rosa">fresh</span> ranking system
        </p>
        <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0">
          Knowing exactly which recipes are good is hard. This is why Yummf has
          developed its own Yum Score, which incorporates a{" "}
          <span>perfect blend of several factors</span> so you know what to
          cook.
        </p>
      </div>

      <CurveRightArrow />

      <div className="items-center flex flex-col my-40 text-center justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">
          Learn from the <span className="text-rosa">community</span>
        </p>
        <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
          Recipe information online is unorganized and shallow. Get help with
          your recipe, learn about ingredients, or ask any cooking related
          question.
        </p>

        <Link href="/community">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Get involved
          </button>
        </Link>
      </div>

      <ForkArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center text-center max-w-lg mx-auto">
        <p className="font-semibold text-5xl mb-4">
          <span className="text-rosa">Fork</span> your favorites
        </p>
        <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 px-6 sm:px-0 ">
          Liked a recipe, but it needs some tweaks? Copy & edit your favorite
          recipes, and start freely making them your own.
        </p>

        {/* <Link href="/explore">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Start a fork
          </button>
        </Link> */}
      </div>

      <CurlyArrow />

      <div
        className="items-center flex flex-col mt-24 mb-40 justify-center align-center"
        ref={myRef}
      >
        <p className="font-semibold text-5xl my-4">Start cooking</p>

        <p className="mx-auto font-medium text-xl sm:text-2xl mb-8 text-gray-500 text-center px-6 sm:px-0">
          Get personalized recommendations
          <br />
          so you always know what to cook.
        </p>
        <Link href="/signup">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-rosa text-white font-semibold">
            Get started with Yummf
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
