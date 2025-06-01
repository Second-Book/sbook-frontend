"use client";

import { useState } from "react";
import Sort from "./HomepageTextbooksForm/Sort";
import Filters from "./HomepageTextbooksForm/Filters";

const SortAndMobileFilters = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  return (
    <div className="w-full flex gap-4 lg:justify-end">
      <button
        className="flex-1 bg-white font-(family-name:--font-poppins) rounded-md font-light text-lg text-[#00000080] lg:hidden"
        onClick={() => setFiltersVisible(!filtersVisible)}>
        Filters
      </button>
      <Sort />
      <div
        className={`fixed w-90 max-w-screen lg:hidden h-screen overflow-y-auto right-[100%] top-0 pb-3 z-5 flex flex-col bg-[#F2F4F8] ${
          filtersVisible ? "translate-x-full" : ""
        } transition`}>
        <div className="w-full text-right text-2xl">
          <button
            type="button"
            onClick={() => setFiltersVisible(false)}
            className="px-6 py-3">
            x
          </button>
        </div>
        <Filters identifier="mobile" />
      </div>
    </div>
  );
};

export default SortAndMobileFilters;
