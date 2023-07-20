import getInstance from './utils/getInstance';

const instance = getInstance('template');

export const insertTemplate = (template) => {
	return instance.post('/insert', {
		template,
	});
};

export const getListTemplate = (page, pageSize, query) => {
	return instance.post(`/list?page=${page}&pageSize=${pageSize}`, {
		query,
	});
};
