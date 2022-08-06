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

function IngredientsAll() {
  const { data: session } = useSession();

  return (
    <SideNavLayout>
      <div className="flex flex-col items-center mt-16 mb-8  mx-auto">
        <p className="text-6xl font-semibold">Playlists</p>
      </div>

      <div className="p-6 mx-4  grid grid-cols-3 gap-4 rounded-xl">
        <Card name="Adventurous" />
        <Card name="1980s Diner" />
        <Card name="Most Mexican " />
        <Card name="French Classics" />
        <Card name="Authentic Brazilian" />
        <Card name="Athlete Cheat Meals" />
      </div>

      {!session && <SignUpBanner />}
    </SideNavLayout>
  );
}

export default IngredientsAll;
