import NavBar from './NavBar';
import SideBar from './SideBar';

function BaseLayout({
	page,
}) {
	return (
		<>
			<NavBar />
			<SideBar />
			<div
				className="relative overflow-y-auto bg-gray-50 pt-16 pl-64"
				id="main-content"
			>
				<main>
					{page}
				</main>
			</div>
		</>
	);
}

export default BaseLayout;
