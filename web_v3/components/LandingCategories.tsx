type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-80 rounded-xl bg-purple-300 p-4 flex cursor-pointer">
      <p className="font-semibold text-xl mr-auto mt-auto">{name}</p>
    </div>
  );
};

function LandingCategories() {
  return (
    <div className="px-6 py-16 bg-purple-100 mx-4 rounded-xl">
      <p className="text-2xl font-semibold mb-8">Popular Categories</p>
      <div className="rounded-xl  grid grid-cols-4 gap-4">
        <Card name="Breakfast" />
        <Card name="Diet" />
        <Card name="Desserts" />
        <Card name="Italian" />
      </div>
    </div>
  );
}

export default LandingCategories;
