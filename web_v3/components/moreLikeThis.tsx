import React from "react";
import RecipeCard from "./RecipeCard";

const MoreLikeThis = () => {
  return (
    <div>
      <p className="text-2xl mb-4">View more recipe like this!</p>
      <div className="grid grid-cols-3 gap-4">
        <RecipeCard recipes={null} />
        <RecipeCard recipes={null} />
        <RecipeCard recipes={null} />
      </div>
    </div>
  );
};

export default MoreLikeThis;
