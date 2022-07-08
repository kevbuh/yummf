import React from "react";

function RecipeCard() {
  return (
    <div className="rounded-lg p-2 bg-white">
      <div className="m-1">
        <p className="bg-stone-100 rounded h-40"></p>
        <div className="flex flex-row justify-evenly mt-2.5">
          <div className="badge badge-outline border-stone-200 w-2/5">
            10 mins
          </div>
          <div className="badge badge-outline border-stone-200 w-2/5">
            93 saves
          </div>
        </div>
        <p className="font-semibold text-lg mt-1">Name</p>
        <p className="font-semibold text-lg">Rating</p>
        <p className="font-light text-sm">Author</p>
      </div>
    </div>
  );
}

export default RecipeCard;
