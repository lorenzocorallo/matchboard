import { useContext } from "react";
import { Link } from "react-router-dom";
import { MatchesContext } from "@/context/MatchesContext";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import MatchCard from "./MatchCard";

function Matches() {
  const { matches } = useContext(MatchesContext);
  return matches.length > 0 ? (
    <div className="p-4 gap-4 w-full flex flex-col flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-300 scrollbar-thumb-gray-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
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
  );
}

function Homepage() {
  return (
    <Wrapper>
      <Header title="Lista partite" />
      <Matches />
      <div className="flex w-full border-t-[1px] border-slate-800 dark:border-slate-200 justify-center items-center py-2 px-4">
        <Link to="/new" className="w-full">
          <Button theme="success" className="text-lg w-full mx-0 flex-1">
            Nuova Partita
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
}

export default Homepage;
