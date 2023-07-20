import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function TableData({
	schema,
}) {
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState([]);

	return (
		<>
			<div className="overflow-x-auto">
				<div className="inline-block min-w-full align-middle">
					<div className="overflow-hidden shadow">
						<table className="min-w-full divide-y divide-gray-200 table-fixed">
							<thead className="bg-gray-100">
								<tr>
									{schema.map((col) => (
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											width={col.size || 'auto'}
										>
											{col.header}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{data.map((template) => (
									<tr className="hover:bg-gray-100">
										{schema.map((col) => (
											<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
												{col.render(template)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
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
		</>
	);
}

export default TableData;
