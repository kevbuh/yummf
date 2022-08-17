import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-1 my-4 mx-2">
        <Link href="/explore">
          <button
            className={
              router.pathname == "/explore"
                ? "p-2 rounded-xl bg-black font-medium m-1 text-white"
                : "p-2 rounded-xl bg-stone-100 font-medium m-1"
            }
          >
            Recipes
          </button>
        </Link>
        <Link href="/playlists">
          <button
            className={
              router.pathname == "/playlists"
                ? "p-2 rounded-xl bg-black font-medium m-1 text-white"
                : "p-2 rounded-xl bg-stone-100 font-medium m-1"
            }
          >
            Playlists
          </button>
        </Link>

        <Link href="/ingredients">
          <button
            className={
              router.pathname == "/ingredients"
                ? "p-2 rounded-xl bg-black font-medium m-1 text-white"
                : "p-2 rounded-xl bg-stone-100 font-medium m-1"
            }
          >
            Ingredients
          </button>
        </Link>
        {/* </Link> */}
        <Link href="/categories">
          <button
            className={
              router.pathname == "/categories"
                ? "p-2 rounded-xl bg-black font-medium m-1 text-white"
                : "p-2 rounded-xl bg-stone-100 font-medium m-1"
            }
          >
            Categories
          </button>
        </Link>
      </div>
      {!session && (
        <div className="px-3">
          <hr />
          <p className="text-gray-500 font-semibold text-sm mt-4 text-center">
            Log in to get personalized recommendations, save recipes, and follow
            chefs.
          </p>
          <button
            className=" text-rosa border-2 border-rosa hover:bg-rosa rounded-xl p-2 w-full font-semibold hover:text-white mt-2 mb-4"
            onClick={() => router.push("/signup")}
          >
            Log in
          </button>
        </div>
      )}
      {/* <div className="px-3">
          <hr />
        </div>
        <div className="px-3 mt-4 md:flex md:flex-wrap hidden md:visible">
          <button className="p-2 rounded-xl bg-stone-100 font-medium mr-1 my-1">
            Breakfast
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Lunch
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Dinner
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Snacks
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Drinks
          </button>
        </div>
        <div className="px-3 pt-3 hidden md:visible">
          <hr />
        </div> */}
      {/* <div className="collapse collapse-arrow hidden md:visible">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">Ingredients</div>
          <div className="collapse-content ">
            <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
              Steak
            </button>
            <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
              Onions
            </button>
            <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
              Fish
            </button>
            <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
              Papaya
            </button>
          </div>
        </div> */}
    </div>
  );
}

export default Sidebar;
