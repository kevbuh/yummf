import React from "react";
import Link from "next/link";

function RecipeCard({ name, author, num_saves, cook_time, rating, id }) {
  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  return (
    <div className="rounded-lg p-2 bg-white ">
      <div className="m-1">
        <p className="bg-stone-100 rounded h-40"></p>
        <div className="flex flex-row justify-evenly mt-2.5">
          <div className="badge badge-outline border-stone-200 w-2/5">
            {cook_time}
          </div>
          <div className="badge badge-outline border-stone-200 w-2/5">
            {num_saves} saves
          </div>
        </div>
        <Link href={"/recipes/" + id}>
          <p className="font-semibold text-lg mt-1 cursor-pointer">{name}</p>
        </Link>
        <p className="font-semibold text-lg">{getStars(rating)} </p>
        <p className="font-light text-sm">Author #{author}</p>
      </div>
    </div>
  );
}

export default RecipeCard;
