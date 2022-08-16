import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState } from "react";

import { GitHubForkSVG, SaveSVG, ShareSVG, StarSVG } from "../utils/socialSVGs";

type ComponentProps = {
  data: any;
  session: any;
};

function RecipeSidebar({ data, session }: ComponentProps) {
  type RatingProps = {
    category: string;
    rating: number;
  };

  const router = useRouter();

  const Rating = ({ category, rating }: RatingProps) => {
    return (
      <dl>
        <dt className="text-sm  text-gray-500 ">{category}</dt>
        <dd className="flex items-center">
          <div className="w-full bg-stone-100 rounded h-2 mr-2">
            <div
              className="bg-black h-2 rounded"
              style={{ width: `${rating * 20}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500 ">{rating}</span>
        </dd>
      </dl>
    );
  };

  const OwnRecipeButtons = () => {
    return (
      <div className="grid grid-cols-2 gap-4 mb-2">
        <button
          className="p-2 bg-stone-100 hover:bg-fresh hover:text-white font-semibold rounded-xl"
          onClick={() => {
            router.push(`/create?edit=${data.id}`);
          }}
        >
          Edit
        </button>
        <button
          className="p-2 bg-stone-100 hover:bg-red-500 hover:text-white font-semibold rounded-xl"
          onClick={() => {
            fetch(`/api/delete_recipe`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data.id),
            }).catch((error) => console.log("error", error));
            router.push("/explore");
          }}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="px-6 sm:py-6 mb-8 ">
      {session?.userId == data?.authorId && <OwnRecipeButtons />}

      <p className="text-4xl font-semibold mb-4 ">{data?.name.slice(0, 100)}</p>

      <Link href="/chef/1">
        <div className="flex flex-row mb-4 cursor-pointer">
          <div className="h-12 w-12 bg-stone-100 rounded-full mr-2"></div>
          <div>
            <p className="text-stone-400 text-sm">Author</p>
            <p className="font-semibold ">{data?.authorDisplayName}</p>
          </div>
        </div>
      </Link>
      <hr />
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {data?.likedBy[0]?.email === session?.user?.email ? (
          <p className="mr-auto my-auto flex flex-row text-gray-500">Saved!</p>
        ) : (
          <button
            className="mr-auto my-auto flex flex-row text-gray-500"
            onClick={() => {
              try {
                fetch("/api/save_recipe", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    recipeId: data.id,
                    userEmail: session?.user?.email,
                  }),
                });
                router.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <SaveSVG />
            <p>{data?.numSaves} Saves</p>
          </button>
        )}

        <div className="dropdown">
          <button
            className="mr-auto my-auto flex flex-row text-gray-500"
            tabIndex={0}
          >
            <ShareSVG />
            Share
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-3 shadow w-full rounded-box bg-white"
          >
            <li>
              <a className="p-1 text-gray-500">Email</a>
            </li>
            <li>
              <a className="p-1 text-gray-500">Link</a>
            </li>
            <li>
              <a className="p-1 text-gray-500">Pinterest</a>
            </li>
          </ul>
        </div>

        <button
          className="mr-auto my-auto flex flex-row text-gray-500"
          onClick={() => router.push(`fork/${data.id}`)}
        >
          <GitHubForkSVG /> Fork
        </button>

        <div className="dropdown">
          <button
            className="mr-auto my-auto text-gray-500 font-bold"
            tabIndex={0}
          >
            ...
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-3 shadow w-full rounded-box bg-white"
          >
            <li>
              <Link href="/help">
                <a className="p-1 text-gray-500">Report</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="my-8">
        <div className="grid grid-cols-2 ">
          <p className="text-xl font-semibold mb-2">Rating</p>

          <button className="text-sm text-gray-500 ml-auto">
            Show all reviews
          </button>
        </div>
        <div className="flex flex-row mb-4">
          <StarSVG />

          <p className="font-semibold text-lg">
            4.88 - {data?.ratings.length > 0 ? data?.ratings.length : "No"}{" "}
            reviews
          </p>
          <button className="ml-auto text-sm text-gray-500 my-auto">
            Create review
          </button>
        </div>
        <Rating category="Taste" rating={4.5} />
        <Rating category="Presentation" rating={3.8} />
        <Rating category="Value" rating={4.8} />
      </div>
      <hr />
      <div className="my-8">
        <p className="text-xl font-semibold mb-4">Time</p>
        <div className="bg-stone-100 rounded-xl p-2 mb-4">
          <p className="text-lg">Total</p>
          <p className="font-semibold text-xl ">
            {data?.cookTime.slice(0, 36)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-100 rounded-xl p-2">
            <p className="text-lg">Prep</p>
            <p className="font-semibold text-xl">25 mins</p>
          </div>
          <div className="bg-stone-100 rounded-xl p-2">
            <p className="text-lg">Cook</p>
            <p className="font-semibold text-xl">40 mins</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="my-8">
        <p className="text-xl font-semibold mb-4">Serving Size</p>
        <div className="bg-stone-100 rounded-xl p-2 mb-4">
          <p className="text-lg">Servings</p>
          <p className="font-semibold text-xl truncate">
            {data?.servingSize.slice(0, 36)}
          </p>
        </div>
      </div>
      <hr />
      <div className="my-8">
        <p className="text-xl font-semibold mb-4">Tags</p>
        <div>
          <button className="p-2 rounded-xl bg-stone-100 font-medium ">
            Vegetarian
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Fast
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeSidebar;
