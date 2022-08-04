import Link from "next/link";

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

function LandingFeatured() {
  return (
    <div className="p-6  mx-4 rounded-xl">
      <p className="text-2xl font-semibold mb-8">Recipes you'll love</p>
      <div className="rounded-xl grid grid-cols-3 gap-4 mb-4">
        <Card name="Tacos Al Pastor" />
        <Card name="Pineapple Upside Down Pancakes" />
        <Card name="Pink Lemonade" />
      </div>
      <div className="flex flex-col mx-auto items-center">
        <p>or</p>
        <button className="rounded-xl bg-black text-white font-semibold p-2 w-1/5 mt-4">
          <Link href="/create-info">
            <a>Create your own</a>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default LandingFeatured;
