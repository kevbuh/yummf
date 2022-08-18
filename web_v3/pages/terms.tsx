import type { NextPage } from "next";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  CurlyArrow,
  CurveRightArrow,
  DottedArrow,
  NormalBoldArrow,
} from "../utils/arrows";

const TermsPage: NextPage = () => {
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
            Terms of service
          </p>
        </div>

        <DottedArrow />

        <div className="items-center flex flex-col my-40 text-center justify-center align-center">
          <p className="font-semibold text-5xl my-4 text-center">
            How Yummf and other users can use your content
          </p>
          <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
            You grant Yummf and our users a non-exclusive, royalty-free,
            transferable, sublicensable, worldwide license to use, store,
            display, reproduce, save, modify, create derivative works, perform,
            and distribute your User Content on Yummf solely for the purposes of
            operating, developing, providing, and using Yummf. Nothing in these
            Terms restricts other legal rights Yummf may have to User Content,
            for example under other licenses. We reserve the right to remove or
            modify User Content, or change the way it’s used in Yummf, for any
            reason. This includes User Content that we believe violates these
            Terms, our Community Guidelines, or any other policies.
          </p>
        </div>

        <CurlyArrow />

        <div className="items-center flex flex-col my-40 text-center justify-center align-center">
          <p className="font-semibold text-4xl my-4 text-center">
            If you post your content on Yummf, we can show it to people and
            others can save it. Don&apos;t post porn or spam or be a jerk to
            other people.
          </p>
        </div>
      </div>

      <CurveRightArrow />

      <div className="items-center flex flex-col my-40 text-center justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">Security</p>
        <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
          We care about the security of our users. While we work to protect the
          security of your content and account, Yummf can’t guarantee that
          unauthorized third parties won’t be able to defeat our security
          measures. We ask that you keep your password secure. Please notify us
          immediately of any compromise or unauthorized use of your account.
        </p>
      </div>

      <NormalBoldArrow />

      <div className="items-center flex flex-col my-40 text-center justify-center align-center">
        <p className="font-semibold text-5xl my-4 text-center">
          Limitation of liability
        </p>
        <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
          We are building the best service we can for you but we can&apos;t
          promise it will be perfect. We&apos;re not liable for various things.
          If you think we are, let&apos;s try to work it out like adults.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default TermsPage;
