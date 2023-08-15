export default function converNumber(num) {
	// format number 1000000 to 1,000,000
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
