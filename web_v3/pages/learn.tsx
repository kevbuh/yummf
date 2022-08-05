import Link from "next/link";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SignUpBanner from "../components/SignUpBanner";

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
  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center my-16  mx-auto">
        <p className="text-6xl font-semibold">Learn How To Cook</p>
        {/* <p className="text-6xl font-semibold">Cook </p> */}

        <p className="font-light mt-8 text-lg">
          Beginner guides, practical tips, the basics for first-timers, and
          ingredient information.
        </p>

        {/* <button className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-4">
          <Link href="/create-new">
            <a>Start Now</a>
          </Link>
        </button> */}
      </div>
      <div className="flex flex-col items-center mb-16 mt-40  mx-auto">
        <p className="text-6xl font-semibold mx-auto flex align-center">
          Cooking Basics
        </p>
      </div>
      <div className="p-6 mx-4  grid grid-cols-3 gap-4 rounded-xl">
        <Card name="Cooking Basics" />
        <Card name="Please, Don't Under Salt" />
        <Card name="How To Make Fluffy Pancakes" />
      </div>
      <br />
      <br />
      <br />
      <div className="flex flex-col items-center mb-16 mt-40  mx-auto">
        <p className="text-6xl font-semibold mx-auto flex align-center">
          Ingredient Information
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
      <SignUpBanner />
      <Footer />
    </div>
  );
}

export default LearnHome;
