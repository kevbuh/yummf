import { InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";

import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import prisma from "../../../utils/prisma";
import { authOptions } from "../../api/auth/[...nextauth]";

function CreateCommunityQuestion({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/signup");
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-6xl px-6 mx-auto mb-4 min-h-screen">
        <div className=" px-6 mt-8">
          <div className="rounded-xl w-full mt-16 mb-8">
            <p className="font-semibold text-5xl mb-4">Start a fork </p>
            <p className="font-medium text-xl mb-8 max-w-lg">
              Forking allow you to copy and edit your favorite recipes to start
              freely making your own edits to them.
            </p>
          </div>
          <button
            className="flex max-w-xs text-xl p-3 rounded-xl font-semibold  bg-rosa text-white"
            onClick={async () => {
              const apiRes: any = await fetch("/api/create_fork", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  name: data.name,
                  cookTime: data.cookTime,
                  servingSize: data.servingSize,
                  caption: data.caption,
                  sourceURL: data.sourceURL,
                  ingredientList: data.ingredientList,
                  directions: data.directions,
                  authorId: session?.userId,
                }),
              });

              const response = await apiRes.json();

              if (response?.data !== 400) {
                router.push(`/confirm-recipe?type=${response.data}`);
              } else {
                console.log("failed to fork");
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  // const session = await unstable_getServerSession(
  //   context.req,
  //   context.res,
  //   authOptions
  // );

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/signup",
  //       permanent: false,
  //     },
  //   };
  // }

  const thisRecipe = await prisma?.recipe.findUnique({
    where: {
      id: parseInt(query.id),
    },
  });

  // console.log("q", thisRecipe);

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisRecipe)),
    },
  };
};

export default CreateCommunityQuestion;
