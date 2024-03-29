import React from "react";
import Link from "next/link";

function SignUpBanner() {
  return (
    <div className="mx-6 bg-rosa rounded-xl px-6 py-12 text-white font-semibold my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <p className="mx-auto px-8 py-12 text-3xl bg-white rounded-full text-rosa hidden sm:block">
          yummf
        </p>
        <div className="mx-auto">
          <p className="mx-auto text-4xl  mb-4">Get Started Today</p>
          <Link href="/signup">
            <button className="rounded-xl p-4 bg-rosalight text-xl italic  mx-auto w-full">
              Sign Up &nbsp;&rarr;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpBanner;
