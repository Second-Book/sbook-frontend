import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faFacebook,
  faXTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
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
          <p className="p-2">Eleven</p>
          <p className="p-2">Twelve</p>
          <p className="p-2 hidden md:block">Thirteen</p>
          <p className="p-2 hidden md:block">Fourteen</p>
          <p className="p-2 hidden md:block">Fifteen</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-(--cool-gray-30)" />
      <div className="flex text-white justify-between gap-10">
        <p>CompanyName @ 202X. All rights reserved.</p>
        <div className="text-xl flex gap-x-6 md:text-2xl flex-wrap items-center">
          <Link href="#">
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faXTwitter} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faLinkedin} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
