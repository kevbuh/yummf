import Link from "next/link";
import NavBar from "../components/NavBar";
import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardItems from "../components/DashboardItems";
import SideNavLayout from "../components/sideNavLayout";

const Explore = () => {
  return (
    <SideNavLayout>
      <DashboardItems />
    </SideNavLayout>
  );
};

export default Explore;
