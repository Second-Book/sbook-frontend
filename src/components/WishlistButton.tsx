"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import WishlistService from "@/services/WishlistService";
import useUserStore from "@/hooks/useUserStore";

export default function WishlistButton({ textbookId }: { textbookId: number }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    WishlistService.checkWishlist(textbookId)
      .then((res) => setInWishlist(res.data.in_wishlist))
      .catch(() => {});
  }, [textbookId, isAuthenticated]);

  if (!isAuthenticated) return null;

  const toggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (inWishlist) {
        await WishlistService.removeFromWishlist(textbookId);
        setInWishlist(false);
      } else {
        await WishlistService.addToWishlist(textbookId);
        setInWishlist(true);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
        inWishlist
          ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
          : "border-gray-300 text-gray-600 hover:bg-gray-50"
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      title={inWishlist ? "Remove from saved" : "Save textbook"}
    >
      <FontAwesomeIcon icon={inWishlist ? faHeartSolid : faHeartRegular} />
      {inWishlist ? "Saved" : "Save"}
    </button>
  );
}
