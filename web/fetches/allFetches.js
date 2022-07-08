export const getUser = async () => {
  console.log("called");
  const apiRes = await fetch(`http://localhost:8000/api/v1/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });

  const data = await apiRes.json();

  // console.log("GOT HERE", data);
};
