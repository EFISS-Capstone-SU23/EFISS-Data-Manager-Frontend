/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus, faEdit, faTrash, faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const dummyData = [
	{
		website: 'flowbite.com',
		startUrl: 'https://flowbite.com',
		addedBy: 'AnhND',
		date: new Date(),
		lastCrawl: new Date(),
		numOfCrawls: 1,
	},
	{
		website: 'moji.vn',
		startUrl: 'https://moji.vn',
		addedBy: 'AnhND',
		date: new Date(),
		lastCrawl: new Date(),
		numOfCrawls: 1,
	},
];

function TemplatePage() {
	const [data, setData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setData(dummyData);
	}, []);

	return (
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
								<FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
								Add template
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							<table className="min-w-full divide-y divide-gray-200 table-fixed">
								<thead className="bg-gray-100">
									<tr>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase "
											width="25%"
										>
											Website
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											width="15%"
										>
											Added by
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											width="10%"
										>
											Added Date
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											width="10%"
										>
											Last crawl
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											width="10%"
										>
											Number of crawls
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											width="30%"
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.map((template) => (
										<tr className="hover:bg-gray-100">
											<td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs">
												<a
													href={template.startUrl}
													className="text-primary-700"
													target="_blank"
													rel="noreferrer"
												>
													{template.website}
												</a>
											</td>
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
												{template.addedBy}
											</td>
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
												{moment(template.date).format('DD/MM/YYYY')}
											</td>
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
												{moment(template.lastCrawl).format('DD/MM/YYYY HH:mm:ss')}
											</td>
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap text-center">
												{template.numOfCrawls}
											</td>
											<td className="p-4 space-x-2 whitespace-nowrap">
												<button
													type="button"
													className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
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
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between">
				<div className="flex items-center mb-4 sm:mb-0">
					<span className="text-sm font-normal text-gray-500">
						Showing
						{' '}
						<span className="font-semibold text-gray-900">
							1-20
						</span>
						{' '}
						of
						{' '}
						<span className="font-semibold text-gray-900">
							2290
						</span>
					</span>
				</div>
				<div className="flex items-center space-x-3">
					<a
						href="#"
						className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
					>
						<FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 mr-1 -ml-1" />
						Previous
					</a>
					<a
						href="#"
						className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
					>
						Next
						<FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1 -mr-1" />
					</a>
				</div>
			</div>
		</div>
	);
}

export default TemplatePage;
