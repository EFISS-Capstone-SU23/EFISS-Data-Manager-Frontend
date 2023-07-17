import './App.css';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard';

function App() {
	return (
		<>
			<NavBar />
			<div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
				<SideBar />
				<div
					id="main-content"
					className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
				>
					<main>
						<Dashboard />
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
