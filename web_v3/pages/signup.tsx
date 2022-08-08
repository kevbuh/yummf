import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FacebookSVG, EmailSVG, GoogleSVG } from "../utils/socialSVGs";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export default function SignUpPage() {
  const router = useRouter();
  const myRef = useRef<null | HTMLDivElement>(null);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const arrowDown = useRef<null | HTMLDivElement>(null);
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);

  const executeScroll = () => myRef?.current?.scrollIntoView();
  const executeScroll2 = () => {
    setShouldShowLogin((shouldShowLogin) => !shouldShowLogin);
    myRef?.current?.scrollIntoView();
  };

  const executeScrollArrow = () => arrowDown?.current?.scrollIntoView();

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/search-results?result=${searchField}`);
  };

  const SignUpFull = () => {
    return (
      <div className="h-full md:grid md:grid-cols-2 rounded-xl mx-4 ">
        <div className="m-auto invisible md:visible" ref={myRef}>
          <p className="md:mt-20 md:mb-20 text-7xl mx-auto font-bold border-4 border-rosa text-rosa rounded-full md:py-24 px-12 hover:text-white hover:bg-rosa hover:cursor-pointer">
            kooki
          </p>
        </div>
        <div className="m-auto">
          <div className="text-5xl font-semibold">
            {!shouldShowLogin ? "Sign Up " : "Log In "}&
          </div>
          <div className="text-5xl font-semibold mb-2">
            Start <span className="underline">Today!</span>
          </div>
          <div>
            <div className="mx-auto text-2xl rounded-lg bg-stone-100 p-2 text-center space-y-4 py-8">
              <button
                onClick={() => signIn("google")}
                className="rounded-full p-2 mr-4 bg-white"
              >
                <GoogleSVG />
              </button>
              <button
                onClick={() => signIn("facebook")}
                className="rounded-full p-2 ml-4 bg-white"
              >
                <FacebookSVG />
              </button>

              <div className="w-1/2 mx-auto"></div>
              <p className="text-base ">or</p>
              <button
                onClick={() => signIn("google")}
                className="flex flex-row mx-auto space-evenly rounded-lg p-3 bg-white text-base font-semibold"
              >
                <EmailSVG />
                Email address
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-2 flex flex-col-reverse w-full  h-screen">
        <div className="bg-rosa flex md:p-0 py-12">
          {" "}
          <Link href="/">
            <a
              className="px-12 py-24 font-semibold bg-white normal-case text-5xl text-rosa rounded-full flex m-auto cursor-pointer"
              onClick={executeScroll}
            >
              kooki <span className=" italic text-sm mb-auto">&nbsp; beta</span>
            </a>
          </Link>
        </div>
        <div className="flex my-auto flex-col w-full">
          <div className="mx-auto flex flex-col">
            <div className="text-7xl font-semibold">
              {!shouldShowLogin ? "Sign up " : "log In "} and
            </div>
            <div className="text-7xl font-semibold mb-2">
              start <span className="underline">today!</span>
            </div>
          </div>
          <div>
            <div className="mx-auto text-2xl rounded-lg p-2 text-center space-y-4 py-8">
              <button
                onClick={() => signIn("google")}
                className="rounded-full p-2 mr-4 bg-stone-100"
              >
                <GoogleSVG />
              </button>
              <button
                onClick={() => signIn("facebook")}
                className="rounded-full p-2 ml-4 bg-stone-100"
              >
                <FacebookSVG />
              </button>

              <div className="w-1/2 mx-auto"></div>
              <p className="text-base ">or</p>
              <button
                onClick={() => signIn("google")}
                className="flex flex-row mx-auto space-evenly rounded-lg p-3 bg-stone-100 text-base font-semibold"
              >
                <EmailSVG />
                Email address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/explore",
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
