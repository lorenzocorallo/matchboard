import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MatchesContext } from "@/context/matches";
import Button from "@/components/button";
import Header from "@/components/header";
import Wrapper from "@/components/wrapper";
import MatchCard from "./match-card";
import Switch from "@/components/switch";

const MATCH_STATUS = ["all", "finished", "running"] as const;
type MatchStatusFilter = (typeof MATCH_STATUS)[number];

function getStatusFilterLabel(statusFilter: MatchStatusFilter): string {
  switch (statusFilter) {
    case "all":
      return "Tutte";
    case "finished":
      return "Finite";
    case "running":
      return "In corso";
  }
}

function Matches() {
  const { matches: m } = useContext(MatchesContext);
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<MatchStatusFilter>("all");

  const matches = m.filter(match => selectedStatusFilter === "all" || match.finished === (selectedStatusFilter === "finished"));

  return (
    <div className="p-4 gap-4 w-full flex flex-col flex-1 overflow-y-hidden items-center">
      {matches.length > 0 && (
        <div className="flex gap-2">
          {MATCH_STATUS.map((status) => {
            const label = getStatusFilterLabel(status);
            return (
              <Switch
                key={status}
                className="py-2 px-4"
                active={selectedStatusFilter === status}
                onClick={() => setSelectedStatusFilter(status)}
                activeLabel={label}
                inactiveLabel={label}
              />
            );
          })}
        </div>
      )}
      {matches.length > 0 ? (
        <div className="gap-4 w-full flex flex-col flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-300 scrollbar-thumb-gray-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          {matches.map((m) => (
            <MatchCard match={m} key={m.id} />
          ))}
        </div>
      ) : (
        <div className="grid place-content-center flex-1 max-w-[20rem] gap-4">
          <p className="text-2xl">
            Ancora nessuna partita creata, iniziane una ora!
          </p>
        </div>
      )}
    </div>
  );
}

function Homepage() {
  return (
    <Wrapper>
      <Header title="Lista partite" />
      <Matches />
      <div className="flex w-full border-t-[1px] border-slate-800 dark:border-slate-200 justify-center items-center px-2 py-3">
        <Link to="/new" className="w-full">
          <Button theme="success" className="text-lg w-full mx-0 flex-1 py-3">
            Nuova Partita
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
}

export default Homepage;
