import React, { useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	fullWidth?: boolean;
	label?: string;
	inline?: boolean;
}

const TextField = ({ fullWidth, label, inline, className = "", ...props }: Props) => {
	const id = useId();
	return (
		<div className={`flex gap-2 items-center ${inline ? "" : "flex-col"}`}>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				id={id}
				className={`${
					fullWidth ? "w-full" : ""
				} h-full block p-2 outline-none border-none rounded-md bg-slate-200 dark:bg-slate-500 ${className}`}
				{...props}
			/>
		</div>
	);
};

export default TextField;
