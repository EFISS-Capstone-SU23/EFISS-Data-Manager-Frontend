import axios from 'axios';

const PRODUCT_SERVICE_URL = process.env.REACT_APP_PRODUCT_SERVICE_URL || 'http://localhost:3002';

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
	countProduct: () => {
		return instance.get('/stat/product');
	},
	countImage: () => {
		return instance.get('/stat/image');
	},
};
