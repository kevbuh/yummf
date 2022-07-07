import React from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";

function dashboard() {
  return (
    <div>
      <NavBar />
      <div>dashboard</div>
      <Link href="/">
        <a>Go to home</a>
      </Link>
    </div>
  );
}

export default dashboard;
