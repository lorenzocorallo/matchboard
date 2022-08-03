import React, { createContext, HTMLAttributes, ProviderProps, useState } from "react";
import { useEffect } from "react";
import Match from "../types/Match";

interface IMatchesContext {
	matches: Match[];
	addMatch: (match: Match) => void;
}

export const MatchesContext = createContext<IMatchesContext>({
	matches: [],
	addMatch: () => {},
});

export const MatchesProvider = (props: HTMLAttributes<ProviderProps<IMatchesContext>>) => {
	const [matches, setMatches] = useState<Match[]>([]);

	const updateLocalMathces = (matches: Match[]) => {
		localStorage.setItem("matches", JSON.stringify(matches));
	};

	const getLocalMatches = () => {
		const localMatches = localStorage.getItem("matches");
		if (!localMatches) return [];
		const parsed = JSON.parse(localMatches);
		const matches = parsed
			.map((match: Match) => ({ ...match, date: new Date(match.date) }))
			.sort((a: Match, b: Match) => b.date.getTime() - a.date.getTime());
		return matches;
	};

	const addMatch = (match: Match) => {
		console.log("addMatch", match);
		setMatches((m) => {
			const newMatches = [...m, match];
			updateLocalMathces(newMatches);
			return newMatches;
		});
	};

	useEffect(() => {
		const local = getLocalMatches();
		console.log(local);
		setMatches(local);
	}, []);

	return <MatchesContext.Provider value={{ matches, addMatch }} {...props} />;
};
