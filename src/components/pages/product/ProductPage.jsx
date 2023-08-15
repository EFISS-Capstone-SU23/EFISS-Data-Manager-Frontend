import { useState } from 'react';

import Breadcrumb from '../../forms/Breadcrumb';
import { ProductIcon } from '../../../icons';
import ProductTable from '../../table/ProductTable/ProductTable';

const breadcrumbList = [
	{
		text: 'Products',
		path: '/product',
		icon: ProductIcon,
	},
];

function ProductPage() {
	const [query, setQuery] = useState({});

	return (
		<>
			<Breadcrumb breadcrumbList={breadcrumbList} />
			<div className="m-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
				<div className="pb-4 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 ">
					<div className="w-full mb-1">
						<div className="mb-4">
							<h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
								All Products
							</h1>
						</div>
						<div className="sm:flex">
							<div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0">
								<div className="relative lg:w-64 xl:w-96">
									<input
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
										placeholder="Search for products"
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												setQuery({
													...query,
													search: e.target.value,
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
								<select
									className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full "
									defaultValue="all"
									onChange={(e) => {
										setQuery({
											...query,
											active: e.target.value,
										});
									}}
								>
									<option value="all">All</option>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<ProductTable query={query} />
			</div>
		</>
	);
}

export default ProductPage;
