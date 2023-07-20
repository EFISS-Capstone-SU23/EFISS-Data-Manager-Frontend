import { Breadcrumb as FlowbiteBreadcrumb } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function Breadcrumb({
	breadcrumbList = [],
}) {
	const navigate = useNavigate();

	return (
		<FlowbiteBreadcrumb
			className="mt-4"
		>
			{breadcrumbList.map((breadcrumb) => (
				<FlowbiteBreadcrumb.Item
					icon={breadcrumb.icon}
					className={`cursor-pointer ${breadcrumb.icon ? 'breadcrumb-hide-first-icon' : ''}`}
					onClick={() => {
						if (breadcrumb.path) {
							navigate(breadcrumb.path);
						}
					}}
				>
					<p className="hover:underline">
						{breadcrumb.text}
					</p>
				</FlowbiteBreadcrumb.Item>
			))}
		</FlowbiteBreadcrumb>
	);
}

export default Breadcrumb;
