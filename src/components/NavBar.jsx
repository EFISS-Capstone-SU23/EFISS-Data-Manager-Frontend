/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function NavBar() {
	const [navbarOpen, setNavbarOpen] = useState(false);

	const { currentUser, setIsAuthenticated } = useAuth();
	const navigate = useNavigate();

	const toggleNavbar = () => {
		setNavbarOpen(!navbarOpen);
	};

	const handleSignOut = () => {
		setIsAuthenticated(false);
		navigate('/login');
	};

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
									onClick={toggleNavbar}
								>
									<img
										className="w-8 h-8 rounded-full"
										src="/images/user-avatar.png"
										alt="user"
									/>
								</button>
							</div>

							<div
								className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${navbarOpen ? 'block' : 'hidden'}`}
								style={{
									position: 'absolute',
									inset: '0px auto auto 0px',
									margin: '0px',
									transform: 'translate(1714px, 55px)',
								}}
							>
								<div className="px-4 py-3" role="none">
									<p
										className="text-sm text-gray-900 dark:text-white"
									>
										{`${currentUser?.firstName} ${currentUser?.lastName}` || 'User Name'}
									</p>
									<p
										className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
									>
										{currentUser?.email || 'User Email'}
									</p>
								</div>
								<ul className="py-1" role="none">
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											onClick={handleSignOut}
										>
											Sign out
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
