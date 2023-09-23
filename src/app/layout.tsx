import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Header } from "@/ui/organisms/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Next 13 Masters shop",
	description: "My first Next 13 app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={clsx(inter.className, "min-h-screen")}>
				<Header />
				<main className="flex min-h-screen flex-col items-center  p-8 md:p-10 lg:p-12">
					{children}
				</main>
			</body>
		</html>
	);
}
