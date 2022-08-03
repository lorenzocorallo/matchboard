import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./List";
import Match from "./Match";
import NewMatch from "./NewMatch";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/match/:id" element={<Match />} />
				<Route path="/new" element={<NewMatch />} />
				<Route path="/" element={<List />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
