import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer px-10 pt-10 pb-8  bg-stone-100 border-t-4 border-dashed">
      <Link href="/explore">
        <a className="font-semibold text-4xl md:m-auto text-rosa">yummf</a>
      </Link>
      <p className="footer-title mt-auto md:m-auto">
        {" "}
        © 2022 Yummf - All right reserved.
      </p>

      <div>
        <span className="footer-title">yummf</span>
        <Link href="/explore">
          <a className="link link-hover">Explore</a>
        </Link>
        <Link href="/account">
          <a className="link link-hover">Account</a>
        </Link>
        <Link href="/community">
          <a className="link link-hover">Community</a>
        </Link>
        <Link href="/">
          <a className="link link-hover">About Us</a>
        </Link>
      </div>
      <div>
        <span className="footer-title">Support</span>
        <Link href="/terms">
          <a className="link link-hover">Terms of Service</a>
        </Link>
        <Link href="/copyright">
          <a className="link link-hover">Copyright</a>
        </Link>
        <Link href="/help">
          <a className="link link-hover">Help Center</a>
        </Link>
        <Link href="privacy/">
          <a className="link link-hover">Privacy</a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
