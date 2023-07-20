import axios from 'axios';

import { BACKEND_URL } from '../../config';

export default function getInstance(prefix = '') {
	return axios.create({
		baseURL: `${BACKEND_URL}/${prefix}`,
	});
}
