const Wrapper = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={`
				max-h-screen
				overflow-y-scroll
				overflow-x-hidden
				text-center
				max-w-3xl
				bg-slate-800
				mx-auto
				scrollbar-thin
				scrollbar-thumb-gray-600
				scrollbar-track-slate-800
				scrollbar-thumb-rounded-full
				relative
				flex
				flex-col
				h-full
				items-center
				justify-start
			`}
		>
			{children}
		</div>
	);
};

export default Wrapper;
