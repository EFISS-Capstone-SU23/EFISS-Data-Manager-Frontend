/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<nav
			className="fixed z-30 w-full bg-white border-b border-gray-200 h-15"
			id="navbar"
		>
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						<Link
							to="/"
							className="flex ml-2 md:mr-24"
						>
							<img
								src="/images/logo.svg"
								className="h-8 mr-3"
								alt="EFISS Logo"
							/>
							<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
								EFISS
							</span>
						</Link>
					</div>
					<div className="flex items-center">
						{/* Profile */}
						<div className="flex items-center ml-3">
							<div>
								<button
									type="button"
									className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
									id="user-menu-button-2"
									aria-expanded="false"
									data-dropdown-toggle="dropdown-2"
								>
									<span className="sr-only">Open user menu</span>
									<img
										className="w-8 h-8 rounded-full"
										src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
										alt="user"
									/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
