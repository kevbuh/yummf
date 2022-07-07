import NavBar from "../components/NavBar";
import DashboardItems from "../components/DashboardItems";
import Sidebar from "../components/Sidebar";

function dashboard() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-row mx-10">
        <div className="w-1/5 flex flex-col">
          <div className=" px-3 mt-3">
            <button className="rounded-xl hover:bg-rosa hover:text-white font-semibold py-2.5 w-full bg-stone-100 ">
              Create
            </button>
          </div>
          <Sidebar />
        </div>
        <div className="w-4/5">
          <DashboardItems />
        </div>
      </div>
    </div>
  );
}

export default dashboard;
