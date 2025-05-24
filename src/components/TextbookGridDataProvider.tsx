import TextbookService from "@/services/TextbookService";
import TextbookGrid from "./TextbookGrid/TextbookGrid";

export default async function TextbookGridDataProvider({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const result = await TextbookService.getTextbooks(searchParams);

  if (!result) {
    return <p>Ooops! We&apos;re having some trouble, please try again later</p>;
  }
  return <TextbookGrid textbooks={result.data.results} />;
}
