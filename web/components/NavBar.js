import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    router.push(`/search_results?result=${searchField}`);
  };

  return (
    <div class="navbar border-b">
      <div class="w-1/6">
        <Link href="/dashboard">
          <a class="btn btn-ghost normal-case text-2xl text-rosa mx-auto">
            kooki
          </a>
        </Link>
      </div>

      <div className="w-2/3 ">
        <form className="w-full  ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-zine-400"
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
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-black rounded-lg dark:bg-stone-100 bg-stone-100"
              placeholder="Search Recipes, Ingredients..."
              onChange={(e) => setSearchField(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              required
            />
          </div>
        </form>
      </div>
      <div className="justify-center w-1/6 grid grid-cols-2 content-evenly items-center">
        <button>
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <div class="dropdown dropdown-end mx-auto">
          <label tabIndex="0" class="btn btn-ghost btn-circle hover:glass ">
            <div class="w-6 rounded-full">
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
            tabIndex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white rounded-box w-52"
          >
            <li>
              <a>Notifications</a>
            </li>
            <li>
              <a>Saved Recipes</a>
            </li>
            <li>
              <a>Grocery List</a>
            </li>
            <li>
              <a>Create Recipe</a>
            </li>
            <div className="divide-y">
              <li>
                <Link href="/account-settings">
                  <a class="justify-between">
                    Account
                    <span class="badge">New</span>
                  </a>
                </Link>
              </li>
              <li>
                <a>Help</a>
              </li>
            </div>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
