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
              body: "",
              authorId: session?.userId,
            }}
            onSubmit={async (values) => {
              const apiRes = await fetch("/api/create_question", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  values: values,
                }),
              });

              const data = await apiRes.json();

              router.push(`/confirm-recipe?type=qas_${data.data}`);
            }}
          >
            <Form className=" flex flex-row mb-32 mt-16">
              <Field
                id="body"
                name="body"
                placeholder="Leave a comment..."
                className=" block p-4 pl-4 w-3/4 font-medium placeholder-gray-400 text-lg rounded sm:rounded-xl border-stone-100 border-4  "
              />
              <ErrorMessage name="body" />

              <button
                className="flex ml-2 max-w-xs text-xl p-3 rounded-xl bg-rosa text-white font-semibold"
                type="submit"
              >
                <p className="m-auto">Submit</p>
              </button>
            </Form>
          </Formik>

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
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisDiscussion)),
    },
  };
}

export default UniqueDiscussion;
