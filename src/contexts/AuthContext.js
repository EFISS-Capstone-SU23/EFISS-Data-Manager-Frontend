import {
	createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { Cookies } from 'react-cookie';

import { COOKIE_NAME, REQUIRE_ROLE } from '../config';
import authAPI from '../api/authAPI';
import Loading from '../components/Loading';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const cookies = new Cookies();

	useEffect(() => {
		authAPI.getAccountInfo()
			.then((res) => {
				// check user contain role
				if (!res.data.roles || !res.data.roles.includes(REQUIRE_ROLE)) {
					setIsAuthenticated(false);

					setIsLoading(false);
					return;
				}

				setIsAuthenticated(true);
				setCurrentUser(res.data);
			})
			.catch(() => {
				setIsAuthenticated(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		// remove cookie if user logout
		if (!isAuthenticated) {
			cookies.remove(COOKIE_NAME);
			setCurrentUser(null);
		}
	}, [isAuthenticated]);

	const value = useMemo(() => ({
		isAuthenticated,
		setIsAuthenticated,
		currentUser,
		setCurrentUser,
	}), [isAuthenticated, setIsAuthenticated]);

	if (isLoading) {
		return (
			<Loading />
		);
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}
