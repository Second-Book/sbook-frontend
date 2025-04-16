import TextbookService from "@/services/TextbookService"
import SearchTextbooksForm from "@/components/SearchTextbooksForm/SearchTextbooksForm"

export const dynamic = "force-dynamic"

export default async function TextbookSearch({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string }>
}) {
	const textbooks = await TextbookService.getTextbooks()
	const { query = "" } = await searchParams

	if (!textbooks) {
		return <p>Ooops! We&apos;re having some trouble, please try again later</p>
	}

	return (
		<div className="flex flex-col items-center pt-20 pb-5 bg-[#FBFBFB]">
			<h2 className="text-lg font-bold leading-tight text-blue-900 text-center w-2/3 uppercase">
				Caption
			</h2>
			<h1 className="text-5xl font-bold">Newest textbooks</h1>
			<SearchTextbooksForm textbooks={textbooks.data} query={query} />
		</div>
	)
}
