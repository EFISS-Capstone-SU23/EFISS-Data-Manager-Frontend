import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/pages/dashboard/Dashboard';
import TemplatePage from './components/pages/tenplate/TemplatePage';
import UpsertTemplatePage from './components/pages/tenplate/UpsertTemplatePage';
import CrawlPage from './components/pages/crawl/CrawlPage';
import ViewCrawl from './components/pages/crawl/ViewCrawl';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<SideBar />
			<div
				className="relative overflow-y-auto bg-gray-50 pt-16 pl-64"
				id="main-content"
			>
				<main>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/template" element={<TemplatePage />} />
						<Route path="/template/:id" element={<UpsertTemplatePage />} />
						<Route path="/crawl" element={<CrawlPage />} />
						<Route path="/crawl/view/:id" element={<ViewCrawl />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
