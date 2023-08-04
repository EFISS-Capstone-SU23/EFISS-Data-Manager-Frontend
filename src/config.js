export const BACKEND_URL = 'http://localhost:5000';
export const PRODUCT_SERVICE_URL = 'http://localhost:3002';

export const codeEditorStyle = {
	fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
	fontSize: 14,
};

export const numberCurrencyFormat = new Intl.NumberFormat('vi', {
	style: 'currency',
	currency: 'VND',
});
