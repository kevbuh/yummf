import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

function PersonalPrivacyPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Account Privacy</p>
        </div>

        <hr />

        <p className="text-xl font-semibold mt-8">Privacy Policy</p>
        <div className="mb-8 flex flex-row">
          <p className="mt-2">We currently aren't tracking your data. Yay!</p>
        </div>

        <hr />

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default PersonalPrivacyPage;
