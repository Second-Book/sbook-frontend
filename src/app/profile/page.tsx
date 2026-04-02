"use client";

import useUserStore from "@/hooks/useUserStore";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const { user } = useUserStore((state) => state);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  // On desktop, the sidebar already shows the profile card,
  // so redirect to my-listings for content
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (mq.matches) {
      router.replace("/profile/my-listings");
    }
  }, [router]);

  if (!isHydrated) {
    return <div className="p-6 text-(--cool-gray-60)">Učitavanje...</div>;
  }

  if (!user) {
    return (
      <div className="w-full flex flex-col items-center gap-4 p-8">
        <p className="text-(--cool-gray-60)">Prijavite se da vidite profil</p>
        <Link
          href="/login"
          className="px-8 py-2 bg-black text-white text-center rounded-md">
          Prijava
        </Link>
      </div>
    );
  }

  const navItems = [
    { href: "/profile/my-listings", icon: faBook, label: "Moji oglasi" },
    { href: "/profile/messages", icon: faMessage, label: "Poruke" },
    { href: "/profile/saved-items", icon: faHeart, label: "Sačuvano" },
  ];

  return (
    <div className="w-full flex flex-col gap-6 lg:hidden">
      {/* Profile header */}
      <div className="bg-white rounded-xl shadow-md border border-[#E5E7EB] p-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
            <Image
              src="/user-placeholder.jpg"
              alt="Profilna slika"
              width={200}
              height={200}
              priority
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-medium">{user.username}</h2>
            <p className="text-(--cool-gray-60) text-sm">{user.email}</p>
          </div>
        </div>
        <Link
          href="/profile/edit"
          className="mt-4 block w-full py-2 bg-black text-white text-center rounded-md">
          Uredi profil
        </Link>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-md border border-[#E5E7EB] overflow-hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 border-b border-[#E5E7EB] last:border-b-0 text-black">
            <FontAwesomeIcon icon={item.icon} className="w-5 text-(--cool-gray-60)" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
