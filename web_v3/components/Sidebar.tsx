import Link from "next/link";

function Sidebar() {
  return (
    <>
      <div className="flex flex-wrap my-4 mx-2">
        <Link href="/explore">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Recipes
          </button>
        </Link>
        <Link href="/playlists">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Playlists
          </button>
        </Link>

        <Link href="/ingredients">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Ingredients
          </button>
        </Link>
        {/* </Link> */}
        <Link href="/categories">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Categories
          </button>
        </Link>
      </div>
      <div className="collapse collapse-arrow ">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Cuisine</div>
        <div className="collapse-content">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Mexican
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Nigerian
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            French
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Ugandan
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            German
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Indian
          </button>
        </div>
      </div>
      <div className="collapse collapse-arrow ">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Ingredients</div>
        <div className="collapse-content ">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Steak
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Onions
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Fish
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Papaya
          </button>
        </div>
      </div>
      <div className="collapse collapse-arrow ">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Diet</div>
        <div className="collapse-content">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Paleo
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Vegan
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Ketogenic
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Atkins
          </button>
        </div>
      </div>
      <div className="collapse collapse-arrow ">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Trending</div>
        <div className="collapse-content">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Most Popular
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Experimental
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Trending
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            New
          </button>
        </div>
      </div>
      <div className="collapse collapse-arrow ">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Type</div>
        <div className="collapse-content">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Breakfast
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Lunch
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Dinner
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Dessert
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Sweet
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Savory
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
