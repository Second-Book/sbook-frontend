import { TextbookType } from "@/utils/types";
import TextbookGridStyle from "./TextbookGridStyle.module.css";
import TextbookCard from "../TextbookCard/TextbookCard";
import { ReactNode } from "react";

const TextbookGrid = ({ textbooks }: { textbooks: TextbookType[] }) => {
  return (
    <section className="grow relative">
      <div className={`${TextbookGridStyle.textbookGrid}`}>
        {textbooks.map((textbook, index) => (
          <TextbookCard key={textbook.id} textbook={textbook} index={index} />
        ))}
      </div>
    </section>
  );
};

export default TextbookGrid;
