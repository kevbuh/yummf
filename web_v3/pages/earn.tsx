import type { NextPage } from "next";
import React, { useState } from "react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CurlyArrow,
  CurveRightArrow,
  DottedArrow,
  NormalBoldArrow,
} from "../utils/arrows";

const EarnInfo: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="px-6 sm:px-0">
        <div className="flex flex-row sm:grid sm:grid-cols-2 bg-white py-6 sm:p-6">
          <Link href="/">
            <p className="text-2xl font-bold my-auto cursor-pointer">yummf</p>
          </Link>
          <div className="ml-auto grid grid-cols-2 sm:gap-4">
            {/* <button className="text-lg sm:text-xl font-semibold p-2 rounded-xl ">
              Log in
            </button>
            <button className="text-lg sm:text-xl font-semibold p-2 rounded-xl bg-rosa text-white">
              Sign up
            </button> */}
          </div>
        </div>
      </div>

      <div className="items-center flex flex-col my-40 justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">
          Recipes get <span className="text-fresh">rewarded</span>
        </p>
        {/* <p className="mx-auto font-medium text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0">
          Yummf allows the best chefs all over the world, from professional to
          home kitchens, to reap rewards from their recipes and articles.
        </p>
        <Link href="/signup">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Get started
          </button>
        </Link> */}
      </div>

      <DottedArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center">
        <p className="font-semibold text-5xl text-center mb-8 max-w-lg">
          If you post an original, viral recipe, we believe that you should be
          rewarded.
        </p>
      </div>

      <NormalBoldArrow />

      <div className="items-center flex flex-col my-40 text-center justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">
          Yummf Partner Program
        </p>
        <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
          If you consistently upload the highest rated, most popular recipes,
          you can join our program to earn a bit of{" "}
          <span className="text-fresh">cash</span>
        </p>

        {/* <Link href="/explore">
          <button className="max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
            Learn more
          </button>
        </Link> */}
      </div>

      <CurlyArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center text-center max-w-lg mx-auto">
        <p className="font-semibold text-5xl mb-4">Am I eligible?</p>
        <p className="mx-auto font-medium text-2xl text-gray-500 px-6 sm:px-0 mb-6">
          Once you{" "}
          <span className="underline">
            create 10 recipes with Yum Scores of 95 or over,
          </span>{" "}
          you can submit a request to join through the{" "}
          <Link href="/help">
            <span className="underline cursor-pointer">Help Center</span>
          </Link>
        </p>
      </div>

      <CurveRightArrow />

      <div className="items-center flex flex-col mt-24 mb-40 justify-center align-center">
        <p className="font-semibold text-5xl my-4">Start Creating</p>

        <p className="mx-auto font-medium text-2xl mb-8 text-gray-500 text-center px-6 sm:px-0">
          Start uploading recipes and get a chance at earning!
        </p>
        <Link href="/signup">
          <button className="max-w-xs text-xl sm:text-2xl p-3 rounded-xl bg-rosa text-white font-semibold">
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

export default EarnInfo;
