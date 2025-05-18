"use client";

import useUserStore from "@/hooks/useUserStore";
import {
  faBookOpenReader,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SearchForm from "./SearchForm";

const Navbar = () => {
  const { isAuthenticated, logout } = useUserStore((state) => state);

  return (
    <nav className="hidden lg:flex gap-6 sticky top-0 z-2 items-center w-full h-24 text-black bg-white px-(--default-margin-lg) border-b border-b-(--cool-gray-20)">
      <Link
        href="/textbooks"
        className="text-2xl font-bold leading-none text-(--cool-gray-60) text-nowrap">
        <FontAwesomeIcon
          icon={faBookOpenReader}
          className="text-rose-800 mr-1"
        />
        Second Book
      </Link>
      <SearchForm />
      {!isAuthenticated && (
        <Link
          href="/login"
          className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
          Sign In
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          href="/signup"
          className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
          Sign Up
        </Link>
      )}
      {isAuthenticated && (
        <Link
          href="/profile/my-listings"
          className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
          Profile
        </Link>
      )}
      {isAuthenticated && (
        <button
          onClick={() => logout()}
          className="font-medium cursor-pointer relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
          Logout
        </button>
      )}
      <Link
        href={isAuthenticated ? "/new-textbook" : "/login"}
        className="px-8 py-3 bg-rose-800 text-white text-xl rounded-xl font-(family-name:--font-poppins) font-light text-nowrap">
        Sell a book
      </Link>
    </nav>
  );
};

export default Navbar;
