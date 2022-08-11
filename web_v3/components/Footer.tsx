import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer px-10 pt-10 pb-8 md:bg-white bg-stone-100">
      <Link href="/explore">
        <a className="font-semibold text-4xl md:m-auto text-rosa">yummf</a>
      </Link>
      <p className="footer-title mt-auto md:m-auto">
        {" "}
        © 2022 Yummf - All right reserved.
      </p>

      <div>
        <span className="footer-title">yummf</span>
        <Link href="/dashboard">
          <a className="link link-hover">Dashboard</a>
        </Link>
        <Link href="/account">
          <a className="link link-hover">Account</a>
        </Link>
        <Link href="/community">
          <a className="link link-hover">Community</a>
        </Link>
      </div>
      <div>
        <span className="footer-title">Support</span>
        <Link href="/">
          <a className="link link-hover">About us</a>
        </Link>
        <Link href="/help">
          <a className="link link-hover">Help</a>
        </Link>
        <Link href="/help">
          <a className="link link-hover">Report Abuse</a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
