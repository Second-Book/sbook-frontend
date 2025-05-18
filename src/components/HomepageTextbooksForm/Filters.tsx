"use client";

import useFormFilterSubmit from "@/hooks/useFormFilterSubmit";
import { usePathname } from "next/navigation";

const Filters = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const path = usePathname();
  const handleFormSubmit = useFormFilterSubmit("/textbooks");
  return (
    <form
      action={handleFormSubmit}
      key={path.toString()}
      className={`fixed w-screen h-screen left-0 top-0 z-5 flex flex-col bg-[#F2F4F8]  ${
        !visible ? "-translate-x-full" : ""
      } transition lg:static lg:w-86 lg:self-start lg:translate-0 lg:py-6 lg:h-fit lg:rounded-xl lg:font-(family-name:--font-poppins) lg:font-lg lg:sticky lg:top-[calc(var(--navbar-height)+(var(--spacing)*4))]`}>
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
          <button
            type="submit"
            className="text-2xl px-8 py-3 bg-white rounded-xl text-[#00000080] cursor-pointer">
            Search
          </button>
          <button
            type="button"
            className="text-2xl px-8 py-3 text-[#00000080] underline decoration-1 underline-offset-2 cursor-pointer">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
