import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useQuery } from "react-query";

import { getUser } from "../fetches/allFetches";
import { useSession, signIn } from "next-auth/react";

function ProfilePage() {
  // const { isLoading, isError, isSuccess, data, error } = useQuery(
  //   "getUserData", // could probably add cookie to differentiate
  //   getUser
  // );
  const { data: session } = useSession();

  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Profile</p>
        </div>

        {session ? (
          <>
            Signed in as {session.user.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}

        {/* {isLoading && <p>loading...</p>}
        {isError && <p>{error.message}</p>}
        {isSuccess ? (
          <div>
            <p>{data.user.email}</p>
            <p>Joined on {data.user.created_at}</p>
          </div>
        ) : null} */}

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
