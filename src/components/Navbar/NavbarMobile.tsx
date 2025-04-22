import React from "react";
import SearchForm from "./SearchForm";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faStar } from "@fortawesome/free-regular-svg-icons";

const NavbarMobile = () => {
  return (
    <header className="flex flex-col gap-6 lg:hidden sticky top-0 z-2 px-(--default-margin-sm) sm:px-(--default-margin-lg) border-b border-b-(--cool-gray-20) py-4 bg-white text-2xl">
      <nav className="flex justify-between items-center">
        <Link
          href="/textbooks"
          className="font-bold leading-none text-(--cool-gray-60) text-nowrap">
          <FontAwesomeIcon
            icon={faBookOpenReader}
            className="text-rose-800 mr-1"
          />
          Second Book
        </Link>
        <div className="flex gap-6 text-(--cool-gray-60)">
          <Link href={"/profile"}>
            <FontAwesomeIcon icon={faStar} />
          </Link>
          <Link href={"/profile"}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link href={"/new-textbook"}>
            <FontAwesomeIcon icon={faPlusCircle} className="text-rose-800" />
          </Link>
        </div>
      </nav>
      <SearchForm />
    </header>
  );
};

export default NavbarMobile;
