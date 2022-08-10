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

      <div className="md:flex md:flex-row">
        <div className="md:w-1/5 ">
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </>
  );
};

export default SideNavLayout;
