import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import React from "react";
import prisma from "../../utils/prisma";
import SignUpBanner from "../../components/SignUpBanner";
import Link from "next/link";

const NewIDPage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  return (
    <>
      <NavBar />
      <div className="p-6 max-w-4xl">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/explore">
                <a>Explore</a>
              </Link>
            </li>
            <li>
              <p>Learn</p>
            </li>
            <li>
              <a className="truncate">{data.title}</a>
            </li>
          </ul>
        </div>
        <p className="text-6xl font-semibold mb-8">{data.title}</p>
        <p className="font-light">{data.body}</p>
      </div>
      {!session && <SignUpBanner />}
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  const thisArticle = await prisma?.article.findUnique({
    where: {
      id: parseInt(query.id),
    },
    include: {
      comments: true,
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(thisArticle)),
    },
  };
};

export default NewIDPage;
