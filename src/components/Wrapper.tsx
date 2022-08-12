const Wrapper = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={`h-full relative overflow-hidden text-center max-w-3xl bg-slate-200 dark:bg-slate-800 mx-auto flex flex-col items-center justify-start`}
		>
			{children}
		</div>
	);
};

export default Wrapper;
