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

function CreateRecipePage2() {
  const router = useRouter();
  const [next1, setNext1] = useState(false);
  const [next2, setNext2] = useState(false);
  const [next3, setNext3] = useState(false);
  const [next4, setNext4] = useState(false);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center my-16 max-w-md mx-auto min-h-screen">
        <p className="text-6xl font-semibold">Create your own</p>
        <p className="text-6xl font-semibold mb-8">Recipe</p>
        <hr />
        {!next1 && (
          <>
            <p className="font-light text-2xl">Select below the categories</p>
            <p className="font-light text-2xl">that describe your recipe</p>

            <div className="my-8">
              <Card name="Cooked">Cooked</Card>
              <Card name="Cooked">Baked</Card>
              <Card name="Cooked">Drink</Card>
              <Card name="Cooked">Sweet</Card>
              <Card name="Cooked">Salty</Card>
              <Card name="Cooked">Easy to make</Card>
              <Card name="Cooked">Fast</Card>
              <Card name="Cooked">Experimental</Card>
              <Card name="Cooked">Diet</Card>
              <Card name="Cooked">Vegan</Card>
              <Card name="Cooked">Cheap</Card>
              <Card name="Cooked">Expensive</Card>
              <Card name="Cooked">Snack</Card>
              <Card name="Cooked">Cake</Card>
              <Card name="Cooked">BBQ</Card>
              <Card name="Cooked">Healthy</Card>
              <Card name="Cooked">Desert</Card>
            </div>

            <button
              className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-8"
              onClick={() => {
                setNext1(true);
                // setNext1(true);
              }}
            >
              <Link href="/create-new">
                <a>Next</a>
              </Link>
            </button>
          </>
        )}
        {!next2 && next1 && (
          <>
            <p className="font-light text-2xl">Input your ingredients below</p>
            <p>Ingredient</p>
            <p>Amount</p>

            <button
              className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-8"
              onClick={(next2) => setNext2(true)}
            >
              <Link href="/create-new">
                <a>Next</a>
              </Link>
            </button>
          </>
        )}
        {!next3 && next2 && next1 && (
          <>
            <p className="font-light text-2xl">What are the directions? </p>
            <p>Step</p>
            <p>Description</p>

            <button
              className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-8"
              onClick={(next3) => setNext3(true)}
            >
              <Link href="/create-new">
                <a>Next</a>
              </Link>
            </button>
          </>
        )}
        {!next4 && next3 && next2 && next1 && (
          <>
            <p className="font-light text-2xl">
              Final step. What's the recipe name?{" "}
            </p>
            <p>Recipe name</p>

            <button
              className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-8"
              onClick={(next3) => {
                setNext3(true);
                router.push("/explore");
              }}
            >
              <Link href="/create-new">
                <a>Next</a>
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateRecipePage2;
