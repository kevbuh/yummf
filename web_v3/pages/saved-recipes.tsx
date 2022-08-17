import { unstable_getServerSession } from "next-auth/next";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../utils/prisma";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import RecipeCard from "../components/RecipeCard";

const SavedRecipesPage: NextPage = ({
  session,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Saved Recipes</p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {data?.savedRecipes?.map((d: any, index: number) => {
            return (
              <RecipeCard
                key={index}
                image_url={d.image_url}
                name={d.name.slice(0, 36)}
                caption={d.caption.slice(0, 42)}
                id={d.id}
                qualityRating={d.qualityRating}
                tasteRating={d.tasteRating}
                overallRating={d.overallRating}
                numSaves={d.numSaves}
                numViews={d.numViews}
                ratingsLength={d.ratings?.length}
                authorName={d.authorDisplayName}
              />
            );
          })}
        </div>

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
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

  return {
    props: {
      session: session,
      data: JSON.parse(JSON.stringify(savedRecipes)),
    },
  };
}

export default SavedRecipesPage;
