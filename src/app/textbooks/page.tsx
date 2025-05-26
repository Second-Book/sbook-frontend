import SearchTextbooksForm from "@/components/HomepageTextbooksForm/SearchTextbooksForm";
import TextbookGridDataProvider from "@/components/TextbookGridDataProvider";

export default async function TextbookSearch({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  return (
    <section className="flex flex-col items-center pt-10 sm:pt-20 pb-5 gap-20">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold leading-tight text-blue-900 text-center w-2/3 uppercase">
          Caption
        </h3>
        <h1 className="text-3xl sm:text-5xl font-bold">Newest textbooks</h1>
      </div>
      <SearchTextbooksForm>
        <TextbookGridDataProvider searchParams={await searchParams} />
      </SearchTextbooksForm>
    </section>
  );
}
