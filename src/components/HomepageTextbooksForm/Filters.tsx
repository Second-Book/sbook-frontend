"use client";

import useFormFilterSubmit from "@/hooks/useFormFilterSubmit";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const Filters = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const path = usePathname();
  const handleFormSubmit = useFormFilterSubmit("/textbooks");
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form
      action={handleFormSubmit}
      key={path.toString()}
      ref={formRef}
      className={`fixed w-screen h-screen overflow-y-auto right-[100%] top-0 pb-3 z-5 flex flex-col bg-[#F2F4F8]  ${
        visible ? "translate-x-full" : ""
      } transition lg:transition-none lg:static lg:w-86 lg:shrink-0 lg:self-start lg:translate-0 lg:py-6 lg:h-fit lg:rounded-xl lg:font-(family-name:--font-poppins) lg:font-lg lg:sticky lg:top-[calc(var(--navbar-height)+(var(--spacing)*4))] lg:z-0`}>
      <div className="w-full lg:hidden text-right text-2xl">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="px-6 py-3">
          x
        </button>
      </div>
      <div className="flex flex-col px-4 gap-24">
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="grade">Grade</label>
            <select
              name="grade"
              id="grade"
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none">
              <option value="all">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div>
            <label htmlFor="condition">Condition</label>
            <select
              name="condition"
              id="condition"
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none">
              <option value="all">All</option>
              <option value="used-excellent">Used-Excellent</option>
              <option value="used-good">Used-Good</option>
              <option value="used-fair">Used-Fair</option>
            </select>
          </div>
          <div>
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              placeholder="E.g. Logos"
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"
            />
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="E.g. Chemistry"
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"></input>
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="E.g. John Smith"
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"
            />
          </div>
          <div>
            <label htmlFor="price-from">Price</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="price-from"
                id="price-from"
                placeholder="From"
                className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"
              />
              <input
                type="number"
                name="price-to"
                id="price-to"
                placeholder="To"
                className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <button
            type="submit"
            className="text-2xl px-8 py-3 bg-white rounded-xl text-[#00000080] cursor-pointer">
            Search
          </button>
          <button
            type="button"
            onClick={() => formRef.current?.reset()}
            className="text-2xl px-8 py-3 text-[#00000080] underline decoration-1 underline-offset-2 cursor-pointer">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
