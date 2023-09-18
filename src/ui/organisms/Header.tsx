import { ActiveLink } from "../atoms/ActiveLink";

export const Header = () => {
	return (
		<nav className="flex justify-center py-4">
			<ActiveLink href="/" exact className="p-2 text-lg text-blue-600" activeClassName="underline">
				Home
			</ActiveLink>
			<ActiveLink
				href="/products"
				className="p-2 text-lg text-blue-600"
				activeClassName="underline"
			>
				All
			</ActiveLink>
		</nav>
	);
};
