import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

function PersonalPreferencesPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Global Preferences</p>
        </div>

        <hr />

        <p className="text-xl font-semibold mt-8">Preferred Language</p>
        <div className="mb-8 flex flex-row">
          <p className="text-stone-500">English</p>
        </div>

        <p className="text-xl font-semibold mt-8">Time Zone</p>
        <div className="mb-8 flex flex-row">
          <p className="text-stone-500">UTC</p>
        </div>

        <hr />

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default PersonalPreferencesPage;
