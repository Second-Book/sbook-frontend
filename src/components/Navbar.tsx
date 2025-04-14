"use client"

import useUserStore from "@/hooks/useUserStore"
import {
	faBookOpenReader,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import Form from "next/form"

const Navbar = () => {
	const { isAuthenticated, logout } = useUserStore((state) => state)

	return (
		<header className="flex sticky top-0 z-2 items-center w-full h-24 text-xl text-black bg-white px-20 border-b gap-6 border-b-[#DDE1E6]">
			<Link
				href="/textbooks"
				className="sm:text-2xl font-bold leading-none text-[#697077] text-nowrap">
				<FontAwesomeIcon
					icon={faBookOpenReader}
					className="text-rose-800 mr-1"
				/>
				Second Book
			</Link>
			<Form action="/textbooks" className="grow">
				<div className="w-full h-12 flex items-center bg-[#F2F4F8] rounded-xl border-b border-b-[#C1C7CD] text-lg pl-4 gap-2 focus-within:outline">
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="text-[#697077]"
					/>
					<input
						type="text"
						name="query"
						placeholder="Search"
						className="w-full h-full focus:outline-none placeholder:text-black"
					/>
				</div>
			</Form>
			{!isAuthenticated && (
				<Link
					href="/login"
					className="focus:outline-none focus:ring-2 focus:ring-white font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-[#001D6C] text-lg text-[#001D6C]">
					Sign In
				</Link>
			)}
			{!isAuthenticated && (
				<Link
					href="/signup"
					className="focus:outline-none focus:ring-2 focus:ring-white font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-[#001D6C] text-lg text-[#001D6C]">
					Sign Up
				</Link>
			)}
			{isAuthenticated && (
				<Link
					href="/profile"
					className="focus:outline-none focus:ring-2 focus:ring-white font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-[#001D6C] text-lg text-[#001D6C]">
					Profile
				</Link>
			)}
			{isAuthenticated && (
				<button
					onClick={() => logout()}
					className="focus:outline-none focus:ring-2 focus:ring-white font-medium cursor-pointer relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-[#001D6C] text-lg text-[#001D6C]">
					Logout
				</button>
			)}
			<Link
				href={isAuthenticated ? "/new-textbook" : "/login"}
				className="px-8 py-3 bg-rose-800 text-white rounded-xl font-(family-name:--font-poppins) font-light text-nowrap">
				Sell a book
			</Link>
		</header>
	)
}

export default Navbar
