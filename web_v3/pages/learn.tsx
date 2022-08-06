import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import Footer from "../components/Footer";

import NavBar from "../components/NavBar";
import SignUpBanner from "../components/SignUpBanner";
import NewCard from "./ArticleComponent";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-80 rounded-xl bg-stone-100 p-4 flex cursor-pointer">
      <p className="font-semibold text-xl mr-auto mt-auto">{name}</p>
    </div>
  );
};

function LearnHome() {
  const myRef = useRef<null | HTMLDivElement>(null);
  const { data: session } = useSession();

  const executeScroll = () => myRef?.current?.scrollIntoView();

  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center my-16  mx-auto">
        <p className="text-6xl font-semibold">Learn How To Cook</p>

        <p className="font-light mt-8 text-lg">
          Beginner guides, practical tips, the basics for first-timers, and
          ingredient information.
        </p>

        <button
          className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-4"
          onClick={executeScroll}
        >
          <a>Start Now</a>
        </button>
      </div>
      <div className="flex flex-col items-center mb-16 mt-40  mx-auto">
        <p
          className="text-6xl font-semibold mx-auto flex align-center"
          ref={myRef}
        >
          Cooking Basics
        </p>
      </div>
      <div className="p-6 mx-4  grid grid-cols-3 gap-4 rounded-xl">
        <NewCard name="Cooking Basics" id={1} />
        <NewCard name="Please, Don't Overcook Your Eggs" id={2} />
        <NewCard name="How To Make Fluffy Pancakes" id={3} />
      </div>
      <br />
      <br />
      <br />
      <div className="flex flex-col items-center mb-16 mt-40  mx-auto">
        <p className="text-6xl font-semibold mx-auto flex align-center">
          Ingredient Information
          <span className="text-gray-500 text-sm mb-auto italic">
            COMING SOON
          </span>
        </p>
      </div>
      <div className="p-6 mx-4  grid grid-cols-3 gap-4 rounded-xl">
        <Card name="Most Common" />
        <Card name="How to Master Cooking Chicken " />
        <Card name="Art of Salt" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      {!session && <SignUpBanner />}

      <Footer />
    </div>
  );
}

export default LearnHome;
