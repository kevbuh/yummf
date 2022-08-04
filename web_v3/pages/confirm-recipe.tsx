import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

type CardProps = {
  name: string;
  children: any;
};

const Card = ({ name, children }: CardProps) => {
  return (
    <button className="p-3 rounded-xl bg-stone-100 font-medium m-1">
      {children}
    </button>
  );
};

function ConfirmRecipe() {
  const router = useRouter();

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center my-16 max-w-md mx-auto min-h-screen">
        <p className="text-6xl font-semibold mb-8">Success!</p>
        <p className="font-light text-xl">
          Your recipe has been successfully uploaded.
        </p>
        <p className="font-light text-xl">
          You can view it <span className="underline">here.</span>
        </p>
        <hr />
      </div>
    </div>
  );
}

export default ConfirmRecipe;
