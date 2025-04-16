import { TextbookType } from "@/utils/types"
import TextbookGridStyle from "./TextbookGridStyle.module.css"
import TextbookCard from "../TextbookCard/TextbookCard"

interface TextbookGridProps {
	textbooks: TextbookType[]
}

const TextbookGrid = (props: TextbookGridProps) => {
	return (
		<section className="max-md:mt-10 max-md:max-w-full w-2/3 mx-auto">
			<div className={TextbookGridStyle.textbookGrid}>
				{props.textbooks.map((textbook) => (
					<TextbookCard key={textbook.id} textbook={textbook} />
				))}
			</div>
		</section>
	)
}

export default TextbookGrid
