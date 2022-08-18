import type { NextPage } from "next";
import Footer from "../components/Footer";
import Link from "next/link";
import { CurlyArrow, DottedArrow } from "../utils/arrows";

const PrivacyPage: NextPage = () => {
  return (
    <>
      <div className="px-6 sm:px-0">
        <div className="flex flex-row sm:grid sm:grid-cols-2 bg-white py-6 sm:p-6">
          <Link href="/">
            <p className="text-2xl font-bold my-auto cursor-pointer">yummf</p>
          </Link>
          <div className="ml-auto grid grid-cols-2 sm:gap-4"></div>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="items-center flex flex-col my-40 justify-center align-center">
          <p className="font-semibold text-5xl my-4 text-center">
            Privacy Policy
          </p>
        </div>

        <DottedArrow />

        <div className="items-center flex flex-col my-40 text-center justify-center align-center">
          <p className="font-semibold text-5xl my-4 text-center">
            1. When you give us permission to obtain it
          </p>
          <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
            When you sign up for or use Yummf you voluntarily share certain
            information including your name, email address, photos, recipes,
            comments, and any other information you give us. You will also have
            the option to share other information about yourself such as your
            gender, age and preferred language. If you connect your Facebook,
            Google (opens in a new window) or other third-party accounts to
            Yummf, we use information from those accounts (such as your friends
            or contacts) to improve your Yummf experience. This is dependent on
            the privacy policies or settings for those accounts.
          </p>
        </div>

        <CurlyArrow />

        <div className="items-center flex flex-col my-40 text-center justify-center align-center">
          <p className="font-semibold text-5xl my-4 text-center">
            2. Technical information
          </p>
          <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
            When you use a website, mobile application or other internet
            service, certain internet and electronic network activity
            information gets created and logged automatically. This is also true
            when you use Yummf.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPage;
