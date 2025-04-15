import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons"
import {
	faYoutube,
	faFacebook,
	faXTwitter,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const Footer = () => {
	return (
		<footer className="w-full h-64 bg-(--cool-gray-60) px-(--default-margin) flex flex-col justify-evenly">
			<div className="flex items-center justify-between">
				<div className="text-2xl text-(--cool-gray-30) font-bold">
					<FontAwesomeIcon
						icon={faBookOpenReader}
						className="text-rose-800 mr-1"
					/>
					Second Book
				</div>
				<div className="flex text-white gap-2">
					<p className="p-2">Eleven</p>
					<p className="p-2">Twelve</p>
					<p className="p-2">Thirteen</p>
					<p className="p-2">Fourteen</p>
					<p className="p-2">Fifteen</p>
					<p className="p-2">Sixteen</p>
				</div>
			</div>
			<div className="w-full h-[1px] bg-(--cool-gray-30)" />
			<div className="flex text-white justify-between">
				<p>CompanyName @ 202X. All rights reserved.</p>
				<div className="flex gap-6 text-2xl">
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
	)
}

export default Footer
