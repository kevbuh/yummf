import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useQuery } from "react-query";

import { useState } from "react";

function ProfilePage() {
  const getUser = async () => {
    console.log("calling fetch");
    const apiRes = await fetch("/api/user");
    const data = await apiRes.json();
    return data;
  };

  const { isLoading, isError, isSuccess, data, error } = useQuery(
    "getUserData",
    getUser
  );

  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Profile</p>
        </div>

        <button onClick={getUser}>User</button>
        {isLoading && <p>loading...</p>}
        {isError && <p>{error.message}</p>}
        {isSuccess && <p>{data.user.email}</p>}

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
