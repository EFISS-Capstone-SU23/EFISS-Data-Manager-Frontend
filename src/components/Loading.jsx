function Loading({
	height = '100vh',
}) {
	return (
		<div
			className="flex justify-center items-center w-full"
			style={{
				height,
			}}
		>
			<div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500" />
		</div>
	);
}

export default Loading;
