import { useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";
import Paper from "../../Paper";
import Prompt from "../../Prompt";
import Switch from "../../Switch";

interface CustomPointsProps {
	isCustom: boolean;
	onValue?: (n: number) => void;
}
const CustomPoints = ({ isCustom, onValue = () => {} }: CustomPointsProps) => {
	const [active, setActive] = useState<boolean>(false);
	const [label, setLabel] = useState<string>("");

	const open = () => {
		setActive(true);
	};
	const close = () => {
		setActive(false);
	};

	const handleValue = (value: string) => {
		if (value === "" || isNaN(parseInt(value))) return;
		setLabel(value);
		const points = parseInt(value);
		onValue(points);
	};

	return (
		<>
			<Switch
				active={isCustom}
				onClick={open}
				activeLabel={
					<div className="flex items-center gap-2">
						{label} <IoPencil />
					</div>
				}
				inactiveLabel={
					<p className="flex items-center gap-2">
						Personalizzato <IoPencil size={20} />
					</p>
				}
			/>
			<Prompt label="Punteggio personalizzato" active={active} type="number" onValue={handleValue} onClose={close} />
		</>
	);
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	points: number[];
	onValue?: (n: number) => void;
	label?: string;
	isWinMethod?: boolean;
	showCustom?: boolean;
}
const PointsSelect = ({ points, label, isWinMethod = true, onValue = () => {}, showCustom = true }: Props) => {
	const [p, setP] = useState<number>(0);
	const [isCustom, setIsCustom] = useState<boolean>(false);

	useEffect(() => {
		onValue(p);
	}, [onValue, p]);

	useEffect(() => {
		setP(points[parseInt((points.length / 2).toFixed(0)) - 1]);
	}, [points]);

	const handleOnValue = (n: number, custom: boolean = false) => {
		setIsCustom(custom);
		setP(n);
	};

	return (
		<Paper>
			<p className="text-xl">{label || (isWinMethod ? "Punti per vincere" : "Punti per perdere")}</p>
			<div className="flex justify-center items-center">
				{points.map((v) => (
					<Switch
						key={v}
						active={p === v}
						onClick={(_) => handleOnValue(v)}
						activeLabel={v.toString()}
						inactiveLabel={v.toString()}
					/>
				))}
			</div>
			{showCustom && <CustomPoints isCustom={isCustom} onValue={(v) => handleOnValue(v, true)} />}
		</Paper>
	);
};

export default PointsSelect;
