import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import CommunityNavBar from "../../components/CommunityNavbar";
import Footer from "../../components/Footer";
import { CurlyArrow } from "../../utils/arrows";
import { SearchIcon } from "../../utils/icons";
import prisma from "../../utils/prisma";

type CardProps = {
  name: string;
  id: number;
  numComments: number;
  authorDisplayName: string;
  createdAt: string;
};

const Card = ({
  name,
  id,
  authorDisplayName,
  createdAt,
  numComments,
}: CardProps) => {
  return (
    <Link href={`discussion/${id}`}>
      <div className="my-4 w-full rounded-xl bg-stone-100 p-4 cursor-pointer hover:shadow-lg flex flex-col">
        <p className="truncate font-semibold text-xl my-2">{name}</p>
        <div className="md:w-1/2 grid grid-cols-3 divide-x-4 mt-2">
          <p className="pr-8 ">{numComments} answers </p>
          <p className="px-8 text-center ">
            {createdAt.slice(5, 7)}/{createdAt.slice(2, 4)}
          </p>
          <p className="px-8 ">{authorDisplayName} </p>
        </div>
      </div>
    </Link>
  );
};

function CommunityPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/search-results?result=qas_${searchField}`);
  };

  console.log(data);

  return (
    <div>
      <CommunityNavBar />
      <div className="max-w-6xl px-3 mx-auto mb-4">
        <div className="mt-8">
          <div className="rounded-xl w-full my-16 bg-stone-100 p-6">
            <p className="font-semibold text-5xl mb-4">Questions & Answers</p>
            <p className="font-medium text-xl mb-8 max-w-lg">
              Get help with your recipe, learn about ingredients, or ask any
              cooking related question.
            </p>

            <form className="w-full sm:mx-auto">
              <div className="relative ">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <SearchIcon />
                  {/* @ts-ignore */}
                  <button onClick={onSubmit}></button>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className=" block p-4 pl-14 w-full text-black  font-medium placeholder-gray-400 text-lg rounded sm:rounded-xl border-stone-100 border-4 "
                  placeholder="Search for questions about recipes..."
                  onChange={(e) => setSearchField(e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  required
                />
              </div>
            </form>

            <div className="flex flex-row mt-8">
              <Link href="/community/questions">
                <button className=" flex  max-w-xs text-xl p-3 rounded-xl font-semibold mr-4">
                  View all
                </button>
              </Link>
              <button
                className=" flex max-w-xs text-xl p-3 rounded-xl bg-black text-white font-semibold"
                onClick={() => router.push("/community/create")}
              >
                Ask a Question
              </button>
            </div>
          </div>

          <hr />

          <div className="rounded-xl w-full my-16">
            <div className="flex flex-row">
              <p className="font-semibold text-5xl mb-4">Featured Questions</p>
              {/* <button className="ml-auto font-semibold">View All</button> */}
            </div>
            {data.map((d: any, index: number) => {
              return (
                <Card
                  key={index}
                  name={d.title}
                  id={d.id}
                  authorDisplayName={d.authorDisplayName}
                  createdAt={d.createdAt}
                  numComments={d.comments?.length}
                />
              );
            })}

            {data.length == 0 && (
              <button
                onClick={() => router.push("/community/create")}
                className=" mt-4 mb-16"
              >
                No questions yet!{" "}
                <span className="underline">Ask a Question</span>
              </button>
            )}
          </div>

          {/* <hr /> */}

          {/* <div className="rounded-xl w-full my-16">
            <div className="flex flex-row">
              <p className="font-semibold text-5xl mb-4">
                Most Recent Questions
              </p>

              <button className="ml-auto font-semibold">View All</button>
            </div>
            <Card name="superlongitle " />
            <Card name="test" />
          </div>
          <hr />

          <div className="rounded-xl w-full my-16">
            <div className="flex flex-row">
              <p className="font-semibold text-5xl mb-4">
                Unanswered Questions
              </p>
              <button className="ml-auto font-semibold">View All</button>
            </div>
            <Card name="superlongitle " />
            <Card name="test" />
          </div> */}

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
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  const thisRecipe = await prisma?.question.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisRecipe)),
    },
  };
};

export default CommunityPage;
