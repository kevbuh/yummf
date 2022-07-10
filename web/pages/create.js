import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { postNewRecipe } from "../fetches/allFetches";
import { useRouter } from "next/router";
import { useState } from "react";
function CreateRecipePage() {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const mutation = useMutation(async (values) => {
    console.log("@@@@", image);

    const apiRes = await fetch("/api/user");
    const user = await apiRes.json();
    const formData = new FormData();

    formData.append("user_id", user.user.id);
    formData.append("featured_image", image);
    formData.append("name", values.name);
    formData.append("directions", values.directions);
    formData.append("cook_time", values.cook_time);
    formData.append("serving", values.serving);
    formData.append("url", values.url);
    formData.append("caption", values.caption);

    const posted = await postNewRecipe(formData);
    if (posted === 201) {
      router.push("/dashboard");
    }
  });

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
    console.log("::::", image);
  };

  const initialValues = {
    name: "",
    directions: "",
    source_url: "",
    serving: "",
    cook_time: "",
    caption: "",
    featured_image: null,

    ingredient_list: [
      {
        ingredient_name: "",
        ingredient_amount: "",
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-3/5 item-center mx-auto">
        <div>
          <p className="text-4xl mb-8">Create New Recipe</p>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: Yup.string().required("Please enter a recipe title!"),
              directions: Yup.string().required("Please enter directions"),
              source_url: Yup.string(),
              serving: Yup.string(),
              cook_time: Yup.string(),
              caption: Yup.string(),
              featured_image: Yup.mixed(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log("clicked");
              mutation.mutate(values);
              setSubmitting(false);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="flex flex-col ">
                  <input
                    type="file"
                    name="featured_image"
                    onChange={onFileChange}
                    className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 hover:file:bg-pink-600 my-3 hover:file:text-white hover:file:cursor-pointer"
                  />
                  <Field
                    name="name"
                    placeholder="Title"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <Field
                    name="caption"
                    placeholder="Enter caption"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="caption">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <Field
                    name="directions"
                    placeholder="Enter directions of this recipe"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="directions">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <Field
                    name="source_url"
                    placeholder="Add recipe origin"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="source_url">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <label htmlFor="serving" className="mt-4 text-xl">
                    Serving
                  </label>
                  <Field
                    name="serving"
                    placeholder="4 people"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="serving">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <label htmlFor="cook_time" className="mt-4 text-xl">
                    Cook Time
                  </label>
                  <Field
                    name="cook_time"
                    placeholder="1hr 30mins"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="cook_time">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                  <label htmlFor="ingredients" className="mt-4 text-xl">
                    Ingredients
                  </label>
                  <FieldArray name="ingredient_list">
                    {({ insert, remove, push }) => (
                      <div className="">
                        {values.ingredient_list.length > 0 &&
                          values.ingredient_list.map(
                            (ingredient_list, index) => (
                              <div key={index}>
                                <div className="grid grid-cols-3 gap-4 my-4">
                                  <div className="">
                                    <Field
                                      name={`ingredient_list.${index}.ingredient_name`}
                                      placeholder="Ingredient"
                                      type="text"
                                      className="text bg-stone-100 rounded p-3 w-full"
                                    />
                                    <ErrorMessage
                                      name={`ingredient_list.${index}.ingredient_name`}
                                      component=""
                                      className=""
                                    />
                                  </div>
                                  <div className="">
                                    <Field
                                      name={`ingredient_list.${index}.ingredient_amount`}
                                      placeholder="Amount"
                                      className="text bg-stone-100 rounded p-3 w-full"
                                    />
                                    <ErrorMessage
                                      name={`ingredient_list.${index}.ingredient_name`}
                                      component=""
                                      className="f"
                                    />
                                  </div>
                                  <div className="flex flex-row">
                                    <button
                                      type="button"
                                      className="p-2 my-1"
                                      onClick={() => remove(index)}
                                    >
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
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        <button
                          type="button"
                          className="p-2 my-1 rounded bg-stone-100"
                          onClick={() =>
                            push({
                              ingredient_name: "",
                              ingredient_amount: "",
                            })
                          }
                        >
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
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  <button
                    type="submit"
                    className="p-2 mx-auto w-1/2 bg-stone-100 mt-4 mb-20 hover:bg-rosa hover:text-white rounded-lg"
                  >
                    Publish
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateRecipePage;
