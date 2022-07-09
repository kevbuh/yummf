import NavBar from "../components/NavBar";
import DashboardItems from "../components/DashboardItems";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

function dashboard() {
  return (
    <div className="mb-8">
      <NavBar />
      <div className="flex flex-row mx-20">
        <div className="w-1/5 flex flex-col">
          <div className=" px-3 mt-3">
            <Link href="/create">
              <button className="rounded-xl hover:bg-rosa hover:text-white font-semibold py-2.5 text-xl w-full bg-stone-100 ">
                Create
              </button>
            </Link>
          </div>
          <Sidebar />
        </div>
        <div className="w-4/5">{/* <DashboardItems /> */}</div>
      </div>
    </div>
  );
}

export default dashboard;
