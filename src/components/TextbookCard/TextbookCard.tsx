"use client";

import Image from "next/image";
import Link from "next/link";
import { TextbookType } from "@/utils/types";
import TextbookCardStyle from "./TextbookCardStyle.module.css";

interface TextbookCardProps {
  textbook: TextbookType;
}

const TextbookCard = ({ textbook }: TextbookCardProps) => {
  return (
    <Link
      href={`/textbook/${textbook.id}`}
      className={`bg-white rounded shadow-md relative rounded-xl overflow-hidden border border-[#DDE1E6]`}>
      <div className="w-full aspect-square relative">
        <Image
          src={textbook.image.preview}
          fill
          alt={textbook.title}
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
        />
      </div>
      <div className="flex flex-col px-4 py-6 gap-4">
        <div className="w-full flex justify-between items-center">
          <p className="p-1 font-bold text-white rounded-sm bg-[#D3D3D3]">
            {textbook.condition}
          </p>
          <h3 className="text-2xl font-bold">{textbook.price}</h3>
        </div>
        <div>
          <p className="font-medium">Grade {textbook.school_class}</p>
          <h3 className="text-2xl font-bold line-clamp-2">{textbook.title}</h3>
        </div>
        <p className="line-clamp-1">
          {textbook.author}, {textbook.publisher}
        </p>
      </div>
    </Link>
  );
};

export default TextbookCard;
