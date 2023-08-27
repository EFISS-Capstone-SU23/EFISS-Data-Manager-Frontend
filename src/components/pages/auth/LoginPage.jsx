import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ModalManager from '../../../utils/ModalManager';
import authAPI from '../../../api/authAPI';
import { useAuth } from '../../../contexts/AuthContext';

const validate = (username, password) => {
	// check not empty
	if (!username) {
		return 'Username is required.';
	}
	if (!password) {
		return 'Password is required.';
	}

	return null;
};

function LoginPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { setIsAuthenticated, setCurrentUser } = useAuth();

	const handleLogin = () => {
		const error = validate(username, password);
		if (error) {
			ModalManager.showError(error);
			return;
		}

		authAPI
			.login(username, password)
			.then((res) => {
				if (res.status === 200) {
					ModalManager.showSuccess('Login successfully.');
					setIsAuthenticated(true);
					setCurrentUser(res.data);
					navigate('/');
				} else {
					ModalManager.showError('Login failed.');
				}
			})
			.catch((err) => {
				ModalManager.showError(err.response?.data?.message || 'Login failed.');
			});
	};

	return (
		<main className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
				<Link
					to="/"
					className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10"
				>
					<img
						src="/images/logo_efiss.png"
						className="mr-4 h-11"
						alt="FlowBite Logo"
					/>
					<span>EFISS</span>
				</Link>
				<div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
					<h2 className="text-2xl font-bold text-gray-900">
						Sign in to platform
					</h2>
					<form className="mt-8 space-y-6" action="#">
						<div>
							<label
								htmlFor="username"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Your username
							</label>
							<input
								type="username"
								name="username"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
								placeholder="Enter your username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Your password
							</label>
							<input
								type="password"
								name="password"
								placeholder="Enter your password"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						{/* <div className="flex items-start">
							<a href="#" className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost Password?</a>
						</div> */}
						<button
							type="button"
							className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto"
							onClick={handleLogin}
						>
							Login to your account
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}

export default LoginPage;
