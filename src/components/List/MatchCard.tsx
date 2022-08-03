import React from "react";
import { Link } from "react-router-dom";
import Match from "../../types/Match";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	match: Match;
}

const MatchCard = ({ match: m }: Props) => {
	return (
		<Link to={`/match/${m.id}`} key={m.id}>
			<div className="dark:bg-slate-600 my-5 rounded-xl cursor-pointer p-5 text-left">
				<p>{m.date.toLocaleDateString()}</p>
				<p>{m.name}</p>
				<p className={m.finished ? "text-green-400" : "text-yellow-400"}>{m.finished ? "Finita" : "In Corso"}</p>
			</div>
		</Link>
	);
};

export default MatchCard;
