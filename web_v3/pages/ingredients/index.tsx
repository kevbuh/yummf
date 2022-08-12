import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideNavLayout from "../../components/sideNavLayout";
import SignUpBanner from "../../components/SignUpBanner";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <Link href="ingredients/salt">
      <div className="h-80 rounded-xl bg-stone-100 p-4 flex cursor-pointer">
        <p className="font-semibold text-xl mr-auto mt-auto">{name}</p>
      </div>
    </Link>
  );
};

function IngredientsAll() {
  const { data: session } = useSession();

  return (
    <SideNavLayout>
      {/* <NavBar /> */}

      <div className="flex flex-col items-center my-8  mx-auto">
        <p className="text-6xl font-semibold">Ingredients</p>
      </div>

      <div className="p-6 mx-4  grid grid-cols-3 gap-4 rounded-xl">
        <Card name="Salt" />
        <Card name="Pepper" />
        <Card name="Kale" />
        <Card name="Apples" />
        <Card name="Flour" />
        <Card name="Milk" />
        <Card name="Rice" />
        <Card name="Water" />
        <Card name="Canola Oil" />
        <Card name="Balsamic" />
        <Card name="Red Wine" />
        <Card name="Ketchup" />
        <Card name="Mayonnaise" />
        <Card name="Dijon Mustard" />
        <Card name="Soy Sauce" />
        <Card name="Chili Paste" />
        <Card name="Hot Sauce" />
        <Card name="Worcestershire" />
        <Card name="Peppercorns" />
        <Card name="Bay Leaves" />
        <Card name="Cayenne Pepper" />
        <Card name="Vanilla" />
        <Card name="Beans" />
        <Card name="Capers" />
        <Card name="Olives" />
        <Card name="Peanut Butter" />
        <Card name="Tomatoes" />
        <Card name="Salsa" />
        <Card name="Tuna" />
        <Card name="Couscous" />
        <Card name="Pasta" />
        <Card name="Rice" />
      </div>

      {!session && <SignUpBanner />}

      {/* <Footer /> */}
    </SideNavLayout>
  );
}

export default IngredientsAll;
