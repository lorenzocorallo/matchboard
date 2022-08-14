import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	backPath?: string;
}

const Header = ({ title, backPath }: Props) => {
	const navigate = useNavigate();

	return (
		<div className="w-full py-3 border-b-[1px] border-slate-800 dark:border-slate-200 relative">
			{backPath && (
				<button onClick={() => navigate(backPath)} className="p-4 absolute left-1 top-1/2 -translate-y-[50%]">
					<IoArrowBack size={32} />
				</button>
			)}
			<h1 className="text-3xl">MatchBoard</h1>
			{title && <h2 className="text-xl ">{title}</h2>}
		</div>
	);
};

export default Header;
