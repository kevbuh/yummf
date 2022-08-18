import type { NextPage } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  CurlyArrow,
  CurveRightArrow,
  DottedArrow,
  NormalBoldArrow,
} from "../utils/arrows";

const YumScoreInfo: NextPage = () => {
  return (
    <>
      <div className="px-6 sm:px-0">
        <div className="flex flex-row sm:grid sm:grid-cols-2 bg-white py-6 sm:p-6">
          <Link href="/">
            <p className="text-2xl font-bold my-auto cursor-pointer">yummf</p>
          </Link>
        </div>
      </div>

      <div className="items-center flex flex-col my-40 justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center ">Yum Score</p>
        {/* <p className="mx-auto font-medium text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0">
          Yummf allows you to see the best recipes, courtesy of the Yum Score.
        </p> */}
      </div>

      <DottedArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center">
        <p className="font-semibold text-5xl text-center mb-8 max-w-lg">
          Yum Score is personalized to each user, allowing you to find the best
          recipes.
        </p>
      </div>

      <NormalBoldArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center text-center max-w-lg mx-auto">
        <p className="font-semibold text-5xl mb-4">Why?</p>
        <p className="mx-auto font-medium text-2xl text-gray-500 px-6 sm:px-0 mb-6">
          Most recipes tend to be poorly written, and single 5 star ratings can
          be very vague. Why did this recipe receive 4.5 stars? Was it because
          it tasted good? Or was it well written? Yum Score attempts to solve
          these problems through a universal rating system, ranking recipes from
          1 to 100.
        </p>
      </div>

      <DottedArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center text-center max-w-lg mx-auto">
        <p className="font-semibold text-5xl mb-4">How does it work?</p>
        <p className="mx-auto font-medium text-2xl text-gray-500 px-6 sm:px-0 mb-6">
          Based on a scale of <span className="text-rosa">1 to 100</span>, Yummf
          will give a grade for each recipe to try and predict how much you
          would enjoy the recipe.
        </p>
      </div>

      <CurlyArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center text-center max-w-lg mx-auto">
        <p className="font-semibold text-5xl mb-4">
          Liked/disliked a recommendation?
        </p>
        <p className="mx-auto font-medium text-2xl text-gray-500 px-6 sm:px-0 mb-6">
          Help you and others out by giving ratings to recipes! As we improve
          Yummf, the score with get more sophisticated and accurate over time.
        </p>
      </div>

      <CurveRightArrow />

      <div className="items-center flex flex-col mt-40 justify-center align-center text-center max-w-lg mx-auto">
        <p className="font-semibold text-5xl my-4 text-center">
          How is it calculated?
        </p>
        <div>
          <p className="mx-auto font-medium text-2xl mb-8 text-gray-500 text-center px-6 sm:px-0">
            Right now we are using 8 different ingredients (parameters) into our
            ranking formula. Shown below is a loose basis for Yum Score.
          </p>{" "}
        </div>
      </div>

      <div className="items-center flex flex-col sm:flex-row mb-40 text-center justify-center align-center">
        <p className="font-semibold text-3xl my-4 text-center">
          YUMSCORE(
          <span className="text-rosa text-xl">ingredients</span>) = &nbsp;
        </p>
        <div>
          <p className="font-semibold text-3xl mt-4 text-center">100</p>{" "}
          <p className="font-semibold text-3xl text-center">-----------</p>{" "}
          <p className="font-semibold text-3xl mb-4 text-center flex flex-row">
            1+e
            <span className="mb-auto flex text-xl text-rosa">
              -(ingredients)
            </span>
          </p>
        </div>
      </div>

      <NormalBoldArrow />

      <div className="items-center flex flex-col my-40 justify-center align-center text-center max-w-lg mx-auto">
        <p className="font-semibold text-5xl my-4 text-center">
          How do I improve my score?
        </p>
        <p className="mx-auto font-medium text-2xl mb-8 text-gray-500 text-center px-6 sm:px-0">
          Write high quality recipes that taste good and have great ingredient
          lists and descriptions. This will allow for better reviews, more
          clicks, and more saves &rarr; all factors that go into the Yum Score.
        </p>{" "}
      </div>

      <CurveRightArrow />

      <div className="items-center flex flex-col mt-24 mb-40 justify-center align-center">
        <p className="font-semibold text-5xl my-4">Start Creating</p>

        <p className="mx-auto font-medium text-2xl mb-8 text-gray-500 text-center px-6 sm:px-0">
          Start uploading recipes and get cookin&apos;!
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

export default YumScoreInfo;
