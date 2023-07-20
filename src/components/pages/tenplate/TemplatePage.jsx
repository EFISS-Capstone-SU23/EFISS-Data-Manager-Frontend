/* eslint-disable jsx-a11y/anchor-is-valid */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import TableData from '../../forms/TableData';
import { getListTemplate } from '../../../api/templateAPI';
import { TemplateIcon } from '../../../icons';
import Breadcrumb from '../../forms/Breadcrumb';

const schema = [
	{
		header: 'Website',
		size: '25%',
		render: (data) => (
			<a
				href={`https://${data.website}`}
				className="text-primary-700"
				target="_blank"
				rel="noreferrer"
			>
				{data.website}
			</a>
		),
	},
	{
		header: 'Added by',
		size: '10%',
		render: (data) => data.addedBy,
	},
	{
		header: 'Added Date',
		size: '10%',
		render: (data) => moment(data.createdAt).format('DD/MM/YYYY'),
	},
	{
		header: 'Last crawl',
		size: '15%',
		render: (data) => (data.lastCrawl ? moment(data.lastCrawl).format('DD/MM/YYYY HH:mm:ss') : ''),
	},
	{
		header: 'Number of crawls',
		size: '15%',
		render: (data) => data.numberOfCrawls,
	},
	{
		header: 'Actions',
		size: '25%',
		render: () => (
			<>
				<button
					type="button"
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mr-2"
				>
					<FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
					Edit
				</button>
				<button
					type="button"
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"
				>
					<FontAwesomeIcon icon={faTrash} className="w-4 h-4 mr-2" />
					Delete
				</button>
			</>
		),
	},
];

function TemplatePage() {
	const breadcrumbList = [{
		text: 'Templates',
		path: '/template',
		icon: TemplateIcon,
	}];
	const navigate = useNavigate();

	return (
		<>
			<Breadcrumb breadcrumbList={breadcrumbList} />
			<div className="m-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
				<div className="pb-4 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 ">
					<div className="w-full mb-1">
						<div className="mb-4">
							<h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
								All Templates
							</h1>
						</div>
						<div className="sm:flex">
							<div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0">
								<form className="lg:pr-3" action="#" method="GET">
									<label htmlFor="templates-search" className="sr-only">
										Search
									</label>
									<div className="relative mt-1 lg:w-64 xl:w-96">
										<input
											type="text"
											name="email"
											id="templates-search"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
											placeholder="Search for templates"
										/>
									</div>
								</form>
							</div>
							<div className="flex items-center ml-auto space-x-2 sm:space-x-3">
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
							</div>
						</div>
					</div>
				</div>
				<TableData
					schema={schema}
					fetchData={getListTemplate}
				/>
			</div>
		</>
	);
}

export default TemplatePage;
