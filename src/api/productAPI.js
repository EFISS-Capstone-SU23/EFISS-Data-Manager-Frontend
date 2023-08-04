import axios from 'axios';

import { PRODUCT_SERVICE_URL } from '../config';

const instance = axios.create({
	baseURL: PRODUCT_SERVICE_URL,
});

export default {
	getListProducts: (page, pageSize, query) => {
		return instance.post(`/allProduct?page=${page}&pageSize=${pageSize}`, {
			query,
		});
	},
	getProduct: (id) => {
		return instance.get(`/${id}`);
	},
	setActiveForImage: (productId, imageIndex, active) => {
		return instance.put('/setActiveForImage', {
			productId,
			imageIndex,
			active,
		});
	},
	updateProduct: (id, update) => {
		return instance.post(`/update/${id}`, {
			...update,
		});
	},
};
