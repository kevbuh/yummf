import { API_URL } from "../config";

export const getUser = async () => {
  const apiRes = await fetch("/api/user");
  const data = await apiRes.json();
  return data;
};

export const getAllRecipes = async () => {
  const apiRes = await fetch(`http://localhost:8000/api/v1/recipes`);
  const data = await apiRes.json();
  return data;
};

export const postNewRecipe = async (values) => {
  const apiRes2 = await fetch(`${API_URL}/api/v1/recipes`, {
    method: "POST",
    body: values,
  });

  return apiRes2.status;
};
