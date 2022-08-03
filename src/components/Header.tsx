import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	backPath?: string;
}

const Header = ({ title, backPath }: Props) => {
	const navigate = useNavigate();

	return (
		<div className="sticky top-0 w-full bg-white dark:bg-slate-800 pt-3">
			{backPath && (
				<button onClick={() => navigate(backPath)} className="p-4 absolute left-1 top-1/2 -translate-y-[60%]">
					<IoArrowBack size={32} />
				</button>
			)}
			<h1 className="text-3xl">Burraco</h1>
			{title && <h2 className="text-xl ">{title}</h2>}
			<hr className="my-3 dark:border-white " />
		</div>
	);
};

export default Header;
