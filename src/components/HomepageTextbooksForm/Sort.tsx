"use client";

import useFormFilterSubmit from "@/hooks/useFormFilterSubmit";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Sort = () => {
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("sort") || "newest");
  const handleFormSubmit = useFormFilterSubmit("/textbooks");
  return (
    <form
      action={handleFormSubmit}
      className="flex-1 flex items-center text-lg lg:flex-initial gap-2 relative"
      key={params.toString()}>
      <label htmlFor="sort" className="hidden lg:inline-block">
        Sortiranje
      </label>
      <select
        name="sort"
        id="sort"
        value={value!}
        className="bg-white w-full px-2 py-2 rounded-md font-(family-name:--font-poppins) font-light appearance-none text-[#00000080] text-center lg:w-40 lg:text-left"
        onChange={(e) => {
          setValue(e.target.value);
          e.target.form?.requestSubmit();
        }}>
        <option value="newest">Najnovije</option>
        <option value="oldest">Najstarije</option>
        <option value="price-asc">Cena rastuće</option>
        <option value="price-dsc">Cena opadajuće</option>
      </select>
      <FontAwesomeIcon
        icon={faChevronDown}
        className="!hidden lg:!inline-block absolute right-2"
        pointerEvents={"none"}
      />
    </form>
  );
};

export default Sort;
