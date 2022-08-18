import type { NextPage } from "next";
import Footer from "../components/Footer";
import Link from "next/link";
import { CurlyArrow, DottedArrow } from "../utils/arrows";
import { BigGitHubForkSVG, GitHubForkSVG } from "../utils/socialSVGs";

const ForkInfoPage: NextPage = () => {
  return (
    <>
      <div className="px-6 sm:px-0">
        <div className="flex flex-row sm:grid sm:grid-cols-2 bg-white py-6 sm:p-6">
          <Link href="/">
            <p className="text-2xl font-bold my-auto cursor-pointer">yummf</p>
          </Link>
          <div className="ml-auto grid grid-cols-2 sm:gap-4"></div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="items-center flex flex-col my-40 justify-center align-center">
          <p className="font-semibold text-5xl my-4 text-center">
            Fork a Recipe
          </p>
        </div>

        <DottedArrow />

        <div className="items-center flex flex-col my-40 text-center justify-center align-center">
          <p className="font-semibold text-5xl my-4 text-center">
            Forking should be easy. We made it three simple steps.
          </p>
        </div>

        <CurlyArrow />

        <div className="items-center flex flex-col my-40 text-center">
          <p className="font-semibold text-5xl my-4 text-center">
            1. Find a recipe you like
          </p>
          <p className="font-semibold text-5xl my-4 text-center flex flex-row">
            2. Click on the&nbsp;
            <BigGitHubForkSVG />
            &nbsp;Fork button
          </p>
          <p className="font-semibold text-5xl my-4 text-center">
            3. Confirm, and start editing!
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForkInfoPage;
