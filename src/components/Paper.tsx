interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Paper = ({ children, className, ...props }: Props) => {
	return (
		<div className={`${className} dark:bg-slate-700 bg-white rounded-xl p-4`} {...props}>
			{children}
		</div>
	);
};

export default Paper;
