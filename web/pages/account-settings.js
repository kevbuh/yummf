import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AccountSettingsPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Account</p>
          <p className="text-lg">
            <span className="font-semibold">First Last</span> | email@email.com
            | &nbsp;
            <span className="underline cursor-pointer">Go to profile</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-14 mx-auto">
          <button className="py-6 rounded-lg shadow border">
            Personal Info
          </button>
          <button className="py-6 rounded-lg shadow border">
            Login & Security
          </button>
          <button className="py-6 rounded-lg shadow border">Privacy</button>
          <button className="py-6 rounded-lg shadow border">Preferences</button>
        </div>
        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountSettingsPage;
