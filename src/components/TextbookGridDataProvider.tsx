import TextbookService from "@/services/TextbookService";
import TextbookGrid from "./TextbookGrid/TextbookGrid";
import PageSelector from "./PageSelector";

export default async function TextbookGridDataProvider({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const result = await TextbookService.getTextbooks(searchParams);

  if (!result) {
    return <p>Ooops! We&apos;re having some trouble, please try again later</p>;
  }
  console.log(result.data);

  const resultsPerPage = 20;
  const currentPage = searchParams["offset"]
    ? Math.floor(Number(searchParams["offset"]) / resultsPerPage)
    : 1;

  return result.data.count ? (
    <>
      <TextbookGrid textbooks={result.data.results} />
      <PageSelector
        results={result.data.count}
        currentPage={currentPage}
        resultsPerPage={resultsPerPage}
      />
    </>
  ) : (
    <div>No results to show</div>
  );
}
