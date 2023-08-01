/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react';
import Lightbox from 'react-spring-lightbox';

import ImageViewerHeader from './ImageViewerHeader';

import './ImageViewer.css';

function ImageViewers({
	imageList = [],
	product = {},
	productActive = true,
}) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [images, setImages] = useState(imageList);

	useEffect(() => {
		setImages(imageList);
	}, [imageList]);

	return (
		<>
			<h3 className="mb-4 text-xl font-semibold">
				Product Images (
				{productActive ? imageList.filter((el) => el.active).length : 0}
				/
				{imageList.length}
				{' '}
				active images)
			</h3>
			<div
				className="grid grid-cols-6 gap-4"
			>
				{images.map((image, i) => (
					<img
						src={image.url}
						alt={image.url}
						className={`col-span-1 rounded-lg shadow-sm border-2 ${productActive && image.active ? 'product-image-active border-blue-500' : 'product-image-deactive border-gray-200'}`}
						onClick={() => {
							setCurrentImageIndex(i);
							setIsOpen(true);
						}}
						loading="lazy"
					/>
				))}
			</div>

			<Lightbox
				images={images.map((image) => ({ src: image.url }))}
				isOpen={isOpen}
				currentIndex={currentImageIndex}
				onPrev={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
				onNext={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
				onClose={() => setIsOpen(false)}
				className="image-viewer-container"
				renderHeader={() => (
					<ImageViewerHeader
						imageList={images}
						currentImageIndex={currentImageIndex}
						productTitle={product.title}
						productId={product._id}
						setImages={setImages}
					/>
				)}
			/>
		</>
	);
}

export default ImageViewers;
