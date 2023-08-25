import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({
	children,
	needLoggedIn = true,
}) {
	const { isAuthenticated } = useAuth();

	return (
		((needLoggedIn ? isAuthenticated : !isAuthenticated) ? (
			children
		) : (
			<Navigate
				to={{
					pathname: needLoggedIn ? '/login' : '/',
				}}
			/>
		))
	);
}

export default ProtectedRoute;
