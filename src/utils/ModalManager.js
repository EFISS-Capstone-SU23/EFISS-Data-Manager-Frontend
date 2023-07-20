import Swal from 'sweetalert2';

const ModalManager = {
	showError(message) {
		Swal.fire({
			icon: 'error',
			title: 'Something went wrong!',
			text: message,
		});
	},
	showConfirm(message) {
		return Swal.fire({
			icon: 'question',
			title: 'Are you sure?',
			text: message,
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
		});
	},
};

export default ModalManager;
