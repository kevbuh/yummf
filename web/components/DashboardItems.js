import RecipeCard from "./RecipeCard";
import { useQuery } from "react-query";
import { getAllRecipes } from "../fetches/allFetches";
import { API_URL } from "../config/index";

function DashboardItems() {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    "getAllRecipes",
    getAllRecipes
  );

  return (
    <div className="bg-stone-100 flex flex-col p-4 m-3 rounded-lg ">
      <div>
        <p className="text-xl font-semibold mb-4">For You</p>
      </div>
      {isLoading && <p>loading...</p>}
      {isError && <p>{error.message}</p>}

      <div className="grid grid-cols-4 gap-4">
        {isSuccess &&
          data.map((d, index) => {
            // console.log("@@@@", API_URL + d.featured_image?.url.split("?")[0]);
            return (
              <RecipeCard
                key={index}
                name={d.name}
                author={d.user_id}
                num_saves={d.num_saves}
                rating={d.rating}
                cook_time={d.cook_time}
                id={d.id}
                image={
                  d.featured_image !== null && d.featured_image !== undefined
                    ? API_URL + d.featured_image?.url.split("?")[0]
                    : null
                }
              />
            );
          })}
      </div>
    </div>
  );
}

export default DashboardItems;
