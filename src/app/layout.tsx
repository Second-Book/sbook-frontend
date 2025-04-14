import type { Metadata, Viewport } from "next"
import { Poppins, Roboto } from "next/font/google"
import "./globals.css"
import UserStoreProvider from "@/providers/UserStoreProvider"
import Navbar from "@/components/Navbar"

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
})

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["300"],
})

export const metadata: Metadata = {
	title: "EduMarket",
	description: "Your place for used books",
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 0,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} ${poppins.variable}`}>
				<UserStoreProvider>
					<Navbar />
					{children}
				</UserStoreProvider>
			</body>
		</html>
	)
}
