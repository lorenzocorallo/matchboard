import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MatchesContext } from "../../context/MatchesContext";
import Button from "../Button";
import Header from "../Header";
import Wrapper from "../Wrapper";
import MatchCard from "./MatchCard";

const NewMatchBtn = () => (
	<Link to="/new">
		<Button theme="success" className="text-lg w-full mx-0">
			Nuova Partita
		</Button>
	</Link>
);

const List = () => {
	const { matches } = useContext(MatchesContext);
	return (
		<Wrapper>
			<Header title="Lista partite" />
			{matches.length > 0 ? (
				<div className="px-5 w-full flex flex-col flex-1">
					<div className="flex-1">
						{matches.map((m) => (
							<MatchCard match={m} key={m.id} />
						))}
					</div>
					<NewMatchBtn />
				</div>
			) : (
				<div className="grid place-content-center flex-1 max-w-[20rem] gap-4">
					<p className="text-2xl">Ancora nessuna partita creata, iniziane una ora!</p>
					<NewMatchBtn />
				</div>
			)}
		</Wrapper>
	);
};

export default List;
