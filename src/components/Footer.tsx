import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full min-h-64 bg-(--cool-gray-60) px-(--default-margin-sm) sm:px-(--default-margin-lg) flex flex-col justify-evenly">
      <div className="flex items-center gap-10 justify-between">
        <div className="text-xl md:text-2xl text-(--cool-gray-30) font-bold text-nowrap">
          <FontAwesomeIcon
            icon={faBookOpenReader}
            className="text-rose-800 mr-1"
          />
          Second Book
        </div>
        <div className="flex text-white gap-x-2 flex-wrap">
          <Link href="/textbooks" className="p-2 hover:underline">Udžbenici</Link>
          <Link href="/about" className="p-2 hover:underline">O platformi</Link>
          <Link href="/new-textbook" className="p-2 hover:underline hidden md:block">Prodaj udžbenik</Link>
        </div>
      </div>
      <div className="w-full h-[1px] bg-(--cool-gray-30)" />
      <div className="flex text-white justify-between gap-10">
        <p>SecondBook &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
