import TextbookGridDataProvider from "@/components/TextbookGridDataProvider";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import TextbookCardSkeleton from "@/components/Skeleton/TextbookCardSkeleton";

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <TextbookCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Find Affordable Textbooks
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Buy and sell used textbooks at great prices
        </p>
        <SearchBar />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Textbooks</h2>
        <Suspense fallback={<LoadingSkeleton />}>
          <TextbookGridDataProvider searchParams={{}} />
        </Suspense>
      </section>
    </div>
  );
}
