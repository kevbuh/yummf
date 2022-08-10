import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import SignUpBanner from "../../components/SignUpBanner";
import { Formik, Form, Field } from "formik";

const NewIDPage: NextPage = () => {
  const { data: session } = useSession();
  const [comment, setComment] = useState(false);

  return (
    <>
      <NavBar />

      <div className="flex flex-col">
        <div className="flex flex-col-reverse md:flex-row">
          {/* left side */}
          <div className="md:w-8/12 mx-8 ">
            <div className="h-fit w-full grid grid-cols-2 gap-2 rounded-xl md:my-8">
              <div className="h-full w-full rounded-xl bg-stone-100 ">
                &nbsp;
              </div>
              <div className="h-full w-full gap-2 grid grid-rows-2">
                <div className="h-full w-full rounded-xl bg-stone-100 p-20">
                  &nbsp;
                </div>
                <div className="h-full w-full rounded-xl bg-stone-100">
                  &nbsp;
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div>
                <p className="text-2xl mt-4 font-semibold">Description</p>
                <p className="font-light">Caption</p>
              </div>
            </div>
            <hr />
            <div className="mb-8">
              <div>
                <p className="text-2xl mt-4 font-semibold pr-4">Ingredients</p>

                <div className="grid grid-cols-2 gap-4 mt-4 font-semibold">
                  <p className="">Ingredient</p>
                  <p className="mr-auto">Amount</p>
                </div>

                {/* <p className="font-light">
                  {data?.ingredientList?.length > 0
                    ? JSON.parse(JSON.stringify(data.ingredientList)).map(
                        (d: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className="grid grid-cols-2 gap-4 rounded-lg "
                            >
                              <p>{JSON.parse(d).ingredient_name}</p>
                              <p className="mr-auto">
                                {JSON.parse(d).ingredient_amount}
                              </p>
                            </div>
                          );
                        }
                      )
                    : null}
                </p> */}
              </div>
            </div>
            <hr />

            <div className="mb-8">
              <div>
                <p className="text-2xl mt-4 font-semibold pr-4">Directions</p>

                <div className=" mt-4 font-semibold">
                  <p className="">Steps</p>
                </div>
                {/* 
                <ol className="ml-4 space-y-2">
                  {data?.directions?.length > 0
                    ? JSON.parse(JSON.stringify(data.directions)).map(
                        (d: any, index: any) => {
                          return (
                            <div className="flex flex-col" key={index}>
                              <div className="flex flex-row">
                                <li className="mr-4 font-bold">{index}.</li>
                                <li>{JSON.parse(d).direction_description}</li>
                              </div>
                              <MiniNormalBoldArrow />
                            </div>
                          );
                        }
                      )
                    : null}
                </ol> */}
              </div>
            </div>
            <hr />

            <div className="">
              <p className="text-2xl mt-4 font-semibold">Comments</p>

              {-1 > 0 ? (
                <div></div>
              ) : (
                <div className="mt-2 ">
                  <p>No comments</p>{" "}
                </div>
              )}
              <div className=" h-full ">
                {1 > 3 && (
                  <p className="mb-4 font-medium text-gray-500 ml-3 cursor-pointer">
                    View all comments
                  </p>
                )}
                {comment ? null : (
                  <button
                    className="p-2 mt-2 bg-stone-100 hover:bg-rosa hover:text-white font-semibold rounded-xl"
                    onClick={() => setComment((comment) => !comment)}
                  >
                    Comment
                  </button>
                )}
              </div>
            </div>

            <br />
          </div>
          {/* right */}
          <div className="md:w-4/12">
            {/* <RecipeSidebar data={data} session={session} /> */}
          </div>
        </div>

        {session && <SignUpBanner />}
        <Footer />
      </div>
    </>
  );
};

export default NewIDPage;
