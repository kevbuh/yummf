import React from "react";
import RecipeCard from "../components/RecipeCard";

const MoreLikeThis = () => {
  return (
    <div>
      <p className="text-2xl mb-4">View more recipe like this!</p>
      <div className="grid grid-cols-3 gap-4">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    </div>
  );
};

export default MoreLikeThis;
