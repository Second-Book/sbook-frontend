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
		<header className="flex sticky top-0 z-2 items-center w-full h-24 text-xl text-black bg-white px-20 border-b gap-6 border-b-(--cool-gray-20)">
			<Link
				href="/textbooks"
				className="sm:text-2xl font-bold leading-none text-(--cool-gray-60) text-nowrap">
				<FontAwesomeIcon
					icon={faBookOpenReader}
					className="text-rose-800 mr-1"
				/>
				Second Book
			</Link>
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
			{!isAuthenticated && (
				<Link
					href="/login"
					className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
					Sign In
				</Link>
			)}
			{!isAuthenticated && (
				<Link
					href="/signup"
					className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
					Sign Up
				</Link>
			)}
			{isAuthenticated && (
				<Link
					href="/profile"
					className="font-medium relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
					Profile
				</Link>
			)}
			{isAuthenticated && (
				<button
					onClick={() => logout()}
					className="font-medium cursor-pointer relative after:absolute [&:not(:hover)]:after:hidden after:top-11/10 after:left-0 after:w-full after:h-[2px] after:bg-(--primary-90) text-lg text-(--primary-90)">
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
