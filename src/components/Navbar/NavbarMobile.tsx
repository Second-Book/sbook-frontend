"use client";

import SearchForm from "./SearchForm";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser, faStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import ProfileSlidingWindow from "../ProfileSlidingWindow";

const NavbarMobile = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="flex flex-col gap-6 lg:hidden sticky top-0 z-2 px-(--default-margin-sm) sm:px-(--default-margin-lg) border-b border-b-(--cool-gray-20) py-4 bg-white text-2xl">
      <nav className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold leading-none text-nowrap">
          <Image src="/logo.svg" alt="SecondBook" width={28} height={28} />
          <span>
            <span style={{ color: "#385572" }}>Second</span>
            <span style={{ color: "#4B7A25" }}>Book</span>
          </span>
        </Link>
        <div className="flex gap-6 text-(--cool-gray-60)">
          <Link href={"/profile"}>
            <FontAwesomeIcon icon={faStar} />
          </Link>
          <button onClick={() => setProfileOpen(!profileOpen)}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          <Link href={"/new-textbook"}>
            <FontAwesomeIcon icon={faPlusCircle} className="text-rose-800" />
          </Link>
        </div>
      </nav>
      <SearchForm />
      <ProfileSlidingWindow visible={profileOpen} setVisible={setProfileOpen} />
    </header>
  );
};

export default NavbarMobile;
