import Link from "next/link";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SignUpBanner from "../components/SignUpBanner";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-40 rounded-xl bg-stone-100 p-4 flex cursor-pointer">
      <p className="font-semibold text-xl mr-auto ">{name}</p>
    </div>
  );
};

function ForumHome() {
  return (
    <div>
      <NavBar />
      <div className="p-6">
        <div className="flex flex-col my-8">
          <p className="text-6xl font-semibold">Discussion</p>
        </div>
        <div className="my-8">
          <p className="text-xl font-semibold mb-4">Top Conversations</p>
          <div className="grid gap-4 grid-cols-2">
            <button className="bg-stone-100 font-semibold p-8 w-full rounded-xl">
              What's the best way to cook eggs?
            </button>
            <button className="bg-stone-100 font-semibold p-8 w-full rounded-xl">
              Please never forget to salt your meals!
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card name="Test"></Card>
          <Card name="Test"></Card>
          <Card name="Test"></Card>
          <Card name="Test"></Card>
        </div>

        <div className="my-8 bg-stone-100 rounded-xl p-6">
          <p className="text-xl font-semibold mb-6">Create New Conversation</p>
          <div className="h-2/5 bg-white rounded-xl p-6 mb-4">
            <p className="text-gray-500 text-xl font-semibold mb-2">Title</p>
            <p className="text-gray-500 ">Start typing here...</p>
          </div>

          <button className="rounded-xl bg-black text-white font-semibold p-2 max-w-xs">
            Post
          </button>
        </div>
      </div>
      <SignUpBanner />
      <Footer />
    </div>
  );
}

export default ForumHome;
