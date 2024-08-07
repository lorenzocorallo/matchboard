import Button from "./button";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  activeLabel?: string | JSX.Element;
  inactiveLabel?: string | JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  active: boolean;
}

function Switch({
  activeLabel,
  inactiveLabel,
  active,
  onClick,
  className,
  ...props
}: Props) {
  return (
    <Button
      onClick={onClick}
      theme={active ? "success" : "default"}
      className={`py-1 ${className || ""}`}
      {...props}
    >
      {active ? activeLabel || "ON" : inactiveLabel || "OFF"}
    </Button>
  );
}
export default Switch;
