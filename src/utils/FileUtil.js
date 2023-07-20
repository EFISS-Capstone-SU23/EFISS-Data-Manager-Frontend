const FileUtil = {
	readFile: async (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				resolve(event.target.result);
			};
			reader.onerror = (error) => {
				reject(error);
			};
			reader.readAsText(file);
		});
	},
	parseJson: (json = '') => {
		try {
			return JSON.parse(json);
		} catch (error) {
			return null;
		}
	},
};

export default FileUtil;
