import Link from "next/link";
import NavBar from "../components/NavBar";
import React from "react";
import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const SideNavLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <div className="flex lg:flex-row ">
        <div className="hidden sm:visible md:w-1/5 sm:flex sm:flex-col lg:h-screen sm:sticky sm:top-20">
          <div className="sm:px-3 sm:mt-3">
            <div className="dropdown dropdown-right w-full">
              <button
                tabIndex={0}
                className="rounded-xl hover:bg-rosa hover:text-white font-semibold py-3 mt-2.5 text-xl w-full bg-stone-100 "
              >
                Create
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 px-8 shadow bg-white rounded-box w-60"
              >
                <li>
                  <Link href="/create-new">
                    <a>Create Recipe</a>
                  </Link>
                </li>
                <li>
                  <Link href="/create-category">
                    <a>Create Playlist</a>
                  </Link>
                </li>
              </ul>
            </div>
            {/* </Link> */}
          </div>
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </>
  );
};

export default SideNavLayout;
