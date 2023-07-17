/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import moment from 'moment';

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

	useEffect(() => {
		setData(dummyData);
	}, []);

	return (
		<main>
			<div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
				<div className="w-full mb-1">
					<div className="mb-4">
						<h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
							All users
						</h1>
					</div>
					<div className="sm:flex">
						<div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
							<form className="lg:pr-3" action="#" method="GET">
								<label htmlFor="users-search" className="sr-only">
									Search
								</label>
								<div className="relative mt-1 lg:w-64 xl:w-96">
									<input
										type="text"
										name="email"
										id="users-search"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Search for users"
									/>
								</div>
							</form>
						</div>
						<div className="flex items-center ml-auto space-x-2 sm:space-x-3">
							<button
								type="button"
								data-modal-toggle="add-user-modal"
								className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								<svg
									className="w-5 h-5 mr-2 -ml-1"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
										clipRule="evenodd"
									/>
								</svg>
								Add user
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							<table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
								<thead className="bg-gray-100 dark:bg-gray-700">
									<tr>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
											width="25%"
										>
											Website
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
											width="15%"
										>
											Added by
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
											width="10%"
										>
											Added Date
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
											width="10%"
										>
											Last crawl
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
											width="10%"
										>
											Number of crawls
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
											width="30%"
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
									{data.map((template) => (
										<tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
											<td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
												<a
													href={template.startUrl}
													className="text-primary-700 dark:text-primary-500"
													target="_blank"
													rel="noreferrer"
												>
													{template.website}
												</a>
											</td>
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{template.addedBy}
											</td>
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{moment(template.date).format('DD/MM/YYYY')}
											</td>
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{moment(template.lastCrawl).format('DD/MM/YYYY HH:mm:ss')}
											</td>
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
												{template.numOfCrawls}
											</td>
											<td className="p-4 space-x-2 whitespace-nowrap">
												<button
													type="button"
													data-modal-toggle="edit-user-modal"
													className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
												>
													<svg
														className="w-4 h-4 mr-2"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
														<path
															fillRule="evenodd"
															d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
															clipRule="evenodd"
														/>
													</svg>
													Edit user
												</button>
												<button
													type="button"
													data-modal-toggle="delete-user-modal"
													className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
												>
													<svg
														className="w-4 h-4 mr-2"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
															clipRule="evenodd"
														/>
													</svg>
													Delete user
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
			<div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
				<div className="flex items-center mb-4 sm:mb-0">
					<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
						Showing
						{' '}
						<span className="font-semibold text-gray-900 dark:text-white">
							1-20
						</span>
						{' '}
						of
						{' '}
						<span className="font-semibold text-gray-900 dark:text-white">
							2290
						</span>
					</span>
				</div>
				<div className="flex items-center space-x-3">
					<a
						href="#"
						className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						<svg
							className="w-5 h-5 mr-1 -ml-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
						Previous
					</a>
					<a
						href="#"
						className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						Next
						<svg
							className="w-5 h-5 ml-1 -mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</div>
		</main>
	);
}

export default TemplatePage;
