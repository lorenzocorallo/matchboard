const Button = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={`m-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-all ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
