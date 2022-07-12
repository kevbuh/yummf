import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function GroceryListPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div className="m-auto text-center">
          <p className="text-3xl font-semibold mt-40">
            Your Grocery List - Coming soon!
          </p>
          <p className="text-xl font-semibold mt-8">
            The development team is actively working on this feature
          </p>
          <p className="text-xl font-semibold">
            We hope that it will be able to bring you value.
          </p>
          <p className="underline cursor-pointer mt-4">
            Notify me when released
          </p>
        </div>

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default GroceryListPage;
