function Sidebar() {
  return (
    <div className="">
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
    </div>
  );
}

export default Sidebar;

// <div className="border border-stone-100 shadow-sm flex flex-col p-4 m-3 rounded-lg divide-y ">
//   <p className="text-xl font-semibold mb-1 mx-auto">Categories</p>
//   <div className="">
//     <div className="flex flex-row mt-1">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
//         />
//       </svg>
//       <p className="text-lg ml-6">Saved</p>
//     </div>
//     <div className="flex flex-row ">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
//         />
//       </svg>
//       <p className="text-lg ml-6">New</p>
//     </div>
//     <div className="flex flex-row ">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//         />
//       </svg>
//       <p className="text-lg ml-6">Trending</p>
//     </div>
//     <div className="flex flex-row ">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//         />
//       </svg>
//       <p className="text-lg ml-6">Cooking Tips</p>
//     </div>
//     <div className="flex flex-row ">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
//         />
//       </svg>
//       <p className="text-lg ml-6">Nutrition</p>
//     </div>
//     <div className="mt-1">
//       <p className="font-semibold text-blue-600 cursor-pointer">
//         Show more
//       </p>
//     </div>
//   </div>
// </div>
