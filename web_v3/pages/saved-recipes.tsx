import { unstable_getServerSession } from "next-auth/next";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { authOptions } from "./api/auth/[...nextauth]";

function SavedRecipesPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Saved Recipes</p>
        </div>

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}

export default SavedRecipesPage;
