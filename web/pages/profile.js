import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUser } from "../fetches/allFetches";

function ProfilePage() {
  const router = useRouter();
  const { registered, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    "getUserData", // could probably add cookie to differentiate
    getUser
  );

  if (
    typeof window !== "undefined" &&
    !isAuthenticated &&
    !isLoading &&
    !loading &&
    data.user.length > 0
  )
    router.push("/");

  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Profile</p>
        </div>
        {isLoading && <p>loading...</p>}
        {isError && <p>{error.message}</p>}
        {isSuccess ? (
          <div>
            <p>Welcome, {data?.user?.email}</p>
          </div>
        ) : null}

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
