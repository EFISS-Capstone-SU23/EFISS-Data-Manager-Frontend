import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { ProductIcon } from '../../../icons';
import Breadcrumb from '../../forms/Breadcrumb';
import Input from '../../forms/Input';
import { codeEditorStyle, numberCurrencyFormat } from '../../../config';
import productAPI from '../../../api/productAPI';
import ImageViewers from './imageViewer/ImageViewer';

function ViewProductPage() {
	const { id: productId } = useParams();
	const [product, setProduct] = useState({});
	// eslint-disable-next-line no-unused-vars
	const [imageList, setImageList] = useState([]);

	const breadcrumbList = [
		{
			text: 'Products',
			path: '/product',
			icon: ProductIcon,
		},
		{
			text: `Product ${productId} detail`,
		},
	];

	useEffect(() => {
		productAPI.getProduct(productId)
			.then((res) => {
				const productData = res.data.product;

				const {
					activeImageMap,
				} = productData;

				const images = productData.images.map((image, i) => ({
					url: image,
					active: activeImageMap[i],
				}));

				setProduct(productData);
				setImageList(images);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Breadcrumb breadcrumbList={breadcrumbList} />
			<div className="px-4">
				<div className="grid grid-cols-3 gap-4">
					<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm col-span-1">
						<h3 className="mb-4 text-xl font-semibold">Product Detail</h3>
						<Input
							label="Title"
							name="title"
							placeholder="Product title"
							disabled
							value={product.title}
						/>
						<Input
							label="Price"
							name="price"
							placeholder="Product price"
							disabled
							value={numberCurrencyFormat.format(product.price)}
						/>
						<div className="mt-4 text-sm font-medium text-gray-900">
							<span>Shop Name: </span>
							<Link
								to={`/shop/${product.shopName}`}
								className="text-primary-700"
							>
								{product.shopName}
							</Link>
						</div>
						<div className="mt-4 text-sm font-medium text-gray-900">
							<span>Crawl ID: </span>
							<Link
								to={`/crawl/view/${product.crawlId}`}
								className="text-primary-700"
							>
								{product.crawlId}
							</Link>
						</div>
						<div className="mt-4 text-sm font-medium text-gray-900">
							<span>
								Last updated:
								{' '}
								{moment(product.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
							</span>
						</div>
						<hr className="my-5 border-gray-300" />

						<div>
							<a
								href={product.url}
								target="_blank"
								rel="noreferrer"
							>
								<button
									type="button"
									className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mr-2"
								>
									<FontAwesomeIcon icon={faEye} className="mr-2" />
									Product URL
								</button>
							</a>

							<div
								style={{
									float: 'right',
								}}
							>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										defaultValue
										className="sr-only peer"
										defaultChecked={product.active}
									/>
									<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
									<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
										Active
									</span>
								</label>
							</div>
						</div>
					</div>
					<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm col-span-1">
						<h3 className="mb-4 text-xl font-semibold">
							Product Description
						</h3>

						<Textarea
							placeholder="Product Description..."
							disabled
							className="text-sm resize-none"
							style={{
								maxHeight: 340,
								height: 340,
							}}
							value={product.description}
						/>
					</div>
					<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm col-span-1">
						<h3 className="mb-4 text-xl font-semibold">
							Product Metadata
						</h3>

						<div
							data-color-mode="light"
							style={{
								maxHeight: 340,
								overflow: 'auto',
							}}
						>
							<CodeEditor
								language="json"
								padding={15}
								minHeight={340}
								style={codeEditorStyle}
								disabled
								value={JSON.stringify(product.metadata, null, 4)}
							/>
						</div>
					</div>
				</div>

				<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm col-span-3">
					<h3 className="mb-4 text-xl font-semibold">
						Product Images (
						{imageList.filter((el) => el.active).length}
						/
						{imageList.length}
						{' '}
						active images)
					</h3>

					<div
						className="grid grid-cols-6 gap-4"
					>
						<ImageViewers
							imageList={imageList}
							productTitle={product.title}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default ViewProductPage;
