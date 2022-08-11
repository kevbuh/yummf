import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import CommunityNavBar from "../../components/CommunityNavbar";
import Footer from "../../components/Footer";
import { CurlyArrow, DottedArrow, NormalBoldArrow } from "../../utils/arrows";
import { SearchIcon } from "../../utils/icons";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-64 rounded-xl bg-stone-100 p-4 flex cursor-pointer">
      <p className="font-semibold text-xl mr-auto ">{name}</p>
    </div>
  );
};

function CommunityPage() {
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/search-results?result=${searchField}`);
  };

  return (
    <div>
      <CommunityNavBar />
      <div className="max-w-6xl px-6 mx-auto mb-4">
        <div className="flex flex-col">
          <p className="m-auto font-semibold text-center text-6xl mt-32 mb-8">
            Welcome to the <span className="text-rosa">Yummf</span> community
          </p>
          <p className="mx-auto font-medium text-2xl text-gray-500 mb-16 max-w-lg px-6 sm:px-0 text-center">
            Get help with your recipe, learn about ingredients, or ask any
            cooking related question.
          </p>
        </div>

        <NormalBoldArrow />

        <div className=" px-6 mt-8">
          <div className="rounded-xl w-full  py-12 mt-4 mb-16">
            <p className="font-semibold text-5xl mb-8">Tutorials</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card name="How to cook" />
              <Card name="How to cook" />
              <Card name="How to cook" />
            </div>
            <button className="flex mx-auto mt-6 max-w-xs text-xl p-3 rounded-xl bg-black text-white font-semibold">
              View all tutorials
            </button>
          </div>
          <DottedArrow />
          <div className="rounded-xl w-full my-16">
            <p className="font-semibold text-5xl mb-4">Questions & Answers</p>
            <p className="font-medium text-xl mb-8 max-w-lg px-6 sm:px-0">
              Get help with your recipe, learn about ingredients, or ask any
              cooking related question.
            </p>

            <form className="w-full sm:mx-auto">
              <div className="relative ">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <SearchIcon />
                  {/* @ts-ignore */}
                  <button onClick={onSubmit}></button>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className=" block p-4 pl-14 w-full text-black  font-medium placeholder-gray-400 text-lg rounded sm:rounded-xl border-stone-100 border-4 "
                  placeholder="Search Recipes, Categories, Ingredients, Chefs..."
                  onChange={(e) => setSearchField(e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  required
                />
              </div>
            </form>

            <div className="flex flex-row mt-8">
              <Link href="/community/questions">
                <button className=" flex  max-w-xs text-xl p-3 rounded-xl font-semibold mr-4">
                  View all
                </button>
              </Link>
              <button className=" flex max-w-xs text-xl p-3 rounded-xl bg-black text-white font-semibold">
                Ask a Question
              </button>
            </div>
          </div>

          <CurlyArrow />

          <div className=" border-stone-100 border-4 rounded-xl px-6 py-12 text-rosa font-semibold my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <p className="mx-auto px-8 py-12 text-3xl bg-black rounded-full text-white hidden sm:block">
                yummf
              </p>
              <div className="m-auto">
                <p className="m-auto text-4xl text-black mb-4">
                  Thanks for being a part of our community.
                </p>
                <Link href="/explore">
                  <button className=" flex max-w-xs w-full text-xl p-3 rounded-xl bg-rosa text-white font-semibold text-center">
                    <p className="mx-auto">Start exploring recipes</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CommunityPage;
