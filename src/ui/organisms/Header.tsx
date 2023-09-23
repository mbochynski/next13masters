import { ActiveLink } from "../atoms/ActiveLink";

export const Header = () => {
	return (
		<nav className="flex justify-center py-4">
			<ActiveLink
				href="/"
				exact
				className="px-2 pb-1 pt-2 text-lg text-blue-600"
				activeClassName="border-b-2 border-blue-500"
			>
				Home
			</ActiveLink>
			<ActiveLink
				href="/products"
				className="px-2 pb-1 pt-2 text-lg text-blue-600 "
				activeClassName="border-b-2 border-blue-500"
			>
				All
			</ActiveLink>
		</nav>
	);
};
