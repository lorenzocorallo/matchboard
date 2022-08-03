interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: "success" | "default";
}

const Button = ({ theme = "default", children, className = "", ...props }: Props) => {
	return (
		<button
			className={`m-2 px-4 py-2 text-white rounded-md  transition-all ${
				theme === "default" && "bg-gray-600 hover:bg-gray-700"
			}   ${theme === "success" && "bg-green-600 hover:bg-green-700"} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
