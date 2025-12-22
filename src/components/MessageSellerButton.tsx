"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

export default function MessageSellerButton({ seller }: { seller: string }) {
  return (
    <Link
      href={`/profile/messages?user=${encodeURIComponent(seller)}`}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <FontAwesomeIcon icon={faMessage} />
      Message Seller
    </Link>
  );
}

