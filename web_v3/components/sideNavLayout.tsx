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
      <div className="flex lg:flex-row">
        <div className="hidden sm:visible md:w-1/5 sm:flex sm:flex-col lg:h-screen sm:sticky sm:top-20">
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </>
  );
};

export default SideNavLayout;
