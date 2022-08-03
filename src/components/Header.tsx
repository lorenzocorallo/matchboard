import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
}

const Header = ({ title }: Props) => {
	return (
		<div className="sticky top-0 w-full bg-white dark:bg-slate-800">
			<h1 className="text-3xl">Burraco</h1>
			{title && <h2 className="text-xl ">{title}</h2>}
			<hr className="my-3 dark:border-white " />
		</div>
	);
};

export default Header;
