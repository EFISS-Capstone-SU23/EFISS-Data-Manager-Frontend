import getInstance from './utils/getInstance';

const instance = getInstance('crawl');

export const getListCrawl = (page, pageSize, query) => {
	return instance.post(`/list?page=${page}&pageSize=${pageSize}`, {
		query,
	});
};

export const upsertCrawl = (crawl) => {
	return instance.post('/upsert', crawl);
};
