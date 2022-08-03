import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MatchesContext } from "../../context/MatchesContext";
import Button from "../Button";
import MatchCard from "./MatchCard";

const List = () => {
	const { matches } = useContext(MatchesContext);
	return (
		<div className="text-center max-h-screen overflow-y-scroll relative flex flex-col h-full items-center justify-center py-3">
			<div className="sticky top-0 w-full bg-white dark:bg-slate-800">
				<h1 className="text-3xl">Burraco</h1>
				<h2 className="text-xl ">Lista partite</h2>
				<hr className="my-3 dark:border-white " />
			</div>
			{matches.length ? (
				<div className="px-5">
					{matches.map((m) => (
						<MatchCard match={m} />
					))}
				</div>
			) : (
				<div className="grid place-content-center flex-1 max-w-[20rem] gap-4">
					<p className="text-2xl">Ancora nessuna partita creata, iniziane una ora!</p>
					<Link to="/new">
						<Button className="bg-green-600 hover:bg-green-700 text-lg">Nuova Partita</Button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default List;
