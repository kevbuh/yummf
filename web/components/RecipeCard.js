import React from "react";

function RecipeCard({ name, author, num_saves, cook_time, rating }) {
  return (
    <div className="rounded-lg p-2 bg-white">
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
        <p className="font-semibold text-lg mt-1">{name}</p>
        <p className="font-semibold text-lg">{rating} ⭐️ </p>
        <p className="font-light text-sm">Author #{author}</p>
      </div>
    </div>
  );
}

export default RecipeCard;
