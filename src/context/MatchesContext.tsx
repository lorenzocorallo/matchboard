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

	const addMatch = (match: Match) => {
		setMatches((m) => [...m, match]);
	};

	useEffect(() => {
		localStorage.setItem("matches", JSON.stringify(matches));
	}, [matches]);

	useEffect(() => {
		const local = localStorage.getItem("matches");
		if (!local) return;
		const m = JSON.parse(local);
		setMatches(m);
	}, []);

	return <MatchesContext.Provider value={{ matches, addMatch }} {...props} />;
};
