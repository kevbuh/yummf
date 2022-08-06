import { GitHubForkSVG, SaveSVG, ShareSVG, StarSVG } from "../utils/socialSVGs";

type ComponentProps = {
  data: any;
  session: any;
};

function RecipeSidebar({ data, session }: ComponentProps) {
  type RatingProps = {
    category: string;
    rating: number;
  };

  // console.log("@@", data);

  const Rating = ({ category, rating }: RatingProps) => {
    return (
      <dl>
        <dt className="text-sm  text-gray-500 ">{category}</dt>
        <dd className="flex items-center">
          <div className="w-full bg-stone-100 rounded h-2 mr-2">
            <div
              className="bg-black h-2 rounded"
              style={{ width: `${rating * 20}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500 ">{rating}</span>
        </dd>
      </dl>
    );
  };

  const OwnRecipeButtons = () => {
    return (
      <div className="grid grid-cols-2 gap-4 mb-2">
        <button className="p-2 bg-stone-100 hover:bg-fresh hover:text-white font-semibold rounded-xl">
          Edit
        </button>
        <button className="p-2 bg-stone-100 hover:bg-red-500 hover:text-white font-semibold rounded-xl">
          Delete
        </button>
      </div>
    );
  };

  console.log(session, data?.authorId);

  return (
    <div className="px-6 sm:py-6">
      {session?.userId == data?.authorId && <OwnRecipeButtons />}

      <p className="text-4xl font-semibold mb-4 ">{data?.name.slice(0, 100)}</p>

      <div className="flex flex-row mb-4">
        <div className="h-12 w-12 bg-stone-100 rounded-full mr-2"></div>
        <div>
          <p className="text-stone-400 text-sm">Author</p>
          <p className="font-semibold ">{data?.authorId}</p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <button className="mr-auto my-auto flex flex-row text-gray-500">
          <SaveSVG />
          {data?.numSaves} Saves
        </button>

        <button className="mr-auto my-auto flex flex-row text-gray-500 ">
          <ShareSVG />
          Share
        </button>
        <button className="mr-auto my-auto flex flex-row text-gray-500">
          <GitHubForkSVG /> Fork
        </button>

        <button className="mr-auto my-auto text-gray-500 font-bold">...</button>
      </div>
      <hr />
      <div className="my-8">
        <div className="grid grid-cols-2 ">
          <p className="text-xl font-semibold mb-2">Rating</p>

          <button className="text-sm text-gray-500 ml-auto">
            Show all reviews
          </button>
        </div>
        <div className="flex flex-row mb-4">
          <StarSVG />

          <p className="font-semibold text-lg">
            4.88 - {data?.ratings.length > 0 ? data?.ratings.length : "No"}{" "}
            reviews
          </p>
          <button className="ml-auto text-sm text-gray-500 my-auto">
            Create review
          </button>
        </div>
        <Rating category="Taste" rating={4.5} />
        <Rating category="Presentation" rating={3.8} />
        <Rating category="Value" rating={4.8} />
      </div>
      <hr />
      <div className="my-8">
        <p className="text-xl font-semibold mb-4">Time</p>
        <div className="bg-stone-100 rounded-xl p-2 mb-4">
          <p className="text-lg">Total</p>
          <p className="font-semibold text-xl ">
            {data?.cookTime.slice(0, 36)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-100 rounded-xl p-2">
            <p className="text-lg">Prep</p>
            <p className="font-semibold text-xl">25 mins</p>
          </div>
          <div className="bg-stone-100 rounded-xl p-2">
            <p className="text-lg">Cook</p>
            <p className="font-semibold text-xl">40 mins</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="my-8">
        <p className="text-xl font-semibold mb-4">Serving Size</p>
        <div className="bg-stone-100 rounded-xl p-2 mb-4">
          <p className="text-lg">Servings</p>
          <p className="font-semibold text-xl truncate">
            {data?.servingSize.slice(0, 36)}
          </p>
        </div>
      </div>
      <hr />
      <div className="my-8">
        <p className="text-xl font-semibold mb-4">Tags</p>
        <div>
          <button className="p-2 rounded-xl bg-stone-100 font-medium ">
            Vegetarian
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Fast
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeSidebar;
