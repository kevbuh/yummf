import { useQuery, useMutation } from "react-query";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { getUser } from "../../fetches/allFetches";
import Image from "next/image";
import { API_URL } from "../../config";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import { postNewRating } from "../../fetches/allFetches";
import * as Yup from "yup";

function selectRecipePage() {
  const { query } = useRouter();
  const [liked, setLiked] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const router = useRouter();

  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return steps;
  };

  const mutation = useMutation(async (values) => {
    // maybe need to json stringify
    const posted = await postNewRating(values);

    if (posted === 201) {
      console.log("success!");
      router.reload(window.location.pathname);
    } else {
      console.log("failure to submit rating");
    }
  });

  const fetchThisRecipe = async () => {
    // should put it into fetches file
    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/recipes/${query.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  };

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
    data: dataUser,
    error: errorUser,
  } = useQuery(
    "getUserData", // could probably add cookie to differentiate
    getUser
  );

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    ["recipe", query.id],
    fetchThisRecipe,
    {
      enabled: !!query.id,
    }
  );

  return (
    <>
      <NavBar />
      <div className="mt-20 rounded-lg w-2/3 item-center mx-auto">
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <div className="">
              <div className="flex flex-row justify-between">
                <div className="my-auto h-full">
                  <div className="text-4xl mb-4">{data?.name}</div>
                  <div className="flex flex-row justify-evenly">
                    {/* {data?.category.map((d) => (
                      <div>
                        <button className="border-stone-100 mx-2 border-2 rounded-2xl py-1 px-5 ">
                          {d.name}
                        </button>
                      </div>
                    ))} */}

                    {/* <button className="border-stone-100 mx-2 border-2 rounded-2xl py-1 px-5 ">
                      {data?.num_views} views
                    </button> */}
                  </div>
                  <div className="flex flex-col my-5">
                    <div className=" flex flex-row items-center">
                      <p className="text-2xl mr-1">Time </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className=" text-lg">
                      <p>{data?.cook_time} mins</p>
                    </div>
                    <div className="stat-desc">Community Average</div>
                  </div>
                  <div className="my-5">
                    <p className="text-2xl mr-1">Rating </p>
                    <div className=" text-lg flex flex-row">
                      <p>{data?.past_hour_average.toFixed(2)} </p>
                      <p className="flex flex-row my-auto">
                        {getStars(data?.past_hour_average)}
                      </p>
                    </div>

                    <div className="stat-desc">
                      {/* <div>
                        {data?.num_likes} Saves, ({data?.reviews.length})
                        Reviews
                      </div> */}
                      <div>
                        <>
                          {isSuccessUser &&
                          dataUser.user.id === data?.user_id ? (
                            <>
                              <button
                                className="bg-stone-100 p-2 mx-3 my-2 rounded font-semibold"
                                onClick={() =>
                                  setShowEdit((showEdit) => !showEdit)
                                }
                              >
                                Edit Recipe
                              </button>
                              <button
                                className="bg-red-500 p-2 rounded text-white font-semibold"
                                onClick={() => {
                                  fetch(
                                    `${API_URL}/api/v1/recipes/${data.id}`,
                                    {
                                      method: "DELETE",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify(data.id),
                                    }
                                  ).catch((error) =>
                                    console.log("error", error)
                                  );
                                  router.push("/dashboard");
                                }}
                              >
                                Delete Recipe
                              </button>
                            </>
                          ) : (
                            <>
                              {showRate ? (
                                <div className="mb-4">
                                  <Formik
                                    initialValues={{
                                      user_id: dataUser.user.id,
                                      value: 5,
                                      recipe_id: data.id,
                                    }}
                                    validationSchema={Yup.object({
                                      user_id: Yup.string().required(),
                                      recipe_id: Yup.string().required(),
                                      value: Yup.number()
                                        .min(1, "Be nice!")
                                        .max(5, "Was is really that good?")
                                        .required(),
                                    })}
                                    onSubmit={(values, { setSubmitting }) => {
                                      console.log("clicked", values);
                                      mutation.mutate(values);
                                      setSubmitting(false);
                                    }}
                                  >
                                    <Form className="p-3 flex flex-col rounded bg-stone-100 mt-6">
                                      <label
                                        htmlFor="value"
                                        className=" text-xl"
                                      >
                                        Rate this recipe below:
                                      </label>
                                      <Field
                                        id="value"
                                        name="value"
                                        type="number"
                                        placeholder="Give a rating 1-5 stars"
                                        className="rounded p-2 my-2 "
                                      />
                                      <ErrorMessage name="value">
                                        {(msg) => <p>{msg}</p>}
                                      </ErrorMessage>

                                      <div className="flex flex-row justify-between pr-1">
                                        <button
                                          className="font-semibold "
                                          onClick={() =>
                                            setShowRate((showRate) => !showRate)
                                          }
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className=" font-semibold"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </Form>
                                  </Formik>
                                </div>
                              ) : (
                                <button
                                  className=" font-semibold"
                                  onClick={() =>
                                    setShowRate((showRate) => !showRate)
                                  }
                                >
                                  Rate
                                </button>
                              )}
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col my-5">
                    <p className="text-2xl mr-1">Cost </p>
                    <div className=" text-lg">$$$</div>

                    {/* <div className=" text-lg">{data?.price}</div> */}
                    <div className="stat-desc">Estimated Ingredient Cost</div>
                  </div>
                  <div className="flex flex-row mx-auto justify-center border rounded">
                    <button
                      className={
                        liked ? "bg-pink-600 text-black w-full rounded" : null
                      }
                      onClick={() => {
                        fetch("/api/account/like_recipe", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            liked_recipe: data?.id,
                            user: userID,
                          }),
                        }).catch((error) => console.log("error", error));
                        // router.push("/");
                        setLiked((liked) => !liked);
                      }}
                    >
                      {/* {isSuccess ? null : (
                        <div className="flex justify-center items-center p-2">
                          {isSuccess ? (
                            <div className="text-white">
                              <p className="text-xl">Saved!</p>
                            </div>
                          ) : ( */}
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
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
                      </>
                      {/* )}
                        </div>
                      )} */}
                    </button>
                  </div>
                </div>

                <div className="w-3/5">
                  {!isLoading && data && !isError && isSuccess ? (
                    <div>
                      <Image
                        // className="rounded-3xl shadow p-2"
                        loader={() =>
                          API_URL + data.featured_image?.url.split("?")[0]
                        }
                        src={API_URL + data.featured_image?.url.split("?")[0]}
                        unoptimized={true}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        priority="true"
                        quality={50}
                      />
                    </div>
                  ) : (
                    <div className="bg-stone-100 h-full rounded"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded py-2">
              {data?.private ? (
                <p className="text-xl">Private Recipe </p>
              ) : null}
              <div className="text-2xl mt-6 w-full">Ingredients</div>

              <p className="text-2xl mt-6">Directions</p>

              <div className="mb-4  my-2 border rounded p-3 shadow w-full">
                <p className="text-medium whitespace-pre-line">
                  {data?.directions}
                </p>
                <div className="text-xs mt-1">Created {data?.created_at}</div>
              </div>
              {data?.url ? (
                <div>
                  Source:
                  <a className="text-xs">{data?.source}</a>
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div className="h-40"></div>
      </div>

      <Footer />
    </>
  );
}

export default selectRecipePage;
