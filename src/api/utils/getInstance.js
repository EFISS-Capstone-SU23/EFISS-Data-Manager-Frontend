import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export default function getInstance(prefix = '') {
	return axios.create({
		baseURL: `${BACKEND_URL}/${prefix}`,
	});
}
