import React from 'react';
import { Label, TextInput } from 'flowbite-react';

function Input(props) {
	const {
		label,
		name,
		type = 'text',
		placeholder = '',
		required = false,
		disabled = false,
		value = '',
		onChange = () => {},
	} = props;

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
				disabled={disabled}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

export default Input;
