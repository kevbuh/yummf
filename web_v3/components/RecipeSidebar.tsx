import Link from "next/link";

function RecipeSidebar() {
  type RatingProps = {
    category: string;
    rating: number;
  };

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

  return (
    <div className="p-6">
      <p className="text-4xl font-semibold mb-4">Title</p>

      <div className="flex flex-row mb-4">
        <div className="h-12 w-12 bg-stone-100 rounded-full mr-2"></div>
        <div>
          <p className="text-stone-400 text-sm">Creator</p>
          <p className="font-semibold ">Name</p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-3 gap-4 my-8">
        <button className="flex flex-row text-gray-500 my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 my-auto mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          1.1k
        </button>

        <button className="flex flex-row text-gray-500 my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 my-auto mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Share
        </button>
        <button className="flex flex-row text-gray-500 my-auto">...</button>
      </div>
      <hr />
      <div className="my-8">
        <div className="grid grid-cols-2">
          <p className="text-xl font-semibold mb-2">Rating</p>

          <button className="text-sm  text-gray-500 ml-auto">
            Show all reviews
          </button>
        </div>
        <div className="flex flex-row mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 my-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          <p className="font-semibold text-lg">4.88 - 369 reviews</p>
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
          <p className="font-semibold text-2xl ">65 mins</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-100 rounded-xl p-2">
            <p className="text-lg">Prep</p>
            <p className="font-semibold text-2xl">25 mins</p>
          </div>
          <div className="bg-stone-100 rounded-xl p-2">
            <p className="text-lg">Cook</p>
            <p className="font-semibold text-2xl">40 mins</p>
          </div>
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
