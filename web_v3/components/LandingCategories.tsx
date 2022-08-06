import Link from "next/link";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-80 rounded-xl bg-stone-200 p-4 flex cursor-pointer">
      <p className="font-semibold text-xl mr-auto mt-auto">{name}</p>
    </div>
  );
};

function LandingCategories() {
  return (
    <div className="px-6 py-16 bg-stone-100 mx-4 rounded-xl">
      <p className="text-3xl font-semibold mb-8">🔥 Popular Categories</p>
      <div className="rounded-xl  grid grid-cols-4 gap-4">
        <Card name="Breakfast" />
        <Card name="Diet" />
        <Card name="Desserts" />
        <Card name="Italian" />
      </div>
      <div className="flex flex-col mx-auto items-center">
        <p>or</p>
        <button className="rounded-xl bg-black text-white font-semibold p-2 w-1/5 mt-4">
          <Link href="/categories">
            <a>View All</a>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default LandingCategories;
