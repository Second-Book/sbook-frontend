import TextbookGrid from "@/components/TextbookGrid/TextbookGrid";
import { TextbookType } from "@/utils/types";

const SavedItems = () => {
  const textbooks: TextbookType[] = [];
  return (
    <section className="w-full bg-white rounded-xl shadow-md border border-[#E5E7EB]">
      <h2 className="w-full px-8 py-7 text-xl border-b border-b-[#E5E7EB]">
        My Listings
      </h2>
      <div className="px-8 py-4">
        {textbooks.length ? (
          <TextbookGrid textbooks={textbooks} />
        ) : (
          "No saved textbooks to show"
        )}
      </div>
    </section>
  );
};

export default SavedItems;
