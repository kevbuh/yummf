import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import CommunityNavBar from "../../components/CommunityNavbar";
import Footer from "../../components/Footer";
import { CurlyArrow } from "../../utils/arrows";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-96 rounded-xl bg-stone-100 p-4 flex cursor-pointer">
      <p className="font-semibold text-xl mr-auto">{name}</p>
    </div>
  );
};

function TutorialsPage() {
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
      <div className=" px-4 mx-auto mb-1">
        <div className="flex flex-col">
          <p className="m-auto font-semibold text-center text-6xl mt-40 mb-8 max-w-xl">
            Yummf <span className="text-rosa">Tutorials</span>
          </p>
          <p className="mx-auto font-medium text-2xl text-gray-500 mb-16 max-w-lg px-6 sm:px-0 text-center">
            Level up your cooking skills, taught from the best chefs around the
            world.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <hr />
        </div>

        <div className="my-16 max-w-6xl mx-auto">
          <div className="rounded-xl w-full mt-4 mb-32 ">
            <p className="text-5xl mb-8">Tutorials</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card name="How to cook" />
              <Card name="How to shop" />
              <Card name="How to eat" />
            </div>
          </div>

          {/* <CurlyArrow /> */}
          <div className="max-w-4xl mx-auto ">
            <hr />
          </div>

          <div className=" border-stone-100 border-4 rounded-xl px-6 py-12 text-rosa font-semibold my-32">
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

export default TutorialsPage;
