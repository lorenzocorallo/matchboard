import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MatchesContext } from "../../context/MatchesContext";
import Button from "../Button";
import Header from "../Header";
import Wrapper from "../Wrapper";
import MatchCard from "./MatchCard";

const List = () => {
	const { matches } = useContext(MatchesContext);
	return (
		<Wrapper>
			<Header title="Lista partite" />
			{matches.length > 0 ? (
				<div className="px-5 pb-2 w-full flex flex-col flex-1">
					{matches.map((m) => (
						<MatchCard match={m} key={m.id} />
					))}
				</div>
			) : (
				<div className="grid place-content-center flex-1 max-w-[20rem] gap-4">
					<p className="text-2xl">Ancora nessuna partita creata, iniziane una ora!</p>
				</div>
			)}
			<div className="sticky bottom-0 left-0 flex bg-slate-800 w-full border-t-[1px] justify-center items-center py-2 px-5">
				<Link to="/new" className="w-full">
					<Button theme="success" className="text-lg w-full mx-0 flex-1">
						Nuova Partita
					</Button>
				</Link>
			</div>
		</Wrapper>
	);
};

export default List;
