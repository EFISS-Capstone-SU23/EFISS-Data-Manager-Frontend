import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/pages/dashboard/Dashboard';
import Template from './components/pages/tenplate/Template';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
				<SideBar />
				<div
					id="main-content"
					className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
				>
					<main>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/template" element={<Template />} />
						</Routes>
					</main>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
