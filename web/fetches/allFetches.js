import { API_URL } from "../config";

export const getUser = async () => {
  const apiRes = await fetch("/api/user");
  const data = await apiRes.json();
  return data;
};

export const getAllRecipes = async ({ pageParam = 1 }) => {
  console.log("fetching...");
  const res = await fetch(`${API_URL}/api/v1/recipes?page=${pageParam}`);
  return res.json();
};

export const postNewRecipe = async (values) => {
  const apiRes2 = await fetch(`${API_URL}/api/v1/recipes`, {
    method: "POST",
    body: values,
  });

  return apiRes2.status;
};

export const postNewRating = async (values) => {
  console.log("@@@@", values);

  const apiRes2 = await fetch(`${API_URL}/api/v1/rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  return apiRes2.status;
};
