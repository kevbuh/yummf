import type { InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import Footer from "../../../components/Footer";
import prisma from "../../../utils/prisma";
import { CurlyArrow } from "../../../utils/arrows";
import CommunityNavBar from "../../../components/CommunityNavbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import router from "next/router";

const UniqueDiscussion = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();

  return (
    <div>
      <CommunityNavBar />

      <div className="max-w-6xl px-4 mx-auto mb-4">
        <div className="mt-8">
          <div className=" breadcrumbs">
            <ul>
              <li>
                <Link href="/community">
                  <a>Community</a>
                </Link>
              </li>

              <li>
                <p>Discussion</p>
              </li>
            </ul>
          </div>

          <div className="rounded-xl w-full mt-8 mb-16 bg-stone-100 py-8 px-4 max-w-xl">
            <p className="font-semibold text-5xl mb-4">{data.title}</p>
            <p className="font-medium text-xl  max-w-lg">{data.body}</p>
            <p className=" mb-8 text-gray-500">{data.createdAt}</p>
          </div>

          <hr />

          <Formik
            initialValues={{
              text: "",
              authorId: session?.userId,
            }}
            onSubmit={async (values) => {
              console.log("er");
              const apiRes: any = await fetch("/api/create_comment_qas", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  recipeId: data.id,
                  values: values,
                  userEmail: session?.user?.email,
                }),
              });

              const response = await apiRes.json();

              if (response.data == 201) {
                router.reload();
              } else {
                console.log("failed to comment");
              }
            }}
          >
            <Form className=" flex flex-row mt-8">
              <Field
                id="text"
                name="text"
                placeholder="Leave a comment..."
                className=" block p-4 pl-4 w-3/4 font-medium placeholder-gray-400 text-lg rounded sm:rounded-xl border-stone-100 border-4  "
              />
              <ErrorMessage name="text" />

              <button
                className="flex ml-2 max-w-xs text-xl p-3 rounded-xl bg-rosa text-white font-semibold"
                type="submit"
              >
                <p className="m-auto">Submit</p>
              </button>
            </Form>
          </Formik>

          <div className=" mb-32 mt-8">
            <p className="text-2xl mt-4 font-semibold">
              {data?.comments?.length} Comments
            </p>

            {data?.comments?.length > 0 ? (
              <div>
                {data?.comments.slice(0, 3).map((d: any, index: number) => (
                  <div className="my-2 p-3 flex flex-row" key={index}>
                    <div className="avatar">
                      <div className="w-12 rounded-full mr-4 bg-stone-100"></div>
                    </div>
                    <div className="my-auto">
                      <p>{d?.text}</p>
                      <p className="text-sm text-stone-400">
                        {d.createdAt.slice(5, 7)}/{d.createdAt.slice(2, 4)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-2 ">
                <p>No comments</p>{" "}
              </div>
            )}
          </div>

          <CurlyArrow />
          <div className=" border-stone-100 border-4 rounded-xl px-6 py-12 text-rosa font-semibold my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <p className="m-auto px-6 py-14 text-3xl bg-black rounded-full text-white hidden sm:block">
                yummf
              </p>
              <div className="m-auto">
                <p className="m-auto text-4xl text-black mb-4">
                  Thanks for being a part of our community.
                </p>
                <Link href="/explore">
                  <button className=" flex max-w-xs w-full text-xl p-3 rounded-xl bg-rosa text-white font-semibold text-center">
                    <p className="mx-auto">Start exploring recipes</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  const thisDiscussion = await prisma?.question.findUnique({
    where: {
      id: parseInt(query.id),
    },
    include: {
      comments: true,
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisDiscussion)),
    },
  };
}

export default UniqueDiscussion;
