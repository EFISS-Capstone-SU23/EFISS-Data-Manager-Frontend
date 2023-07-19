import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/pages/dashboard/Dashboard';
import TemplatePage from './components/pages/tenplate/TemplatePage';
import UpsertTemplatePage from './components/pages/tenplate/UpsertTemplatePage';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<div className="flex pt-16 overflow-hidden">
				<SideBar />
				<div
					id="main-content"
					className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64"
				>
					<main>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/template" element={<TemplatePage />} />
							<Route path="/template/:id" element={<UpsertTemplatePage />} />
						</Routes>
					</main>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
