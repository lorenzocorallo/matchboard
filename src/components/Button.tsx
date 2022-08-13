interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: "success" | "error" | "default";
}

const Button = ({ theme = "default", children, disabled, className = "", ...props }: Props) => {
	let color;
	switch (theme) {
		case "success":
			color = "bg-green-600 hover:bg-green-700";
			break;
		case "default":
			color = "bg-gray-600 hover:bg-gray-700";
			break;
		case "error":
			color = "bg-red-600 hover:bg-red-700";
			break;
		default:
			break;
	}
	return (
		<button
			className={`m-2 px-4 py-2 text-white rounded-xl transition-all ${
				disabled
					? "bg-gray-300 hover:bg-gray-300 text-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600 dark:text-gray-900"
					: color
			}	
			${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
