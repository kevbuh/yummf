import Link from "next/link";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

function PersonalSecurityPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg px-6 md:w-2/3 item-center mx-auto">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/account">
                <a>Account</a>
              </Link>
            </li>
            <li>
              <p>Security</p>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-4xl my-8">Account Security</p>
        </div>
        <hr />

        <p className="text-xl font-semibold mt-8">Login Information</p>
        <div className="mb-8 flex flex-row">
          <p className="mr-2">Password</p>
          <p className="text-stone-500">Update</p>
        </div>

        <p className="text-xl font-semibold mt-2">Social Accounts</p>
        <div className="mb-8 flex flex-row">
          <p className="mr-2">Google</p>
          <p className="text-stone-500">Connected</p>
        </div>

        <p className="text-xl font-semibold mt-2">Account</p>
        <div className="mb-8 justify-between flex flex-row">
          <p className="">Deactivate account</p>
          <p className="text-red-400">Deactivate</p>
        </div>
        <hr />

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default PersonalSecurityPage;
