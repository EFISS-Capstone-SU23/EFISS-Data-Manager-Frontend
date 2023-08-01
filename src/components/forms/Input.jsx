import React from 'react';
import { Label, TextInput } from 'flowbite-react';

const Input = React.forwardRef((props, ref) => {
	const {
		label,
		name,
		type = 'text',
		placeholder = '',
		required = false,
		disabled = false,
		value = '',
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
				ref={ref}
				disabled={disabled}
				value={value}
			/>
		</div>
	);
});

export default Input;
