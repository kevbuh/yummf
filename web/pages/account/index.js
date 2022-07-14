import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getUser } from "../../fetches/allFetches";
import { useRouter } from "next/router";

function AccountSettingsPage() {
  // const { isLoading, isError, isSuccess, data, error } = useQuery(
  //   "getUserData", // could probably add cookie to differentiate
  //   getUser
  // );
  const { registered, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    "getUserData", // could probably add cookie to differentiate
    getUser
  );
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    !isAuthenticated &&
    !isLoading &&
    !loading &&
    !data
  ) {
    router.push("/");
  }

  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg sm:w-2/3 item-center mx-4 sm:mx-auto">
        <div>
          <p className="text-4xl mb-8">Account</p>
          <div className="flex flex-row">
            <div className="avatar">
              <div className="w-24 rounded-full mr-8">
                {/* <img src="https://placeimg.com/192/192/people" /> */}
              </div>
            </div>
            <div className="my-auto">
              {isLoading && <p>loading...</p>}
              {isError && <p>{error.message}</p>}
              {isSuccess ? (
                <>
                  <p className="text-lg">
                    <span className="font-semibold text-xl">
                      Welcome, {data?.user?.email}
                    </span>
                  </p>
                  <p>Joined {data?.user?.created_at}</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14 sm:mx-auto">
          <Link href="/account/info">
            <button className="py-6 rounded-lg shadow border">
              Personal Info
            </button>
          </Link>
          <Link href="/account/security">
            <button className="py-6 rounded-lg shadow border">
              Login & Security
            </button>
          </Link>
          <Link href="/account/privacy">
            <button className="py-6 rounded-lg shadow border">Privacy</button>
          </Link>
          <Link href="/account/preferences">
            <button className="py-6 rounded-lg shadow border">
              Preferences
            </button>
          </Link>
        </div>
        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountSettingsPage;
