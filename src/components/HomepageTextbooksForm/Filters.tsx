"use client";

import useFormFilterSubmit from "@/hooks/useFormFilterSubmit";
import { usePathname, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const Filters = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const params = useSearchParams();
  const [formState, setFormState] = useState({
    school_class: params.get("school_class") || "all",
    condition: params.get("condition") || "all",
    publisher: params.get("publisher") || "",
    subject: params.get("subject") || "",
    author: params.get("author") || "",
    min_price: params.get("min_price") || "",
    max_price: params.get("max_price") || "",
  });
  const handleFormSubmit = useFormFilterSubmit("/textbooks");
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form
      action={handleFormSubmit}
      key={params.toString()}
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
            <label htmlFor="school_class">Grade</label>
            <select
              name="school_class"
              id="school_class"
              value={formState.school_class}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  school_class: e.target.value,
                }))
              }
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
              value={formState.condition}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  condition: e.target.value,
                }))
              }
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none">
              <option value="all">All</option>
              <option value="New">New</option>
              <option value="Used - Excellent">Used - Excellent</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">Used - Fair</option>
            </select>
          </div>
          <div>
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              value={formState.publisher}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  publisher: e.target.value,
                }))
              }
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
              value={formState.subject}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
              placeholder="E.g. Chemistry"
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"></input>
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              value={formState.author}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
              placeholder="E.g. John Smith"
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"
            />
          </div>
          <div>
            <label htmlFor="min_price">Price</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="min_price"
                id="min_price"
                value={formState.min_price}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    min_price: e.target.value,
                  }))
                }
                placeholder="From"
                className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"
              />
              <input
                type="number"
                name="max_price"
                id="max_price"
                value={formState.max_price}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    max_price: e.target.value,
                  }))
                }
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
