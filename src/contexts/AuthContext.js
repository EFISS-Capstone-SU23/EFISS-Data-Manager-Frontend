import {
	createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { Cookies } from 'react-cookie';

import { COOKIE_NAME } from '../config';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// using react-cookie to check if user is authenticated
		// read all cookies
		const cookies = new Cookies();
		console.log(cookies.get(COOKIE_NAME));
	}, []);

	const value = useMemo(() => ({
		isAuthenticated,
		setIsAuthenticated,
	}), [isAuthenticated, setIsAuthenticated]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}
