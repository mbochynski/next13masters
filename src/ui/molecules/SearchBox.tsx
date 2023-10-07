"use client";
import { useRouter } from "next/navigation";
import { type FormEventHandler, useState, type ChangeEventHandler, useMemo } from "react";
import { debounce } from "ts-debounce";

export const SearchBox = () => {
	const [searchValue, setSearchValue] = useState("");
	const router = useRouter();

	const redirectDebounced = useMemo(() => {
		return debounce((searchValue: string) => {
			router.replace(`/search?query=${searchValue}`);
		}, 500);
	}, [router]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		redirectDebounced.cancel();
		router.replace(`/search?query=${searchValue}`);
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setSearchValue(event.target.value);
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		redirectDebounced(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Szukaj
				<input
					className="m-2 p-2"
					placeholder=""
					type="text"
					role="searchbox"
					value={searchValue}
					onChange={handleChange}
				/>
			</label>
		</form>
	);
};
