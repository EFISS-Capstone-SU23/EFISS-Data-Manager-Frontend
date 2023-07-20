import Swal from 'sweetalert2';

const ModalManager = {
	showError(message) {
		Swal.fire({
			icon: 'error',
			title: 'Something went wrong!',
			text: message,
		});
	},
};

export default ModalManager;
