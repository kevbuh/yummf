import Footer from "../../components/Footer";

import type { NextPage } from "next";
import NavBar from "../../components/NavBar";
import RecipeSidebar from "../../components/RecipeSidebar";

const test: NextPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        {/* left */}
        <div className="w-8/12 mx-8">
          <div className="h-3/5 rounded-xl bg-stone-100 my-8"></div>
          <div className="mb-8">
            <div>
              <p className="text-2xl mt-4 font-semibold">Description</p>
              <p className="font-light">This is the description blah blah</p>
            </div>
          </div>
          <hr />
          <div className="mb-8">
            <div>
              <p className="text-2xl mt-4 font-semibold">Ingredients</p>
              <p className="font-light">This is the Ingredients blah blah</p>
            </div>
          </div>
          <hr />

          <div className="mb-8">
            <div>
              <p className="text-2xl mt-4 font-semibold">Instructions</p>
              <p className="font-light">This is the Instructions blah blah</p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-4/12">
          <RecipeSidebar />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default test;
