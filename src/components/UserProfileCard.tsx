"use client";

import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserProfileCard = () => {
  const path = usePathname();
  return (
    <div className="w-70 max-w-full flex flex-col p-6 gap-6">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-24 aspect-square rounded-full overflow-hidden">
          <Image
            src="/user-placeholder.jpg"
            alt="Profile picture"
            width={200}
            height={200}
          />
        </div>
        <h2 className="text-xl">John Doe</h2>
        <p className="text-(--cool-gray-60)">john.doe@email.com</p>
        <Link
          href={"/profile/edit"}
          className="w-full py-2 bg-black text-white text-center rounded-md">
          Edit Profile
        </Link>
      </div>
      <div className="w-full h-[1px] bg-(--cool-gray-20)" />
      <div className="flex flex-col gap-2 text-black">
        <Link
          href={"/profile/my-listings"}
          className={`p-2 ${
            path.includes("my-listings") ? "bg-gray-100" : ""
          } rounded-md hover:bg-(--cool-gray-30)`}>
          <FontAwesomeIcon icon={faBook} className="mr-2" />
          My listings
        </Link>
        <Link
          href={"/profile/messages"}
          className={`p-2 ${
            path.includes("messages") ? "bg-gray-100" : ""
          } rounded-md hover:bg-(--cool-gray-30)`}>
          <FontAwesomeIcon icon={faMessage} className="mr-2" />
          Messages
        </Link>
        <Link
          href={"/profile/saved-items"}
          className={`p-2 ${
            path.includes("saved-items") ? "bg-gray-100" : ""
          } rounded-md hover:bg-(--cool-gray-30)`}>
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Saved items
        </Link>
      </div>
    </div>
  );
};

export default UserProfileCard;
