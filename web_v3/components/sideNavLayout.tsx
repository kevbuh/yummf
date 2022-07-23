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
            <Link href="/create">
              <button className="rounded-xl hover:bg-rosa hover:text-white font-semibold py-3 mt-2.5 text-xl w-full bg-stone-100 ">
                Create
              </button>
            </Link>
          </div>
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </>
  );
};

export default SideNavLayout;
