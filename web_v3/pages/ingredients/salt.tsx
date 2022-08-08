import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import SignUpBanner from "../../components/SignUpBanner";
import Link from "next/link";

const SaltInfo: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <NavBar />
      <div className="p-6 max-w-4xl">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/explore">
                <a>Explore</a>
              </Link>
            </li>
            <li>
              <Link href="/ingredients">
                <a>Ingredients</a>
              </Link>
            </li>
            <li>
              <a className="truncate">Salt</a>
            </li>
          </ul>
        </div>
        <p className="text-6xl font-semibold mb-8">
          One of the most common ingredients
        </p>
        <p className="font-light">Salt 2</p>
      </div>
      {!session && <SignUpBanner />}
      <Footer />
    </>
  );
};

export default SaltInfo;
