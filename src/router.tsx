import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "@/pages/homepage";
import ViewMatch from "@/pages/view-match";
import NewMatch from "@/pages/new-match";
import GameSelect from "@/pages/new-match/game-select";

function Router() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen dark:text-white dark:bg-slate-900 overflow-x-hidden">
        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route path="match/:id" element={<ViewMatch />} />
            <Route path="new">
              <Route index element={<GameSelect />} />
              <Route path=":gameId" element={<NewMatch />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
