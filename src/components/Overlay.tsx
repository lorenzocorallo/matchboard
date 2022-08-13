import { IoClose, IoRemove } from "react-icons/io5";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	active: boolean;
	onClose: () => void;
}

const Overlay = ({ active, children, onClose, className, ...props }: Props) => {
	return (
		<div
			className={`absolute top-0 left-0 pt-[25%] backdrop-blur-lg backdrop-brightness-50 h-full w-full transition-all text-white ${
				active ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-10"
			} ${className}`}
		>
			<button className="top-4 right-4 absolute border-2 rounded-full p-1" onClick={onClose}>
				<IoClose size={24} color="white" />
			</button>
			{children}
		</div>
	);
};

export default Overlay;
