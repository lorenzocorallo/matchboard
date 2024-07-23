import { createContext, ProviderProps, useState } from "react";
import { useEffect } from "react";
import Burraco from "@/data/games/burraco";
import Macchiavelli from "@/data/games/macchiavelli";
import Scopa from "@/data/games/scopa";
import Match from "@/types/match";

interface IMatchesContext {
  matches: Match[];
  addMatch: (match: Match) => void;
  updateMatch: (newMatch: Match) => void;
  deleteMatch: (id: string) => void;
}

export const MatchesContext = createContext<IMatchesContext>({
  matches: [],
  addMatch: () => {},
  updateMatch: () => {},
  deleteMatch: () => {},
});

function retroCompatibilityFix(matches: Match[]): Match[] {
  matches.forEach((match) => {
    match.date = new Date(match.date);
    if (typeof match.game === "string") {
      if (match.game === "burraco") {
        match.game = Burraco;
      } else if (match.game === "macchiavelli") {
        match.game = Macchiavelli;
      } else if (match.game === "scopa") {
        match.game = Scopa;
      }
    }
  });

  return matches;
}

function sortMatches(matches: Match[]): Match[] {
  return matches.sort(
    (a: Match, b: Match) => b.date.getTime() - a.date.getTime(),
  );
}

function updateSavedMatches(matches: Match[]): void {
  localStorage.setItem("matches", JSON.stringify(matches));
}

function getSavedMatches(): Match[] {
  const localMatches = localStorage.getItem("matches");
  if (!localMatches) return [];
  const parsed: Match[] = JSON.parse(localMatches);
  const fixed: Match[] = retroCompatibilityFix(parsed);
  const matches: Match[] = sortMatches(fixed);
  return matches;
}

export function MatchesProvider(
  props: React.HTMLAttributes<ProviderProps<IMatchesContext>>,
) {
  const [matches, setMatches] = useState<Match[]>([]);

  function addMatch(match: Match): void {
    setMatches((m) => {
      m.unshift(match);
      updateSavedMatches(m);
      return m;
    });
  }

  function updateMatch(newMatch: Match): void {
    const index = matches.findIndex((m) => m.id === newMatch.id);
    if (index === -1) return;
    setMatches((m) => {
      m[index] = newMatch;
      updateSavedMatches(m);
      return m;
    });
  }

  function deleteMatch(id: string): void {
    const newMatches = matches.filter((m) => m.id !== id);
    setMatches(newMatches);
    updateSavedMatches(newMatches);
  }

  useEffect(() => {
    const local = getSavedMatches();
    setMatches(local);
  }, []);

  return (
    <MatchesContext.Provider
      value={{ matches, addMatch, updateMatch, deleteMatch }}
      {...props}
    />
  );
}
