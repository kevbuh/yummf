import NavBar from "../../components/NavBar";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

function AccountSettingsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg sm:w-2/3 item-center mx-4 sm:mx-auto">
        <div>
          <p className="text-4xl mb-8">Account</p>
          <div className="flex flex-row">
            <div className="avatar">
              <div className="w-24 rounded-full mr-8">
                <img
                  src={session?.user?.image as string}
                  alt="User profile image"
                />
              </div>
            </div>
            <div className="my-auto">
              {session ? (
                <>
                  <p className="text-lg">
                    <span className="font-semibold text-xl">
                      Welcome, {session?.user?.email}
                    </span>
                  </p>
                  <Link href="/chef/1">
                    <a className="text-gray-500">View public profile</a>
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14 sm:mx-auto">
          <Link href="/account/info">
            <button className="py-6 rounded-lg shadow border">
              Personal Info
            </button>
          </Link>
          <Link href="/account/security">
            <button className="py-6 rounded-lg shadow border">
              Login & Security
            </button>
          </Link>
          <Link href="/account/privacy">
            <button className="py-6 rounded-lg shadow border">Privacy</button>
          </Link>
          <Link href="/account/preferences">
            <button className="py-6 rounded-lg shadow border">
              Preferences
            </button>
          </Link>
        </div>
        <div className="h-40"></div>
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

export default AccountSettingsPage;
