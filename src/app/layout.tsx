import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/ui/organisms/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Next 13 Masters shop",
	description: "My first Next 13 app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
