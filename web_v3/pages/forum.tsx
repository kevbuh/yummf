import Link from "next/link";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

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

function ForumHome() {
  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center my-16 max-w-md mx-auto">
        <p className="text-6xl font-semibold">Discuss recipes</p>

        <p className="font-light mt-4 text-2xl">Ingredient Information</p>
        <p className="font-light mt-4 text-2xl">The best tools</p>
        <p className="font-light mt-4 text-2xl">Time saving techniques</p>

        <button className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-4">
          <Link href="/create-new">
            <a>Ask a question</a>
          </Link>
        </button>
      </div>
      <div className="p-6 mx-4  grid grid-cols-3 gap-4 rounded-xl">
        <Card name="Step One" />
        <Card name="Step Two" />
        <Card name="Step Three" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>sign up here</div>
      <Footer />
    </div>
  );
}

export default ForumHome;
