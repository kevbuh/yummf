import React from "react";
import Link from "next/link";
import { YumScore } from "../utils/yum_score";
// import mixpanel from "mixpanel-browser";

type RecipeProps = {
  name: string;
  id: number;
  caption: string;
  ratingsLength: number;
  qualityRating: number;
  tasteRating: number;
  overallRating: number;
  numViews: number;
  numSaves: number;
};

function RecipeCard({
  name,
  id,
  caption,
  ratingsLength,
  qualityRating,
  overallRating,
  tasteRating,
  numSaves,
  numViews,
}: RecipeProps) {
  const getStars = (num_stars: Number | String) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return steps;
  };

  const YumScoreCalc = YumScore(
    tasteRating,
    overallRating,
    qualityRating,
    ratingsLength,
    numViews,
    numSaves
  );

  return (
    <div className="rounded-lg p-2 border border-stone-100 shadow-sm cursor-pointer ">
      <Link href={"/recipes/" + id}>
        <div>
          <p className="bg-stone-100 rounded-lg h-48"></p>

          <div className="my-2 sm:flex sm:flex-row grid grid-cols-2 gap-1">
            <div className="sm:w-9/12 ">
              <p className="font-semibold mt-2 truncate">{name}</p>
              <p className="text-sm mb-2  text-gray-500 truncate">{caption}</p>
            </div>
            <div
              className="sm:w-3/12 rounded-lg p-2 bg-stone-100 flex  sm:m-auto tooltip"
              data-tip={YumScoreCalc > 72 ? "Good Yum Score" : "Bad Yum Score"}
            >
              <p className="text-xl flex flex-row text-center m-auto">
                {YumScoreCalc}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
