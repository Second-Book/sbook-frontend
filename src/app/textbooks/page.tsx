import TextbookService from "@/services/TextbookService";
import SearchTextbooksForm from "@/components/SearchTextbooksForm/SearchTextbooksForm";

export default async function TextbookSearch({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const textbooks = await TextbookService.getTextbooks();
  const { query = "", ...params } = await searchParams;
  console.log(params);

  if (!textbooks) {
    return <p>Ooops! We&apos;re having some trouble, please try again later</p>;
  }

  return (
    <div className="flex flex-col items-center pt-10 sm:pt-20 pb-5 bg-[#FBFBFB] gap-16">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold leading-tight text-blue-900 text-center w-2/3 uppercase">
          Caption
        </h3>
        <h1 className="text-3xl sm:text-5xl font-bold">Newest textbooks</h1>
      </div>
      <SearchTextbooksForm textbooks={textbooks.data} query={query} />
    </div>
  );
}
