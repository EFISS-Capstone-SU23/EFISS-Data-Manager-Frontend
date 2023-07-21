/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

import TableData from '../../forms/TableData';
import { getListCrawl } from '../../../api/crawlAPI';
import { CrawIcon } from '../../../icons';
import Breadcrumb from '../../forms/Breadcrumb';
import ModalManager from '../../../utils/ModalManager';

const breadcrumbList = [{
	text: 'Crawl',
	path: '/crawl',
	icon: CrawIcon,
}];

function TemplatePage() {
	const navigate = useNavigate();
	const [tableLoad, setTableLoad] = useState(0);
	const [query, setQuery] = useState({});

	const schema = [
		{
			header: 'Website',
			size: '25%',
			render: (data) => (
				<b>
					{data.templateData.website}
				</b>
			),
		},
		{
			header: 'Run by',
			size: '10%',
			render: (data) => data.runBy,
		},
		{
			header: 'Start Date',
			size: '15%',
			render: (data) => moment(data.createdAt).format('DD/MM/YYYY'),
		},
		{
			header: 'End Date',
			size: '15%',
			render: (data) => (data.endTime ? moment(data.endTime).format('DD/MM/YYYY') : ''),
		},
		{
			header: 'Status',
			size: '10%',
			render: (data) => data.status,
		},
		{
			header: 'Actions',
			size: '25%',
			render: (data) => (
				<Link
					to={`/template/${data._id}`}
				>
					<button
						type="button"
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mr-2"
					>
						View
					</button>
				</Link>
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
								All Crawls
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
										placeholder="Search for crawls"
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												handleSearch(e.target.value);
											}
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<TableData
					schema={schema}
					fetchData={getListCrawl}
					tableLoad={tableLoad}
					query={query}
				/>
			</div>
		</>
	);
}

export default TemplatePage;
