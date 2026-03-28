"use client";

import { useEffect, useState } from "react";
import TextbookGrid from "@/components/TextbookGrid/TextbookGrid";
import { TextbookType } from "@/utils/types";
import WishlistService from "@/services/WishlistService";

interface WishlistItem {
  id: number;
  textbook: TextbookType;
  created_at: string;
}

const SavedItems = () => {
  const [textbooks, setTextbooks] = useState<TextbookType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    WishlistService.getWishlist()
      .then((res) => {
        const items: WishlistItem[] = res.data;
        setTextbooks(items.map((item) => item.textbook));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full bg-white rounded-xl shadow-md border border-[#E5E7EB]">
      <h2 className="w-full px-8 py-7 text-xl border-b border-b-[#E5E7EB]">
        Saved Textbooks
      </h2>
      <div className="px-8 py-4">
        {loading ? (
          "Loading..."
        ) : textbooks.length ? (
          <TextbookGrid textbooks={textbooks} />
        ) : (
          "No saved textbooks to show"
        )}
      </div>
    </section>
  );
};

export default SavedItems;
