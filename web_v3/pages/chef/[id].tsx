import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import React from "react";
import prisma from "../../utils/prisma";
import SignUpBanner from "../../components/SignUpBanner";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import RecipeCard from "../../components/RecipeCard";

const Chef: NextPage = ({
  data,
  createdPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/explore">
                <a>Explore</a>
              </Link>
            </li>
            <li>
              <Link href="/learn">
                <a>Chefs</a>
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-4xl font-semibold mb-8">Public Profile</p>

        <div className="avatar">
          <div className="w-24 rounded-full mr-8">
            <img
              src={session?.user?.image as string}
              alt="User profile image"
            />
          </div>
          <p className="text-3xl font-semibold mb-8">{session?.user?.name}</p>
        </div>
        <p className="text-2xl font-semibold mt-8 mb-4">Liked Posts</p>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {data?.savedRecipes?.map((d: any, index: number) => {
            return (
              <RecipeCard
                key={index}
                name={d.name.slice(0, 36)}
                author={d.user_id}
                cook_time={d.cook_time}
                caption={d.caption.slice(0, 42)}
                id={d.id}
              />
            );
          })}
        </div>
        <p className="text-2xl font-semibold mb-8">Liked Playlists</p>
        <p className="text-2xl font-semibold mb-8">Created Recipes</p>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {createdPosts?.map((d: any, index: number) => {
            return (
              <RecipeCard
                key={index}
                name={d.name.slice(0, 36)}
                author={d.user_id}
                cook_time={d.cook_time}
                caption={d.caption.slice(0, 42)}
                id={d.id}
              />
            );
          })}
        </div>
        <p className="text-2xl font-semibold mb-8">Created Playlists</p>
      </div>
      {!session && <SignUpBanner />}
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

  if (!session) {
    return {
      redirect: {
        destination: "/signup",

        permanent: false,
      },
    };
  }

  const savedRecipes = await prisma?.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      savedRecipes: true,
    },
  });

  const result =
    await prisma.$queryRaw`SELECT * FROM "Recipe" WHERE "authorId"=${savedRecipes.id}`;

  return {
    props: {
      session: session,
      createdPosts: JSON.parse(JSON.stringify(result)),
      data: JSON.parse(JSON.stringify(savedRecipes)),
    },
  };
}

export default Chef;
