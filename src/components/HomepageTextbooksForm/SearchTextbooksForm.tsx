"use client";

import { useState } from "react";
import Filters from "./Filters";
import Sort from "./Sort";

const SearchTextbooksForm = ({ children }: { children: React.ReactNode }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  return (
    <div className="w-full px-(--default-margin-sm) sm:px-(--default-margin-lg) 2xl:pr-70 flex gap-8">
      <Filters visible={filtersVisible} setVisible={setFiltersVisible} />
      <div className="w-full relative">
        <div className="w-full absolute left-0 bottom-[calc(100%+var(--spacing)*4)] flex gap-4 lg:justify-end">
          <button
            className="flex-1 bg-white font-(family-name:--font-poppins) rounded-md font-light text-lg text-[#00000080] lg:hidden"
            onClick={() => setFiltersVisible(!filtersVisible)}>
            Filters
          </button>
          <Sort />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SearchTextbooksForm;
