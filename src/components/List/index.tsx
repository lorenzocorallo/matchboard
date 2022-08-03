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
		</Wrapper>
	);
};

export default List;
