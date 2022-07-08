import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

function PersonalInformationPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Person Information</p>
          <p className="text-lg">
            <span className="font-semibold">First Last</span> | email@email.com
            | &nbsp;
            <span className="underline cursor-pointer">Go to profile</span>
          </p>
        </div>

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default PersonalInformationPage;
