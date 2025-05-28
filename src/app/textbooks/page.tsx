import Filters from "@/components/HomepageTextbooksForm/Filters";
import SortAndMobileFilters from "@/components/SortAndMobileFilters";
import TextbookGridDataProvider from "@/components/TextbookGridDataProvider";

export default async function TextbookSearch({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  return (
    <section className="flex flex-col items-center pt-10 sm:pt-20 pb-5 gap-10">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold leading-tight text-blue-900 text-center w-2/3 uppercase">
          Caption
        </h3>
        <h1 className="text-3xl sm:text-5xl font-bold">Newest textbooks</h1>
      </div>
      <div className="w-full px-(--default-margin-sm) sm:px-(--default-margin-lg) 2xl:pr-70 pb-30 flex flex-col gap-4">
        <SortAndMobileFilters />
        <div className="flex gap-8">
          <aside className="hidden w-86 lg:block bg-[#F2F4F8] py-6 rounded-md shrink-0 self-start sticky top-[calc(var(--navbar-height)+(var(--spacing)*4))] z-0">
            <Filters />
          </aside>
          <TextbookGridDataProvider searchParams={await searchParams} />
        </div>
      </div>
    </section>
  );
}
