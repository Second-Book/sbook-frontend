"use client"

import Image from "next/image"
import Link from "next/link"
import { TextbookType } from "@/utils/types"
import TextbookCardStyle from "./TextbookCardStyle.module.css"

interface TextbookCardProps {
    textbook: TextbookType
}

const TextbookCard = (props: TextbookCardProps) => {
    return (
        <div className={`${TextbookCardStyle.textbookCard} ${TextbookCardStyle.relativeModule} flex flex-col gap-5 p-5 bg-white rounded shadow-md relative`}>
            <Image src={props.textbook.image.preview} width={240} height={312} alt={props.textbook.title} className="object-contain w-[240px] h-[312px]"/>
            <Link href={`/textbook/${props.textbook.id}`} className={`${TextbookCardStyle.detailsButton} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                Details
            </Link>
            <h2 className="text-2xl font-bold leading-tight">{props.textbook.title}</h2>
            <p className="text-lg leading-tight">Author: {props.textbook.author}</p>
            <p className="text-lg leading-tight">Publisher: {props.textbook.publisher}</p>
            <p className="text-lg leading-tight">Price: {props.textbook.price}</p>
            <button className={TextbookCardStyle.addToCartButton} onClick={() => {}}>
                Add to Cart
            </button>
        </div>
    )
}

export default TextbookCard