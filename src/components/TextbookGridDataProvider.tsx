import TextbookService from "@/services/TextbookService";
import TextbookGrid from "./TextbookGrid/TextbookGrid";
import PageSelector from "./PageSelector";

export default async function TextbookGridDataProvider({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const resultsPerPage = 20;
  const offset = searchParams["offset"] ? parseInt(searchParams["offset"]) : 0;

  const result = await TextbookService.getTextbooks({
    params: { ...searchParams, limit: resultsPerPage, offset: offset },
  });

  // Handle API errors gracefully (e.g., backend not available)
  if (!result) {
    return <p>Ups! Nešto je pošlo naopako, pokušajte ponovo kasnije</p>;
  }

  const currentPage = Math.floor(offset / resultsPerPage) + 1;

  return result.data.count ? (
    <div className="w-full relative">
      <TextbookGrid textbooks={result.data.results} />
      <PageSelector
        results={result.data.count}
        currentPage={currentPage}
        resultsPerPage={resultsPerPage}
      />
    </div>
  ) : (
    <div>Nema rezultata</div>
  );
}
