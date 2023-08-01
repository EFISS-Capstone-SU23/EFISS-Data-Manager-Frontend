/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import Lightbox from 'react-spring-lightbox';

import ImageViewerHeader from './ImageViewerHeader';

import './ImageViewer.css';

function ImageViewers({
	imageList = [],
	productTitle = '',
}) {
	// console.log('asldkjaslkjasdk', open, currentIndex);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{imageList.map((image, i) => (
				<img
					src={image.url}
					alt={image.url}
					className={`col-span-1 rounded-lg shadow-sm ${image.active ? 'product-image-active' : 'product-image-deactive'}`}
					onClick={() => {
						setCurrentImageIndex(i);
						setIsOpen(true);
					}}
					loading="lazy"
				/>
			))}

			<Lightbox
				images={imageList.map((image) => ({ src: image.url }))}
				isOpen={isOpen}
				currentIndex={currentImageIndex}
				onPrev={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))}
				onNext={() => setCurrentImageIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))}
				onClose={() => setIsOpen(false)}
				className="image-viewer-container"
				renderHeader={() => (
					<ImageViewerHeader
						imageList={imageList}
						currentImageIndex={currentImageIndex}
						productTitle={productTitle}
					/>
				)}
			/>
		</>
	);
}

export default ImageViewers;
