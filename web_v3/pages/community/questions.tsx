import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import CommunityNavBar from "../../components/CommunityNavbar";
import Footer from "../../components/Footer";
import { CurlyArrow } from "../../utils/arrows";
import { SearchIcon } from "../../utils/icons";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="my-4 w-full rounded-xl bg-stone-100 p-4 cursor-pointer hover:shadow-lg flex flex-col">
      <p className="truncate font-semibold text-xl my-2">{name}</p>
      <div className="md:w-1/2 grid grid-cols-3 divide-x-4">
        <p className="px-8 ">10 answers </p>
        <p className="px-8 ">7 months ago </p>
        <p className="px-8 ">By Author </p>
      </div>
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
        <div className=" px-6 mt-8">
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
              <button className=" flex  max-w-xs text-xl p-3 rounded-xl font-semibold mr-4">
                View all
              </button>
              <button className=" flex max-w-xs text-xl p-3 rounded-xl bg-black text-white font-semibold">
                Ask a Question
              </button>
            </div>
          </div>

          <hr />

          <div className="rounded-xl w-full my-16">
            <div className="flex flex-row">
              <p className="font-semibold text-5xl mb-4">Featured Questions</p>
              <button className="ml-auto font-semibold">View All</button>
            </div>
            <Card name="superlongitle " />
            <Card name="test" />
          </div>
          <hr />

          <div className="rounded-xl w-full my-16">
            <div className="flex flex-row">
              <p className="font-semibold text-5xl mb-4">
                Most Recent Questions
              </p>

              <button className="ml-auto font-semibold">View All</button>
            </div>
            <Card name="superlongitle " />
            <Card name="test" />
          </div>
          <hr />

          <div className="rounded-xl w-full my-16">
            <div className="flex flex-row">
              <p className="font-semibold text-5xl mb-4">
                Unanswered Questions
              </p>
              <button className="ml-auto font-semibold">View All</button>
            </div>
            <Card name="superlongitle " />
            <Card name="test" />
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
