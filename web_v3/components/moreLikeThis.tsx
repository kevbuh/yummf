import React from "react";
import RecipeCard from "./RecipeCard";

const MoreLikeThis: any = () => {
  // const data = await fetch("/api/get_latest");
  // console.log("yeehhh", data);

  return (
    <>
      <p className="text-2xl mb-4">View the latest recipes!</p>
      <div className="grid grid-cols-3 gap-4">
        <RecipeCard recipes={null} />
        <RecipeCard recipes={null} />
        <RecipeCard recipes={null} />
      </div>
    </>
  );
};

export default MoreLikeThis;
