interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function Paper({ children, className, ...props }: Props) {
	return (
		<div className={`${className} flex flex-col items-center justify-start gap-2 dark:bg-slate-700 bg-white rounded-md p-4`} {...props}>
			{children}
		</div>
	);
};

export default Paper;
