import { Label, TextInput } from 'flowbite-react';

function Input({
	label,
	name,
	type = 'text',
	placeholder = '',
	required = false,
}) {
	return (
		<div className="w-full mt-4">
			<div className="mb-2 block">
				<Label
					htmlFor={name}
					value={label}
				/>
			</div>
			<TextInput
				type={type}
				name={name}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
}

export default Input;
