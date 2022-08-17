import { Formik, Form, Field, ErrorMessage } from "formik";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import CommunityNavBar from "../../components/CommunityNavbar";
import Footer from "../../components/Footer";
import { CurlyArrow } from "../../utils/arrows";
import { authOptions } from "../api/auth/[...nextauth]";

function CreateCommunityQuestion() {
  const [searchField, setSearchField] = useState("");

  const { data: session } = useSession();

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/search-results?result=qas_${searchField}`);
  };

  return (
    <div>
      <CommunityNavBar />
      <div className="max-w-6xl px-4 mx-auto mb-4">
        <div className="mt-8">
          <div className="rounded-xl w-full mt-16 mb-8">
            <p className="font-semibold text-5xl mb-4">Create a Discussion</p>
            <p className="font-medium text-xl mb-8 max-w-lg">
              Ask anything for the community to help with your recipe, learn
              about ingredients, or ask any cooking related question.
            </p>
          </div>

          <Formik
            initialValues={{
              title: "",
              body: "",
              authorId: session?.userId,
              authorDisplayName: session?.displayName,
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
            <Form className=" flex flex-col mb-32">
              <Field
                id="title"
                name="title"
                placeholder="Title..."
                className=" block p-4 pl-4 w-3/4 font-medium placeholder-gray-400 text-lg rounded sm:rounded-xl border-stone-100 border-4 mb-4 "
              />
              <ErrorMessage name="title" />

              <Field
                id="body"
                name="body"
                placeholder="Enter a description..."
                className=" block p-4 pl-4 font-medium placeholder-gray-400 text-lg rounded sm:rounded-xl border-stone-100 border-4 "
              />
              <ErrorMessage name="body" />

              <div className="flex flex-row mt-8">
                <Link href="/community/questions">
                  <button className=" flex  max-w-xs text-xl p-3 rounded-xl font-semibold mr-4">
                    Cancel
                  </button>
                </Link>
                <button
                  className=" flex max-w-xs text-xl p-3 rounded-xl bg-rosa text-white font-semibold"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>

          <CurlyArrow />

          <div className=" border-stone-100 border-4 rounded-xl px-6 py-12 text-rosa font-semibold my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <p className="mx-auto px-8 py-12 text-3xl bg-black rounded-full text-white hidden sm:block">
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
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}

export default CreateCommunityQuestion;
