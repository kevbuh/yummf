import React from "react";

function RecipeCard() {
  return (
    <div className="rounded-lg p-2 bg-white">
      <div className="m-1">
        <p className="bg-stone-100 rounded h-40"></p>
        <p className="font-semibold text-lg mt-1">Name</p>
        <p className="font-semibold text-lg">Rating</p>
      </div>
    </div>
  );
}

export default RecipeCard;
