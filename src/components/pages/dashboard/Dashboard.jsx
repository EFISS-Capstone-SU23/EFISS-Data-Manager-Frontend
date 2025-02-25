/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFileArrowDown,
	faImage,
	faGlobe,
} from '@fortawesome/free-solid-svg-icons';

import ProductTable from '../../table/ProductTable/ProductTable';
import { countAllTemplate } from '../../../api/templateAPI';
import productAPI from '../../../api/productAPI';
import NumberLoading from '../../NumberLoading';

function Dashboard() {
	const [numOfWebsites, setNumOfWebsites] = useState(null);
	const [numOfProducts, setNumOfProducts] = useState(null);
	const [numOfImages, setNumOfImages] = useState(null);

	useEffect(() => {
		countAllTemplate().then((res) => {
			setNumOfWebsites(res.data.total);
		});

		productAPI.countProduct().then((res) => {
			setNumOfProducts(res.data.numberOfProducts);
		});

		productAPI.countImage().then((res) => {
			setNumOfImages(res.data.totalImages);
		});
	}, []);

	const productTable = useMemo(() => <ProductTable query={{}} />, []);

	return (
		<div className="px-4 pt-6">
			<div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
				<div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex sm:p-6">
					<div className="w-full">
						<h3 className="text-base font-normal text-gray-500">
							Number of Products
						</h3>
						<span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
							<FontAwesomeIcon icon={faFileArrowDown} className="mr-3" />
							{numOfProducts !== null ? (
								<NumberLoading to={numOfProducts} duration={2000} />
							) : (
								'...'
							)}
						</span>
					</div>
				</div>
				<div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex sm:p-6">
					<div className="w-full">
						<h3 className="text-base font-normal text-gray-500">
							Number of Images
						</h3>
						<span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
							<FontAwesomeIcon icon={faImage} className="mr-3" />
							{numOfImages !== null ? (
								<NumberLoading to={numOfImages} duration={2000} />
							) : (
								'...'
							)}
						</span>
					</div>
				</div>
				<div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
					<div className="w-full">
						<h3 className="text-base font-normal text-gray-500">
							Number of Websites
						</h3>
						<span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
							<FontAwesomeIcon icon={faGlobe} className="mr-3" />
							{numOfWebsites !== null ? (
								<NumberLoading to={numOfWebsites} />
							) : (
								'...'
							)}
						</span>
					</div>
				</div>
			</div>
			<div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 mt-4">
				<div className="items-center justify-between lg:flex mb-3">
					<div className="mb-4 lg:mb-0">
						<h3 className="mb-2 text-xl font-bold text-gray-900">
							Products
						</h3>
						<span className="text-base font-normal text-gray-500">
							This is a list of latest products
						</span>
					</div>
				</div>
				{productTable}
			</div>
		</div>
	);
}

export default Dashboard;
