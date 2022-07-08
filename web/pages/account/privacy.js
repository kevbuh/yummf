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

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default PersonalPrivacyPage;
