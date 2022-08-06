import { Link } from "react-router-dom";
import Match from "../../types/Match";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	match: Match;
}

const MatchCard = ({ match: m }: Props) => {
	return (
		<Link to={`/match/${m.id}`}>
			<div className="dark:bg-slate-600 w-full my-5 rounded-xl cursor-pointer p-5 text-left">
				<p>{m.name}</p>
				<div className="flex justify-between">
					<p className={m.finished ? "text-green-400" : "text-yellow-400"}>{m.finished ? "Finita" : "In Corso"}</p>
					<p>
						{m.date.toLocaleTimeString([], {
							year: "numeric",
							month: "numeric",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default MatchCard;
