import getInstance from './utils/getInstance';

const instance = getInstance('template');

export const insertTemplate = (template) => {
	return instance.post('/insert', {
		template,
	});
};
