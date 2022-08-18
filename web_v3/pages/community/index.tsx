import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import CommunityNavBar from "../../components/CommunityNavbar";
import Footer from "../../components/Footer";
import { CurlyArrow, CurveRightArrow, DottedArrow } from "../../utils/arrows";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-64 rounded-xl bg-white p-4 flex cursor-pointer">
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
    router.push(`/search-results?result=qas_${searchField}`);
  };

  return (
    <div>
      <CommunityNavBar />
      <div className=" px-4 mx-auto mb-4 max-w-4xl">
        <div className="flex flex-col mb-12">
          <p className="m-auto font-semibold text-center text-6xl mt-32 mb-8 max-w-xl">
            Welcome to the <span className="text-rosa">Yummf</span> community
          </p>
          <p className="mx-auto font-medium text-2xl text-gray-500 mb-16 max-w-lg px-6 sm:px-0 text-center">
            Get help with your recipe, learn about ingredients, or ask any
            cooking related question.
          </p>
        </div>

        <CurveRightArrow />

        <div className="mt-8">
          {/* <div className="rounded-xl w-full p-6 mt-4 mb-16 bg-stone-100">
            <p className="font-semibold text-5xl mb-8">Tutorials</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card name="How to cook" />
              <Card name="How to cook" />
              <Card name="How to cook" />
            </div>
            <button className="flex mx-auto mt-6 max-w-xs text-xl p-3 rounded-xl bg-black text-white font-semibold">
              View all tutorials
            </button>
          </div> */}

          <div className="items-center flex flex-col my-40 justify-center align-center">
            <p className="font-semibold text-5xl my-4 text-center">
              Learn from tutorials
            </p>
            <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0">
              Level up your cooking skills, taught from the best chefs around
              the world.
            </p>
            {/* <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0">
             Learn 
            </p> */}
            <Link href="/community/tutorials">
              <button className="mt-4 max-w-xs text-2xl p-3 rounded-xl bg-black text-white font-semibold">
                View all tutorials
              </button>
            </Link>
          </div>

          <DottedArrow />

          <div className="items-center flex flex-col my-40 justify-center align-center">
            <p className="font-semibold text-5xl my-4 text-center">
              Ask cooking questions
            </p>
            {/* <p className="mx-auto font-medium text-xl sm:text-2xl text-gray-500 text-center mb-6 max-w-lg px-6 sm:px-0">
             Learn 
            </p> */}
            <div className="flex flex-row">
              <Link href="/community/questions">
                <button className="mt-4 max-w-xs text-2xl p-3 mr-4 rounded-xl ">
                  View all
                </button>
              </Link>
              <Link href="/community/create">
                <button className="mt-4 max-w-xs text-2xl p-3 rounded-xl bg-black text-white ">
                  Ask a question
                </button>
              </Link>
            </div>
          </div>

          <CurlyArrow />

          <div className=" border-stone-100 border-4 rounded-xl px-6 py-12 text-rosa font-semibold my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <p className="m-auto px-6 py-14 text-3xl bg-black rounded-full text-white hidden sm:block">
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
