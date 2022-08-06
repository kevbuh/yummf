import React from "react";
import NewCard from "../pages/ArticleComponent";

function LandingLearn() {
  return (
    <div className="rounded-xl bg-stone-200 mx-4 px-6 py-16 flex flex-row justify-around">
      <div className="grid grid-cols-1 my-auto mr-4 max-w-xs">
        <div className="flex flex-row">
          <p className="text-4xl font-semibold italic mb-2">Learn</p>
          <p className="text-4xl font-medium mb-2 not-italic">&nbsp;to Cook </p>
        </div>

        <p className=" font-light my-4">
          {" "}
          Find out everything you need to know about cooking.{" "}
        </p>
        <button className="rounded-xl bg-black text-white font-semibold p-2 ">
          Start Studying
        </button>
      </div>

      <div className="rounded-xl grid grid-cols-3 gap-4 w-full">
        <NewCard name="Cooking Basics" id={1} />
        <NewCard name="Please, Don't Overcook Your Eggs" id={2} />
        <NewCard name="How To Make Fluffy Pancakes" id={3} />
      </div>
    </div>
  );
}

export default LandingLearn;
