const Wrapper = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className="text-center max-h-screen overflow-y-scroll relative flex flex-col h-full items-center justify-start pb-3">
			{children}
		</div>
	);
};

export default Wrapper;
