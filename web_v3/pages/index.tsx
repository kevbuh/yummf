import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import NavBar from "../components/NavBar";
import React from "react";
import prisma from "../utils/prisma";

import { useSession } from "next-auth/react";
import Landing from "../components/Landing";
import Sidebar from "../components/Sidebar";
import DashboardItems from "../components/DashboardItems";

const Home: NextPage = ({
  recipes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();

  // console.log("####", recipes);

  if (session) {
    return (
      <div className="mb-8">
        <NavBar />
        <div className="flex lg:flex-row xl:mx-20">
          <div className="hidden sm:visible lg:w-1/5 sm:flex sm:flex-col lg:h-screen sm:sticky sm:top-20">
            <div className="sm:px-3 sm:mt-3">
              <Link href="/create">
                <button className="rounded-xl hover:bg-rosa hover:text-white font-semibold py-2.5 text-xl w-full bg-stone-100 ">
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
  return <Landing />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipes = await prisma?.recipe?.findMany();
  return { props: { recipes: JSON.parse(JSON.stringify(recipes)) } };
};

export default Home;
