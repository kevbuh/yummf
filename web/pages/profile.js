import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function ProfilePage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Profile</p>
        </div>
        <div>
          <p>Joined in ????</p>
          <p>???? liked recipes</p>
          <p>???? uploaded recipes</p>
        </div>

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
