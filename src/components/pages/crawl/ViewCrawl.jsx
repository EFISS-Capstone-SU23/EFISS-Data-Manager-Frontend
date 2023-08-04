import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {
	faFileArrowDown, faClock, faImage, faMicrochip,
} from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../../forms/Breadcrumb';
import { CrawIcon } from '../../../icons';
import { codeEditorStyle } from '../../../config';
import { getCrawlById } from '../../../api/crawlAPI';

import './ViewCrawl.css';
// eslint-disable-next-line no-unused-vars
import ProductTable from '../../table/ProductTablegit push --set-upstream origin feat/ProductTable';

function ViewCrawl() {
	const { id } = useParams();
	const [logs, setLogs] = useState([]);
	const [visitedURls, setVisitedURls] = useState([]);
	const [queue, setQueue] = useState([]);
	const [numOfCrawledProduct, setNumOfCrawledProduct] = useState(0);
	const [numOfInstances, setNumOfInstances] = useState(0);
	const [numOfCrawledImage, setNumOfCrawledImage] = useState(0);

	const [runTime, setRunTime] = useState(0);

	useEffect(() => {
		getCrawlById(id).then((res) => {
			const { crawl } = res.data;

			setNumOfInstances(crawl.numInstance);
			setNumOfCrawledProduct(crawl.numOfCrawledProduct);
			setNumOfCrawledImage(crawl.numOfCrawledImage);

			// get difference between start date and current date in minutes
			if (crawl.status === 'running') {
				setRunTime(Math.abs(new Date() - new Date(crawl.createdAt)) / 1000 / 60);
				// Create an interval that updates run time every minute
				const interval = setInterval(() => {
					setRunTime(Math.abs(new Date() - new Date(crawl.createdAt)) / 1000 / 60);
				}, 60000);

				return () => {
					clearInterval(interval);
				};
			} if (crawl.status === 'stopped') {
				setRunTime(Math.abs(new Date(crawl.endTime) - new Date(crawl.createdAt)) / 1000 / 60);
			} else {
				// Paused
				setRunTime(Math.abs(new Date(crawl.updatedAt) - new Date(crawl.createdAt)) / 1000 / 60);
			}

			return () => {};
		});
	}, []);

	const breadcrumbList = [
		{
			text: 'Crawl',
			path: '/crawl',
			icon: CrawIcon,
		},
		{
			text: `View Crawl ${id}`,
		},
	];

	useEffect(() => {
		const socket = io('ws://localhost:5000');

		socket.on('connect', () => {
			socket.emit('subscribeToLog', id);
		});

		socket.on(`logData-${id}`, ({ data }) => {
			setLogs(data);
		});

		socket.on(`visitedURLsData-${id}`, ({ visitedURLs }) => {
			setVisitedURls(visitedURLs);
		});

		socket.on(`queueData-${id}`, ({ queue: queueData }) => {
			setQueue(queueData);
		});

		socket.on(`numOfCrawledProduct-${id}`, ({ numOfCrawledProduct: numOfCrawledProductData }) => {
			setNumOfCrawledProduct(numOfCrawledProductData);
		});

		socket.on(`numOfCrawledImage-${id}`, ({ numOfCrawledImage: numOfCrawledImageData }) => {
			setNumOfCrawledImage(numOfCrawledImageData);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		// Scroll to bottom
		const logPanel = document.querySelector('#log-container');
		logPanel.scrollTop = logPanel.scrollHeight;
	}, [logs]);

	return (
		<>
			<Breadcrumb breadcrumbList={breadcrumbList} />
			<div className="px-4">
				<div className="grid gap-4 mb-6" id="view-crawl-conatiner">
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="number-panel"
					>
						<div className="w-full">
							<h3 className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">
								Crawled Products
							</h3>
							<span className="text-xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
								<FontAwesomeIcon
									icon={faFileArrowDown}
									className="mr-3"
								/>
								{numOfCrawledProduct}
							</span>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="time-panel"
					>
						<div className="w-full">
							<h3 className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">
								Time taken
							</h3>
							<span className="text-xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
								<FontAwesomeIcon icon={faClock} className="mr-3" />
								{Math.floor(runTime / 60)}
								{' '}
								h
								{' '}
								{Math.floor(runTime % 60)}
								{' '}
								m
							</span>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="image-panel"
					>
						<div className="w-full">
							<h3 className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">
								Crawled Images
							</h3>
							<span className="text-xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
								<FontAwesomeIcon
									icon={faImage}
									className="mr-3"
								/>
								{numOfCrawledImage}
							</span>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="instance-panel"
					>
						<div className="w-full">
							<h3 className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">
								Number of Instances
							</h3>
							<span className="text-xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
								<FontAwesomeIcon
									icon={faMicrochip}
									className="mr-3"
								/>
								{numOfInstances}
							</span>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="visited-panel"
					>
						<h3 className="mb-4 text-xl font-semibold">
							Visited URL List -
							{' '}
							{visitedURls.length}
						</h3>
						<div
							data-color-mode="dark"
							style={{
								maxHeight: '20rem',
								overflow: 'auto',
							}}
						>
							<CodeEditor
								language="json"
								padding={15}
								style={codeEditorStyle}
								minHeight="20rem"
								disabled
								value={JSON.stringify(visitedURls, null, 4)}
							/>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="queue-panel"
					>
						<h3 className="mb-4 text-xl font-semibold">
							Current Queue -
							{' '}
							{queue.length}
						</h3>
						<div
							data-color-mode="dark"
							style={{
								maxHeight: '20rem',
								overflow: 'auto',
							}}
						>
							<CodeEditor
								language="json"
								padding={15}
								style={codeEditorStyle}
								minHeight="20rem"
								disabled
								value={JSON.stringify(queue, null, 4)}
							/>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="log-panel"
					>
						<h3 className="mb-4 text-xl font-semibold">Log</h3>
						<div
							data-color-mode="dark"
							style={{
								maxHeight: '28rem',
								overflow: 'auto',
							}}
							id="log-container"
						>
							<CodeEditor
								language="json"
								padding={15}
								style={codeEditorStyle}
								minHeight="28rem"
								disabled
								value={logs}
							/>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="product-panel"
					>
						<h3 className="mb-4 text-xl font-semibold">
							Products
						</h3>
						<ProductTable
							query={{ crawlId: id }}
							tableLoad={numOfCrawledProduct}
							keepPageOnReload
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default ViewCrawl;
