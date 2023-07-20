import getInstance from './utils/getInstance';

const instance = getInstance('template');

export const upsertTemplate = (template) => {
	return instance.post('/upsert', {
		template,
	});
};

export const getListTemplate = (page, pageSize, query) => {
	return instance.post(`/list?page=${page}&pageSize=${pageSize}`, {
		query,
	});
};

export const deleteById = (id) => {
	return instance.delete(`/delete/${id}`);
};

export const getTemplateByID = (id) => {
	return instance.get(`/${id}`);
};
