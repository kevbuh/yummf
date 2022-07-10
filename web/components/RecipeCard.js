import React from "react";
// import Link from "next/link";
import Image from "next/image";
import { API_URL } from "../config";

function RecipeCard({ name, author, num_saves, cook_time, rating, id, image }) {
  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  // console.log("!!!!:!:!:", image);

  return (
    <div className="rounded-lg p-2 border border-stone-100 shadow-sm">
      <div className="m-1">
        {image && image !== null && image !== undefined ? (
          <div className="bg-stone-100 rounded h-48 relative  mb-6">
            <Image
              className="rounded-xl cursor-pointer"
              loader={() => image}
              src={image}
              objectFit="cover"
              unoptimized={true}
              width={300}
              height={300}
              position="relative"
            />
          </div>
        ) : (
          <p className="bg-stone-100 rounded h-48"></p>
        )}
        <div className="flex flex-row justify-evenly mt-2.5">
          <div className="badge badge-outline border-stone-200 w-2/5">
            {cook_time}
          </div>
          <div className="badge badge-outline border-stone-200 w-2/5">
            {num_saves} saves
          </div>
        </div>
        <p className="font-semibold text-lg mt-1 cursor-pointer">{name}</p>
        <p className="font-semibold text-lg">{getStars(rating)} </p>
        <p className="font-light text-sm">Author #{author}</p>
      </div>
    </div>
  );
}

export default RecipeCard;
