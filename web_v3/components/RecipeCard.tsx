import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StarSVG } from "../utils/socialSVGs";
// import mixpanel from "mixpanel-browser";

type RecipeProps = {
  name: string;
  id: number;
  caption: string;
  rating: number;
  length: number;
};

function RecipeCard({ name, id, caption, rating, length }: RecipeProps) {
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

  return (
    <div className="rounded-lg p-1 border border-stone-100 shadow-sm cursor-pointer">
      <Link href={"/recipes/" + id}>
        <div className="m-1">
          {/* {image && image !== null && image !== undefined ? (
            <div className=" rounded relative">
              <Image
                className="rounded-lg cursor-pointer"
                loader={() => image}
                src={image}
                objectFit="cover"
                unoptimized={true}
                width={300}
                height={300}
                // position="relative"
              />
            </div>
          ) : ( */}
          <p className="bg-stone-100 rounded-lg h-48"></p>

          {/* )} */}
          <div className="my-2">
            <p className="font-semibold text-md mt-2 truncate">{name}</p>
            <p className=" text-sm mb-2  text-gray-500 truncate">{caption}</p>
          </div>
          <div className=" my-2 rounded-lg px-2 py-2 bg-stone-100">
            <p className="mx-auto text-center text-sm flex flex-row">
              {rating}
              <StarSVG />
              ,&nbsp;&nbsp;
              {length > 0 ? length : "No "} Ratings
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
