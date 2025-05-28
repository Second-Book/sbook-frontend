"use client";

import useFormFilterSubmit from "@/hooks/useFormFilterSubmit";
import { filtersSchema } from "@/utils/schemas";
import { FiltersErrors, FiltersState } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const defaultFormState = {
  school_class: "all",
  condition: "all",
  publisher: "",
  subject: "",
  author: "",
  min_price: "",
  max_price: "",
};

const Filters = ({ identifier }: { identifier?: string }) => {
  const params = useSearchParams();
  const initialFormState = useMemo(() => {
    console.log("params change detected");
    return {
      ...defaultFormState,
      ...Object.fromEntries(params.entries()),
    };
  }, [params]);
  const [formState, setFormState] = useState<FiltersState>(initialFormState);
  const [errors, setErrors] = useState<FiltersErrors>({ _errors: [] });

  const parseAndSubmit = (formData: FormData) => {
    console.log("Triggered");
    const result = filtersSchema.safeParse(formState);
    if (result.error) {
      console.log(result.error.format());
      setErrors(result.error.format());
      return;
    }
    setErrors({ _errors: [] });
    handleFormSubmit(formData);
  };

  useEffect(() => {
    setFormState(initialFormState);
  }, [initialFormState]);

  const handleFormSubmit = useFormFilterSubmit("/textbooks");
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      action={parseAndSubmit}
      key={params.toString() + (identifier ?? "")}
      ref={formRef}
      className={`font-(family-name:--font-poppins) font-lg`}>
      <div className="flex flex-col px-4 gap-24">
        <div className="flex flex-col gap-6">
          <div className="relative">
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
            <span className="absolute left-0 top-[100%] text-(--default-alert)">
              {errors.school_class?._errors}
            </span>
          </div>
          <div className="relative">
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
            <span className="absolute left-0 top-[100%] text-(--default-alert)">
              {errors.condition?._errors}
            </span>
          </div>
          <div className="relative">
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
            <span className="absolute left-0 top-[100%] text-(--default-alert)">
              {errors.publisher?._errors}
            </span>
          </div>
          <div className="relative">
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
              className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"
            />
            <span className="absolute left-0 top-[100%] text-(--default-alert)">
              {errors.subject?._errors}
            </span>
          </div>
          <div className="relative">
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
            <span className="absolute left-0 top-[100%] text-(--default-alert)">
              {errors.author?._errors}
            </span>
          </div>
          <div>
            <label htmlFor="min_price">Price</label>
            <div className="flex gap-4 relative">
              <input
                type="number"
                name="min_price"
                id="min_price"
                value={formState.min_price || ""}
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
                value={formState.max_price || ""}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    max_price: e.target.value,
                  }))
                }
                placeholder="To"
                className="w-full bg-white px-7 py-2 rounded-xl mt-2 text-[#00000080] appearance-none"
              />
              <span className="absolute left-0 top-[100%] text-(--default-alert)">
                {errors.max_price?._errors}
              </span>
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
            onClick={() => setFormState(defaultFormState)}
            className="text-2xl px-8 py-3 text-[#00000080] underline decoration-1 underline-offset-2 cursor-pointer">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
