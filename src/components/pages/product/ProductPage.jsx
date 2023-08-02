import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import TableData from '../../forms/TableData';
import Breadcrumb from '../../forms/Breadcrumb';
import { ProductIcon } from '../../../icons';
import productAPI from '../../../api/productAPI';
import { numberCurrencyFormat } from '../../../config';

const breadcrumbList = [
	{
		text: 'Products',
		path: '/product',
		icon: ProductIcon,
	},
];

function ProductPage() {
	const [query, setQuery] = useState({});

	const handleToggleActive = async (productId, active) => {
		productAPI.updateProduct(productId, { active })
			.catch((err) => {
				console.log(err);
			});
	};

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
			header: 'Last Update',
			size: '15%',
			render: (data) => moment(data.lastUpdate).format('DD/MM/YYYY HH:mm'),
		},
		{
			header: 'Shop Name',
			size: '15%',
			render: (data) => data.shopName,
		},
		{
			header: 'Active',
			size: '7%',
			render: (data) => {
				return (
					<label className="relative inline-flex items-center mr-5 cursor-pointer">
						<input
							type="checkbox"
							defaultChecked={data.active}
							className="sr-only peer"
							onChange={(e) => handleToggleActive(data._id, e.target.checked)}
						/>
						<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
					</label>
				);
			},
		},
		{
			header: 'Action',
			size: '13%',
			render: (data) => (
				<>
					<Link to={`/product/${data._id}`}>
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
				<TableData
					schema={schema}
					fetchData={productAPI.getListProducts}
					tableLoad={0}
					query={query}
				/>
			</div>
		</>
	);
}

export default ProductPage;
