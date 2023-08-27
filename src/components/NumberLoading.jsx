import React from 'react';
import { useSpring, animated } from 'react-spring';

function NumberLoading({ from = 0, to, duration = 1000 }) {
	const props = useSpring({
		from: { number: from },
		to: { number: to },
		config: { duration }, // This can be changed for faster or slower animation
		delay: 100,
	});

	return (
		<animated.span>
			{props.number.interpolate((number) => Number(number.toFixed(0)).toLocaleString())}
		</animated.span>
	);
}

export default NumberLoading;
