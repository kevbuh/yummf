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
  const apiRes = await fetch("/api/user");

  const user = await apiRes.json();

  // console.log("here");

  // const body = JSON.stringify({
  //   user_id: user.user.id,
  //   name: values.name,
  //   directions: values.directions,
  //   cook_time: values.cook_time,
  //   serving: values.serving,
  //   url: values.source_url,
  //   caption: values.caption,
  // });

  const apiRes2 = await fetch(`${API_URL}/api/v1/recipes`, {
    method: "POST",
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "multipart/form-data",
    // },
    body: values,
  });

  const data = await apiRes2.json();

  return apiRes2.status;
};
