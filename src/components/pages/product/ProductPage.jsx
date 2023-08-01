import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import TableData from '../../forms/TableData';
import Breadcrumb from '../../forms/Breadcrumb';
import { ProductIcon } from '../../../icons';
import productAPI from '../../../api/productAPI';
import { numberCurrencyFormat } from '../../../config';

const breadcrumbList = [{
	text: 'Products',
	path: '/product',
	icon: ProductIcon,
}];

function ProductPage() {
	// eslint-disable-next-line no-unused-vars
	const [tableLoad, setTableLoad] = useState(0);
	const [query, setQuery] = useState({});

	const schema = [
		{
			header: 'Title',
			size: '40%',
			render: (data) => (
				<a
					className="text-primary-700"
					href={data.url}
					target="_blank"
					rel="noreferrer"
				>
					{data.title}
				</a>
			),
		},
		{
			header: 'Price',
			size: '10%',
			render: (data) => numberCurrencyFormat.format(data.price),
		},
		{
			header: 'Shop Name',
			size: '15%',
			render: (data) => data.shopName,
		},
		{
			header: 'Active',
			size: '10%',
			render: () => (
				<label className="relative inline-flex items-center mr-5 cursor-pointer">
					<input type="checkbox" defaultValue className="sr-only peer" defaultChecked />
					<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
				</label>
			),
		},
		{
			header: 'Action',
			size: '25%',
			render: (data) => (
				<>
					<Link
						to={`/product/${data._id}`}
					>
						<button
							type="button"
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mr-2"
						>
							<FontAwesomeIcon icon={faEye} className="mr-2" />
							View Product
						</button>
					</Link>
					{/* <button
						type="button"
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 mr-2"
					>
						<FontAwesomeIcon icon={faTrash} className="w-4 h-4 mr-2" />
						Delete
					</button> */}
				</>
			),
		},
	];

	const handleSearch = (website) => {
		setQuery({
			...query,
			website,
		});
	};

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
								<div className="relative mt-1 lg:w-64 xl:w-96">
									<input
										type="text"
										name="email"
										id="templates-search"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
										placeholder="Search for products"
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												handleSearch(e.target.value);
											}
										}}
									/>
								</div>
							</div>
							{/* <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
								<button
									type="button"
									className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto"
									onClick={() => {
										navigate('/template/new');
									}}
								>
									<FontAwesomeIcon
										icon={faPlus}
										className="w-4 h-4 mr-2"
									/>
									Add template
								</button>
							</div> */}
						</div>
					</div>
				</div>
				<TableData
					schema={schema}
					fetchData={productAPI.getListProducts}
					tableLoad={tableLoad}
					query={query}
				/>
			</div>
		</>
	);
}

export default ProductPage;
