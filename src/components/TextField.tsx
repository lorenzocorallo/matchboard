import React, { useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	fullWidth?: boolean;
	fullHeight?: boolean;
	label?: string;
	inline?: boolean;
}

const TextField = (
	{ fullWidth, fullHeight, label, inline, className = "", ...props }: Props,
	ref: React.ForwardedRef<HTMLInputElement>
) => {
	const id = useId();
	return (
		<div className={`flex gap-2 items-center ${inline ? "" : "flex-col"} ${fullHeight ? "h-full" : ""}`}>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				ref={ref}
				id={id}
				className={`${fullWidth ? "w-full" : ""} ${
					fullHeight ? "h-full" : ""
				} block p-2 outline-none border-none rounded-md bg-white dark:bg-slate-700 text-black dark:text-white ${className}`}
				{...props}
			/>
		</div>
	);
};

export default React.forwardRef(TextField);
