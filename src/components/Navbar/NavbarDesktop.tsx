"use client";

import useUserStore from "@/hooks/useUserStore";
import Image from "next/image";
import Link from "next/link";
import SearchForm from "./SearchForm";

const Navbar = () => {
  const { isAuthenticated, logout } = useUserStore((state) => state);

  return (
    <nav className="hidden lg:flex gap-6 sticky top-0 z-2 items-center w-full h-24 text-black bg-white px-(--default-margin-lg) border-b border-b-(--cool-gray-20)">
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-bold leading-none text-nowrap">
        <Image src="/logo.svg" alt="SecondBook" width={32} height={32} />
        <span>
          <span style={{ color: "#385572" }}>Second</span>
          <span style={{ color: "#4B7A25" }}>Book</span>
        </span>
      </Link>
      <SearchForm />
      {!isAuthenticated && (
        <Link
          href="/login"
          className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
          Prijava
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          href="/signup"
          className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
          Registracija
        </Link>
      )}
      {isAuthenticated && (
        <Link
          href="/profile/my-listings"
          className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
          Profil
        </Link>
      )}
      {isAuthenticated && (
        <button
          onClick={() => logout()}
          className="font-medium cursor-pointer relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
          Odjava
        </button>
      )}
      <Link
        href={isAuthenticated ? "/new-textbook" : "/login"}
        className="px-8 py-3 bg-rose-800 text-white text-xl rounded-xl font-(family-name:--font-poppins) font-light text-nowrap">
        Prodaj udžbenik
      </Link>
    </nav>
  );
};

export default Navbar;
