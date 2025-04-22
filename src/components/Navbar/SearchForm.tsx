import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";

const SearchForm = () => {
  return (
    <Form action="/textbooks" className="grow">
      <div className="w-full h-12 flex items-center bg-[#F2F4F8] rounded-xl border-b border-b-(--cool-gray-30) text-lg pl-4 gap-2 focus-within:outline">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-(--cool-gray-60)"
        />
        <input
          type="text"
          name="query"
          placeholder="Search"
          className="w-full h-full focus:outline-none placeholder:text-black"
        />
      </div>
    </Form>
  );
};

export default SearchForm;
