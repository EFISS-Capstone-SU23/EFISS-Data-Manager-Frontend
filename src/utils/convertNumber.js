export default function converNumber(num) {
	// format number 1000000 to 1,000,000
	return (num || '0').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
