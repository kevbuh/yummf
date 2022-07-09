import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { postNewRecipe } from "../fetches/allFetches";
import { useRouter } from "next/router";

function CreateRecipePage() {
  const router = useRouter();
  const mutation = useMutation(async (values) => {
    const posted = await postNewRecipe(values);
    if (posted === 201) {
      router.push("/dashboard");
    }
  });

  const initialValues = {
    name: "",
    description: "",
    source_url: "",
    serving: "",
    cook_time: "",

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
              description: Yup.string().required("Please enter a description"),
              source_url: Yup.string(),
              serving: Yup.string(),
              cook_time: Yup.string(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              mutation.mutate(values);
              setSubmitting(false);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="flex flex-col ">
                  <Field
                    name="name"
                    placeholder="Title"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>

                  <Field
                    name="description"
                    placeholder="Enter a description of this recipe"
                    className="text bg-stone-100 rounded p-3 w-full my-1"
                  />
                  <ErrorMessage name="description">
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
                    type="number"
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
                              <>
                                <div
                                  className="grid grid-cols-3 gap-4 my-4"
                                  key={index}
                                >
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
                              </>
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
