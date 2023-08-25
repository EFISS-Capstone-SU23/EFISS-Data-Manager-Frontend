import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/pages/dashboard/Dashboard';
import TemplatePage from './components/pages/tenplate/TemplatePage';
import UpsertTemplatePage from './components/pages/tenplate/UpsertTemplatePage';
import CrawlPage from './components/pages/crawl/CrawlPage';
import ViewCrawl from './components/pages/crawl/ViewCrawl';
import UpsertCrawlPage from './components/pages/crawl/UpsertCrawlPage';
import ProductPage from './components/pages/product/ProductPage';
import ViewProductPage from './components/pages/product/ViewProductPage';
import NotFoundPage from './components/pages/static/NotFoundPage';
import ErrorPage from './components/pages/static/ErrorPage';
import LoginPage from './components/pages/auth/LoginPage';

import BaseLayout from './components/BaseLayout';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={(
							<ProtectedRoute>
								<BaseLayout page={<Dashboard />} />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/template"
						element={(
							<ProtectedRoute>
								<BaseLayout page={<TemplatePage />} />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/template/:id"
						element={(
							<ProtectedRoute>
								<BaseLayout page={<UpsertTemplatePage />} />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/crawl"
						element={<BaseLayout page={<CrawlPage />} />}
					/>
					<Route
						path="/crawl/view/:id"
						element={(
							<ProtectedRoute>
								<BaseLayout page={<ViewCrawl />} />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/crawl/:id"
						element={(
							<ProtectedRoute>
								<BaseLayout page={<UpsertCrawlPage />} />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/product"
						element={(
							<ProtectedRoute>
								<BaseLayout page={<ProductPage />} />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/product/:id"
						element={(
							<ProtectedRoute>
								<BaseLayout page={<ViewProductPage />} />
							</ProtectedRoute>
						)}
					/>

					<Route
						path="/login"
						element={(
							<ProtectedRoute needLoggedIn={false}>
								<LoginPage />
							</ProtectedRoute>
						)}
					/>

					<Route path="/404" element={<NotFoundPage />} />
					<Route path="/500" element={<ErrorPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
