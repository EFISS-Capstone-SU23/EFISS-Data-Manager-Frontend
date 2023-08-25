import {
	createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { Cookies } from 'react-cookie';

import { COOKIE_NAME, REQUIRE_ROLE } from '../config';
import authAPI from '../api/authAPI';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const cookies = new Cookies();

		authAPI.getAccountInfo()
			.then((res) => {
				// check user contain role
				if (!res.data.roles || !res.data.roles.includes(REQUIRE_ROLE)) {
					setIsAuthenticated(false);
					setCurrentUser(null);

					// remove cookie
					cookies.remove(COOKIE_NAME);
					return;
				}

				setIsAuthenticated(true);
				setCurrentUser(res.data);
			})
			.catch(() => {
				setIsAuthenticated(false);
				setCurrentUser(null);

				// remove cookie
				cookies.remove(COOKIE_NAME);
			});
	}, []);

	const value = useMemo(() => ({
		isAuthenticated,
		setIsAuthenticated,
		currentUser,
		setCurrentUser,
	}), [isAuthenticated, setIsAuthenticated]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}
