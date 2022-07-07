import RecipeCard from "./RecipeCard";

function DashboardItems() {
  return (
    <div className="bg-stone-100 flex flex-col p-4 m-3 rounded-lg ">
      <div>
        <p className="text-xl font-semibold mb-4">Explore</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    </div>
  );
}

export default DashboardItems;
