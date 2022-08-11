import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("2 clicked");
    if (recipesButton) {
      router.push(`/search-results?result=${searchField}`);
    } else if (ingredientsButton) {
      router.push(`/search-results?result=ing_${searchField}`);
    } else if (categoryButton) {
      router.push(`/search-results?result=cat_${searchField}`);
    } else {
      router.push(`/search-results?result=com_${searchField}`);
    }
  };

  const [recipesButton, setRecipesButton] = useState(true);
  const [ingredientsButton, setIngredientsButton] = useState(false);
  const [communityButton, setCommunityButton] = useState(false);
  const [categoryButton, setCategoryButton] = useState(false);

  // console.log("1", searchField);

  return (
    <div className="navbar shadow-sm bg-white sticky top-0 z-10 ">
      <div className="sm:w-1/6">
        <Link href="/explore">
          <a className="btn btn-ghost normal-case text-2xl text-rosa sm:ml-4">
            yummf
          </a>
        </Link>
      </div>

      <div className="w-1/2 mx-auto">
        <label
          htmlFor="my-modal-4"
          className="block p-4 w-full text-sm text-black rounded-xl bg-stone-100"
        >
          {/* open modal */}
          <div className="relative ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              {/* <button onClick={(e) => onSubmit(e)}></button> */}
            </div>
            <p className="block pl-14 w-full text-sm text-gray-500 rounded-xl bg-stone-100 cursor-text truncate">
              Search Recipes, Ingredients...
            </p>
          </div>
        </label>

        {/* actual */}
        <input type="checkbox" id="my-modal-4" className="modal-toggle t" />
        <label
          htmlFor="my-modal-4"
          className="modal cursor-pointer bg-smoke-light"
        >
          <label
            className="modal-box relative py-16 border bg-white md:w-full "
            htmlFor=""
          >
            <form className="w-full mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative ">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <button onClick={(e) => onSubmit(e)}></button>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-black rounded-xl bg-stone-100"
                  placeholder="Search Recipes, Ingredients..."
                  onChange={(e) => setSearchField(e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  required
                />
              </div>
            </form>
            <div className="grid grid-cols-2 gap-1 sm:gap-4 mt-4">
              <button
                className={
                  recipesButton
                    ? "p-2 rounded-xl font-semibold bg-rosalight text-white"
                    : "p-2 rounded-xl font-semibold bg-stone-100"
                }
                onClick={() => {
                  setRecipesButton(true);
                  setIngredientsButton(false);
                  setCommunityButton(false);
                  setCategoryButton(false);
                }}
              >
                Recipes
              </button>
              <button
                className={
                  ingredientsButton
                    ? "p-2 rounded-xl font-semibold bg-rosalight text-white"
                    : "p-2 rounded-xl font-semibold bg-stone-100"
                }
                onClick={() => {
                  setRecipesButton(false);
                  setIngredientsButton(true);
                  setCommunityButton(false);
                  setCategoryButton(false);
                }}
              >
                Ingredients
              </button>
              <button
                className={
                  communityButton
                    ? "p-2 rounded-xl font-semibold bg-rosalight text-white"
                    : "p-2 rounded-xl font-semibold bg-stone-100"
                }
                onClick={() => {
                  setRecipesButton(false);
                  setIngredientsButton(false);
                  setCommunityButton(true);
                  setCategoryButton(false);
                }}
              >
                Discussions
              </button>
              <button
                className={
                  categoryButton
                    ? "p-2 rounded-xl font-semibold bg-rosalight text-white"
                    : "p-2 rounded-xl font-semibold bg-stone-100"
                }
                onClick={() => {
                  setRecipesButton(false);
                  setIngredientsButton(false);
                  setCommunityButton(false);
                  setCategoryButton(true);
                }}
              >
                Categories
              </button>
            </div>
          </label>
        </label>
      </div>
      <div className="justify-center w-1/6 md:w-1/4 lg:w-1/6 grid grid-cols-2 md:gap-4 md:grid-cols-3 content-evenly items-center">
        <Link href="/community">
          <button className="text-lg font-medium mt-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </button>
        </Link>

        <div className="dropdown dropdown-end mx-auto">
          <label tabIndex={0} className="btn btn-ghost btn-circle hover:glass ">
            <div className="w-6 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white rounded-box w-52"
          >
            <li className=" md:hidden">
              <Link href="/community">
                <a>Community</a>
              </Link>
            </li>

            <li>
              <Link href="/saved-recipes">
                <a>Saved Recipes</a>
              </Link>
            </li>

            <li>
              <Link href="/create">
                <a>Create Recipe</a>
              </Link>
            </li>
            <div className="divide-y">
              <li>
                <Link href="/account/">
                  <a className="justify-between">
                    Account
                    <span className="badge">New</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <a>Help</a>
                </Link>
              </li>
            </div>
            <li>
              <Link href="/">
                <a onClick={() => signOut({ callbackUrl: "/" })}>Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
