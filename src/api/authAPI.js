import axios from 'axios';

const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3001';

const instance = axios.create({
	baseURL: AUTH_SERVICE_URL,
	withCredentials: true,
});

export default {
	login: (username, password) => {
		return instance.post('/sign-in', {
			username,
			password,
			requireRole: 'data_manager',
		});
	},
};
