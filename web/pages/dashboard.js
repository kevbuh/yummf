import NavBar from "../components/NavBar";
import DashboardItems from "../components/DashboardItems";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

function dashboard() {
  return (
    <div className="mb-8">
      <NavBar />
      <div className="flex lg:flex-row xl:mx-20">
        <div className="hidden sm:visible lg:w-1/5 sm:flex sm:flex-col lg:h-screen sm:sticky sm:top-20">
          <div className="sm:px-3 sm:mt-3">
            <Link href="/create">
              <button className="rounded-xl hover:bg-rosa hover:text-white font-semibold py-2.5 text-xl w-full bg-stone-100 ">
                Create
              </button>
            </Link>
          </div>
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5">
          <DashboardItems />
        </div>
      </div>
    </div>
  );
}

export default dashboard;
