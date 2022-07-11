import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useQuery } from "react-query";
import { getUser } from "../../fetches/allFetches";

function PersonalInformationPage() {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    "getUserData", // could probably add cookie to differentiate
    getUser
  );
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg mx-4 md:w-2/3 item-center sm:mx-auto">
        <div className="mt-8 rounded-lg sm:w-2/3 item-center sm:mx-auto">
          <div>
            <p className="text-4xl my-8">Personal Information</p>
          </div>
          <hr />
          {data && isSuccess && !isLoading && !isError ? (
            <>
              <p className="text-xl font-semibold mt-8">Email Address</p>
              <div className="mb-8 flex flex-row">
                <p className="mr-2">{data.user.email}</p>
                <p className="text-stone-500">Update</p>
              </div>

              <p className="text-xl font-semibold mt-2">Display Name</p>
              <div className="mb-8 flex flex-row">
                <p className="mr-2">No name!</p>
                <p className="text-stone-500">Change</p>
              </div>

              <p className="text-xl font-semibold mt-2">Password</p>
              <div className="mb-8 flex flex-row">
                <p className="mr-2">Password linked to your email.</p>
                <p className="text-stone-500">Reset Password</p>
              </div>
            </>
          ) : (
            <div className="loading"></div>
          )}

          <hr />

          <div className="h-40"></div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PersonalInformationPage;
