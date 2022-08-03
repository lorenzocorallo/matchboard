import Button from "./Button";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	activeLabel?: string;
	inactiveLabel?: string;
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
	active: boolean;
}

const Switch = ({ activeLabel, inactiveLabel, active, onClick, className, ...props }: Props) => {
	return (
		<Button
			onClick={onClick}
			theme={active ? "success" : "default"}
			className={`text-sm py-1  ${className}`}
			{...props}
		>
			{active ? activeLabel || "ON" : inactiveLabel || "OFF"}
		</Button>
	);
};
export default Switch;
