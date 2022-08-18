import type { NextPage } from "next";
import Footer from "../components/Footer";
import Link from "next/link";
import { CurveRightArrow, DottedArrow } from "../utils/arrows";

const CopyrightPage: NextPage = () => {
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
          <p className="font-semibold text-5xl my-4 text-center">Copyright</p>
        </div>

        <DottedArrow />

        <div className="items-center flex flex-col my-40 text-center justify-center align-center">
          <p className="font-semibold text-5xl my-4 text-center">
            Don&apos;t copyright
          </p>
          <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
            It&apos;s our policy—in appropriate circumstances and at our
            discretion—to disable or terminate the accounts of people who
            repeatedly infringe or are repeatedly charged with infringing
            copyrights or other intellectual property rights.
          </p>
        </div>

        <CurveRightArrow />

        <div className="items-center flex flex-col my-40 text-center justify-center align-center">
          <p className="font-semibold text-5xl my-4 text-center">
            Submit a complaint
          </p>
          <p className="mx-auto font-medium text-2xl text-gray-500 mb-8 max-w-lg px-6 sm:px-0">
            Submit a complaint by sending feedback to the{" "}
            <Link href="/help">
              <span className="underline cursor-pointer">Help Center</span>
            </Link>
            . When we get your complaint, we&apos;ll take whatever action we
            think is appropriate, which may include removing the reported
            content from Yummf.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CopyrightPage;
