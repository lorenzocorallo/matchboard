import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./List";
import Match from "./Match";
import NewMatch from "./NewMatch";
import GameSelect from "./NewMatch/GameSelect";

function Router() {
	return (
		<BrowserRouter>
			<div className="w-screen h-screen dark:text-white dark:bg-slate-900 overflow-x-hidden">
				<Routes>
					<Route path="/">
						<Route index element={<List />} />
						<Route path="match/:id" element={<Match />} />
						<Route path="new">
							<Route index element={<GameSelect />} />
							<Route path=":gameId" element={<NewMatch />} />
						</Route>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default Router;
