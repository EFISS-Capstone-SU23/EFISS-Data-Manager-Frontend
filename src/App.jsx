import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/pages/dashboard/Dashboard';
import TemplatePage from './components/pages/tenplate/TemplatePage';
import UpsertTemplatePage from './components/pages/tenplate/UpsertTemplatePage';
import CrawlPage from './components/pages/crawl/CrawlPage';
import ViewCrawl from './components/pages/crawl/ViewCrawl';
import UpsertCrawlPage from './components/pages/crawl/UpsertCrawlPage';
import ProductPage from './components/pages/product/ProductPage';
import ViewProductPage from './components/pages/product/ViewProductPage';

import BaseLayout from './components/BaseLayout';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<BaseLayout page={<Dashboard />} />}
				/>
				<Route
					path="/template"
					element={<BaseLayout page={<TemplatePage />} />}
				/>
				<Route
					path="/template/:id"
					element={<BaseLayout page={<UpsertTemplatePage />} />}
				/>
				<Route
					path="/crawl"
					element={<BaseLayout page={<CrawlPage />} />}
				/>
				<Route
					path="/crawl/view/:id"
					element={<BaseLayout page={<ViewCrawl />} />}
				/>
				<Route
					path="/crawl/:id"
					element={<BaseLayout page={<UpsertCrawlPage />} />}
				/>
				<Route
					path="/product"
					element={<BaseLayout page={<ProductPage />} />}
				/>
				<Route
					path="/product/:id"
					element={<BaseLayout page={<ViewProductPage />} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
