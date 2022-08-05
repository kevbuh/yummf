import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";

function CreateRecipePage2() {
  const router = useRouter();

  // used for which state the user is on
  const [next0, setNext0] = useState(false);
  const [next1, setNext1] = useState(false);
  const [next2, setNext2] = useState(false);
  const [next3, setNext3] = useState(false);
  const [next4, setNext4] = useState(false);
  const [next5, setNext5] = useState(false);

  const [selectionCooked, setSelectionCooked] = useState(false);
  const [selectionBaked, setSelectionBaked] = useState(false);
  const [selectionDrink, setSelectionDrink] = useState(false);

  // handle drink or baked
  const handleCooked = () => {
    setSelectionCooked((selectionCooked) => !selectionCooked);
    return Card;
  };

  type CardProps = {
    name: string;
    children: string;
  };

  const Card = ({ name, children }: CardProps) => {
    return (
      <button
        className={
          selectionCooked
            ? "bg-black text-white p-3 rounded-xl font-medium m-1"
            : "p-3 rounded-xl bg-stone-100 font-medium m-1"
        }
      >
        <p onClick={handleCooked}>{children}</p>
      </button>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center my-16 max-w-2xl mx-auto min-h-screen">
        {!next0 && (
          <>
            <p className="text-6xl font-semibold">What are you creating?</p>
            <hr />
            <p className="font-light text-2xl mt-8">
              Select below what suits best.
            </p>

            <div className="my-8">
              <Card name="Cooked">Cooked recipe</Card>
              <Card name="Baked">Something baked</Card>
              <Card name="Drink">A drink</Card>
            </div>

            <button
              className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-8"
              onClick={() => {
                setNext0(true);
              }}
            >
              <a>Next</a>
            </button>
          </>
        )}
        {!next1 && next0 && (
          <>
            <p className="text-6xl font-semibold">Create your own</p>
            <p className="text-6xl font-semibold mb-8">Recipe</p>
            <hr />
            <p className="font-light text-2xl">Select below the categories</p>
            <p className="font-light text-2xl">that describe your recipe</p>

            <div className="my-8">
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
              }}
            >
              <a>Next</a>
            </button>
          </>
        )}
        {!next2 && next1 && next0 && (
          <>
            <p className="text-6xl font-semibold">Create your own</p>
            <p className="text-6xl font-semibold mb-8">Recipe</p>
            <hr />
            <p className="font-light text-2xl">Input your ingredients below</p>
            <p>Ingredient</p>
            <p>Amount</p>

            <button
              className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-8"
              onClick={(next2) => setNext2(true)}
            >
              <a>Next</a>
            </button>
          </>
        )}
        {!next3 && next2 && next1 && next0 && (
          <>
            <p className="text-6xl font-semibold">Create your own</p>
            <p className="text-6xl font-semibold mb-8">Recipe</p>
            <hr />
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
        {!next4 && next3 && next2 && next1 && next0 && (
          <>
            <p className="text-6xl font-semibold">Create your own</p>
            <p className="text-6xl font-semibold mb-8">Recipe</p>
            <hr />
            <p className="font-light text-2xl">Whats the cook time? </p>
            <p>Prep</p>
            <p>Cook</p>
            <p>Total</p>

            <button
              className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-8"
              onClick={() => setNext4(true)}
            >
              <a>Next</a>
            </button>
          </>
        )}
        {!next5 && next4 && next3 && next2 && next1 && next0 && (
          <>
            <p className="text-6xl font-semibold">Create your own</p>
            <p className="text-6xl font-semibold mb-8">Recipe</p>
            <hr />
            <p className="font-light text-2xl">
              Final step. What&apos;s the recipe name?{" "}
            </p>
            <p>Recipe name</p>

            <button
              className="rounded-xl bg-black text-white font-semibold p-2 w-2/5 mt-8"
              onClick={() => {
                setNext5(true);
              }}
            >
              <Link href="/confirm-recipe">
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
