import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";

import { useSession, signIn, signOut } from "next-auth/react";
import Landing from "../components/Landing";

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <NavBar />
        <p>
          KOOKI DASHBOARD <br />
        </p>
      </div>
    );
  }
  return <Landing />;
};

export default Home;
