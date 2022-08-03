import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./List";
import Match from "./Match";
import NewMatch from "./NewMatch";

const Router = () => {
	return (
		<BrowserRouter>
			<div className="w-screen h-screen dark:text-white dark:bg-slate-800">
				<Routes>
					<Route path="/match/:id" element={<Match />} />
					<Route path="/new" element={<NewMatch />} />
					<Route path="/" element={<List />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default Router;
