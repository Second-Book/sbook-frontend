import { TextbookType } from "@/utils/types";
import TextbookGridStyle from "./TextbookGridStyle.module.css";
import TextbookCard from "../TextbookCard/TextbookCard";
import { ReactNode } from "react";

interface TextbookGridProps {
  textbooks: TextbookType[];
  children?: ReactNode;
}

const TextbookGrid = (props: TextbookGridProps) => {
  return (
    <section className="grow relative">
      {props.children}
      <div className={`${TextbookGridStyle.textbookGrid}`}>
        {props.textbooks.map((textbook) => (
          <TextbookCard key={textbook.id} textbook={textbook} />
        ))}
      </div>
    </section>
  );
};

export default TextbookGrid;
