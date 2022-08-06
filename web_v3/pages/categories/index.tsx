import { useSession } from "next-auth/react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideNavLayout from "../../components/sideNavLayout";
import SignUpBanner from "../../components/SignUpBanner";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-80 rounded-xl bg-stone-100 p-4 flex cursor-pointer">
      <p className="font-semibold text-xl mr-auto mt-auto">{name}</p>
    </div>
  );
};

function CategoriesAll() {
  const { data: session } = useSession();

  return (
    <SideNavLayout>
      {/* <NavBar /> */}

      <div className="flex flex-col items-center mt-16 mb-8  mx-auto">
        <p className="text-6xl font-semibold">Categories</p>
      </div>

      <div className="p-6 mx-4  grid grid-cols-3 gap-4 rounded-xl">
        <Card name="Breakfast" />
        <Card name="Brunch" />
        <Card name="Lunch" />
        <Card name="Dinner" />
        <Card name="Dessert" />
        <Card name="Snack" />
        <Card name="Drink" />
        <Card name="Mexican" />
        <Card name="Italian" />
        <Card name="Pasta" />
        <Card name="Fish" />
        <Card name="Vegetarian" />
      </div>

      {!session && <SignUpBanner />}
      {/* <Footer /> */}
    </SideNavLayout>
  );
}

export default CategoriesAll;
