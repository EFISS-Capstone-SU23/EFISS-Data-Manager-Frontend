import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import ToggleButton from '../../forms/ToggleButton';
import { numberCurrencyFormat } from '../../../config';
import productAPI from '../../../api/productAPI';
import TableData from '../../forms/TableData';

function ProductTable({
	query: queryProb = {},
	tableLoad: tableLoadProb = 0,
	keepPageOnReload = false,
}) {
	const [query, setQuery] = useState(queryProb);
	const [tableLoad, setTableLoad] = useState(0);

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
			render: (data) => moment(data.lastUpdate || data.createdAt).format('DD/MM/YYYY HH:mm'),
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
					<ToggleButton
						activeValue={data.active}
						onChangeHandler={(active) => {
							handleToggleActive(data._id, active);
						}}
					/>
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

	useEffect(() => {
		setQuery(queryProb);
	}, [queryProb]);

	useEffect(() => {
		setTableLoad(tableLoadProb);
	}, [tableLoadProb]);

	return (
		<TableData
			schema={schema}
			fetchData={productAPI.getListProducts}
			tableLoad={tableLoad}
			query={query}
			keepPageOnReload={keepPageOnReload}
		/>
	);
}

export default ProductTable;
