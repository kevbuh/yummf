import type { NextPage, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import NavBar from "../components/NavBar";
import React from "react";
import prisma from "../utils/prisma";

import { useSession } from "next-auth/react";
import Landing from "../components/Landing";
import Sidebar from "../components/Sidebar";
import DashboardItems from "../components/DashboardItems";

import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

const Home: NextPage = ({
  recipes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="mb-8">
        <NavBar />
        <div className="flex lg:flex-row xl:mx-8">
          <div className="hidden sm:visible lg:w-1/5 sm:flex sm:flex-col lg:h-screen sm:sticky sm:top-20">
            <div className="sm:px-3 sm:mt-3">
              <Link href="/create">
                <button className="rounded-xl hover:bg-rosa hover:text-white font-semibold py-3 mt-2.5 text-xl w-full border border-stone-100 shadow-sm ">
                  Create
                </button>
              </Link>
            </div>
            <Sidebar />
          </div>
          <div className="w-full lg:w-4/5">
            <DashboardItems recipes={recipes} />
          </div>
        </div>
      </div>
    );
  }
  // Else if not in session
  return <Landing />;
};

export async function getServerSideProps(context: any) {
  const recipes = await prisma?.recipe?.findMany();

  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };
}

export default Home;
