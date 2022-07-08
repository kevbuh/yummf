export const getUser = async () => {
  console.log("calling fetch");
  const apiRes = await fetch("/api/user");
  const data = await apiRes.json();
  return data;
};
