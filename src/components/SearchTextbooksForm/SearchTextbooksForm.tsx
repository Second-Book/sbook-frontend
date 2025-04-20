"use client";

import { TextbookType } from "@/utils/types";
import TextbookGrid from "../TextbookGrid/TextbookGrid";
import Form from "next/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface SearchTextbooksFormProps {
  textbooks: TextbookType[];
  query: string;
}

const SearchTextbooksForm = (props: SearchTextbooksFormProps) => {
  return (
    <Form
      action={`/textbooks`}
      className="w-full pl-(--default-margin) pr-70 flex flex-col gap-3">
      <input type="hidden" name="query" value={props.query} />
      <div className="flex gap-8">
        <div className=" hidden md:flex flex-col gap-24 bg-[#F2F4F8] px-4 py-6 w-86 self-start rounded-xl font-(family-name:--font-poppins) font-lg sticky top-[calc(var(--navbar-height)+(var(--spacing)*4))]">
          <div className="flex flex-col gap-6">
            <div>
              <label htmlFor="grade">Grade</label>
              <select
                name="grade"
                id="grade"
                className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none">
                <option value="all">All</option>
              </select>
            </div>
            <div>
              <label htmlFor="language">Language</label>
              <select
                name="language"
                id="language"
                className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none">
                <option value="all">All</option>
              </select>
            </div>
            <div>
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none">
                <option value="all">All</option>
              </select>
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <select
                name="subject"
                id="subject"
                className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none">
                <option value="all">All</option>
              </select>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <button className="text-2xl px-8 py-3 bg-white rounded-xl text-[#00000080] cursor-pointer">
              Search
            </button>
            <button className="text-2xl px-8 py-3 text-[#00000080] underline decoration-1 underline-offset-2 cursor-pointer">
              Clear
            </button>
          </div>
        </div>
        <TextbookGrid textbooks={props.textbooks}>
          <div className="absolute bottom-[calc(100%+var(--spacing)*2)] right-0 self-end flex gap-4 items-center text-lg">
            <label htmlFor="sort">Sort</label>
            <select
              name="sort"
              id="sort"
              className="bg-white w-40 px-2 py-1 rounded-md font-(family-name:--font-poppins) font-light appearance-none text-[#00000080]"
              onChange={(e) => e.target.form?.requestSubmit()}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price asc</option>
              <option value="price-dsc">Price dsc</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-2"
              pointerEvents={"none"}
            />
          </div>
        </TextbookGrid>
      </div>
    </Form>
  );
};

export default SearchTextbooksForm;
