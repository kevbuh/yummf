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
  const YumScoreCalc = YumScore(
    tasteRating,
    overallRating,
    qualityRating,
    ratingsLength,
    numViews,
    numSaves
  );

  return (
    <div className="rounded-lg  border border-stone-100 shadow-sm cursor-pointer ">
      <Link href={"/recipes/" + id}>
        <div>
          <p className="bg-stone-100  h-48"></p>

          <div className="my-2 px-2 sm:flex sm:flex-row grid grid-cols-2 gap-1">
            <div className="mb-2 truncate">
              <p className="font-semibold mt-2 truncate">{name}</p>
              <p className="text-sm text-gray-500 truncate">{caption}</p>
            </div>
            <div
              className="rounded-lg p-2 bg-stone-100 my-auto ml-auto tooltip"
              data-tip={YumScoreCalc > 70 ? "Good " : "Bad"}
            >
              <p className="text-xl">{YumScoreCalc}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
