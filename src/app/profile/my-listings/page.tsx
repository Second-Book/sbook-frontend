"use client";

import TextbookGrid from "@/components/TextbookGrid/TextbookGrid";
import useUserStore from "@/hooks/useUserStore";
import TextbookService from "@/services/TextbookService";
import { TextbookType } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyListings = () => {
  const { user } = useUserStore((state) => state);
  const router = useRouter();
  const [textbooks, setTextbooks] = useState<TextbookType[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const textbooks = async () => {
      const result = await TextbookService.getUserTextbooks(user.username);
      setTextbooks(result.data.results);
    };
    textbooks();
  }, [user]);

  return (
    <section className="w-full bg-white rounded-xl shadow-md border border-[#E5E7EB]">
      <h2 className="w-full px-8 py-7 text-xl border-b border-b-[#E5E7EB]">
        My Listings
      </h2>
      <div className="px-8 py-4">
        {textbooks.length ? (
          <TextbookGrid textbooks={textbooks} />
        ) : (
          "No textbooks to show"
        )}
      </div>
    </section>
  );
};

export default MyListings;
