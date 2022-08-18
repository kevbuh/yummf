import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import {
  DiscussionIcon,
  ProfileIcon,
  SearchIconNavBar,
  UploadIcon,
  YummfLogoSmallRed,
} from "../utils/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";

const NavBar = () => {
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);
  const router = useRouter();

  const { data: session } = useSession();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (recipesButton) {
      router.push(`/search-results?result=${searchField}`);
    } else if (ingredientsButton) {
      router.push(`/search-results?result=ing_${searchField}`);
    } else if (categoryButton) {
      router.push(`/search-results?result=cat_${searchField}`);
    } else {
      router.push(`/search-results?result=qas_${searchField}`);
    }
  };

  const [recipesButton, setRecipesButton] = useState(true);
  const [ingredientsButton, setIngredientsButton] = useState(false);
  const [communityButton, setCommunityButton] = useState(false);
  const [categoryButton, setCategoryButton] = useState(false);

  return (
    <div className="navbar shadow-sm bg-white sticky top-0 z-10 ">
      <div className="sm:w-1/6">
        <Link href="/explore">
          <a className="p-1 font-bold font-serif normal-case text-xl sm:text-2xl text-rosa sm:ml-4 flex ">
            {/* yummf <span className="italic text-sm mb-auto ">&nbsp; beta</span> */}
            <YummfLogoSmallRed />
          </a>
        </Link>
      </div>
      {session?.displayName == null && session && (
        <>
          {/* actual */}
          <input
            type="checkbox"
            id="my-modal-5"
            className="modal-toggle t modal-open"
            // checked={true}
            defaultChecked={true}
            // checked={true}
          />
          <label
            htmlFor="my-modal-5"
            className="modal cursor-pointer bg-smoke-light"
          >
            <label
              className="modal-box relative py-8 border bg-white md:w-full "
              htmlFor=""
            >
              <p className="mb-4 font-semibold text-4xl flex justify-center ">
                Welcome to Yummf
              </p>
              <Formik
                initialValues={{
                  displayName: "",
                  authorId: session?.userId,
                }}
                onSubmit={async (values) => {
                  console.log("er");
                  const apiRes: any = await fetch("/api/update_displayname", {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      values: values,
                      userEmail: session?.user?.email,
                    }),
                  });

                  const response = await apiRes.json();

                  if (response.data == 201) {
                    router.reload();
                  } else {
                    console.log("failed to update username");
                  }
                }}
              >
                <Form className=" mt-8">
                  <Field
                    id="displayName"
                    name="displayName"
                    placeholder="Choose a username..."
                    className="block p-4 mx-auto placeholder-gray-400 text-lg rounded-xl border-stone-100 border-4  "
                  />
                  <ErrorMessage name="displayName" />

                  <button
                    className="p-3 mt-8 w-full rounded-xl font-semibold bg-stone-100 hover:bg-rosalight hover:text-white"
                    type="submit"
                  >
                    <p className="m-auto">Next</p>
                  </button>
                </Form>
              </Formik>
            </label>
          </label>
        </>
      )}

      <div className="grid grid-cols-4 gap-4  ml-auto ">
        <>
          <label
            htmlFor="my-modal-4"
            className="p-4 rounded-xl hover:bg-stone-100 cursor-pointer"
          >
            {/* open modal */}
            <SearchIconNavBar />
          </label>

          {/* actual */}
          <input type="checkbox" id="my-modal-4" className="modal-toggle t" />
          <label
            htmlFor="my-modal-4"
            className="modal cursor-pointer bg-smoke-light"
          >
            <label
              className="modal-box relative py-8 border bg-white md:w-full "
              htmlFor=""
            >
              <p className="mb-4 font-semibold text-4xl flex justify-center ">
                Search
              </p>
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
              <div className="ml-1 sm:ml-0 grid grid-cols-2 gap-1 sm:gap-4 mt-4">
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
              <button
                className="p-2 mt-4 w-full rounded-xl font-semibold bg-stone-100 hover:bg-rosalight hover:text-white"
                onClick={(e) => {
                  onSubmit(e);
                }}
              >
                Search
              </button>
            </label>
          </label>
        </>

        <div className="dropdown dropdown-end sm:mx-auto">
          <label
            tabIndex={0}
            className="text-lg font-medium mt-1 cursor-pointer "
          >
            <div className="p-4 rounded-xl hover:bg-stone-100">
              <UploadIcon />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white rounded-box w-52"
          >
            <li>
              <Link href="/create">
                <a>Recipe</a>
              </Link>
            </li>

            <li>
              <Link href="/community/create">
                <a>Discussion</a>
              </Link>
            </li>
          </ul>
        </div>

        <Link href="/community">
          <button className="p-4 rounded-xl hover:bg-stone-100">
            <DiscussionIcon />
          </button>
        </Link>

        <div className="dropdown dropdown-end sm:mx-auto">
          <label
            tabIndex={0}
            className="text-lg font-medium mt-1 cursor-pointer "
          >
            <div className="p-4 rounded-xl hover:bg-stone-100">
              <ProfileIcon />
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
