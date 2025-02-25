/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import converNumber from '../../utils/convertNumber';

import Loading from '../Loading';

const PAGE_SIZE = 8;

function TableData({
	schema,
	fetchData,
	tableLoad,
	query,
	keepPageOnReload = false,
}) {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [start, setStart] = useState(1);
	const [end, setEnd] = useState(0);
	const [tableLoadState, setTableLoadState] = useState(false);

	const loadData = () => {
		setTableLoadState(true);
		fetchData(page, PAGE_SIZE, query)
			.then((res) => {
				setData(res.data.data);

				setTotal(res.data.total);
				setStart((page - 1) * PAGE_SIZE + 1);

				const newEnd = Math.min(page * PAGE_SIZE, res.data.total);
				setEnd(newEnd);

				if (newEnd === 0) {
					setStart(0);
				}

				setTableLoadState(false);
			});
	};

	useEffect(() => {
		loadData();
	}, [page]);

	useEffect(() => {
		if (!keepPageOnReload) {
			setPage(1);
		}
		loadData();
	}, [tableLoad, query]);

	const TableBody = data.map((rowData) => (
		<tr
			className="hover:bg-gray-100"
			key={rowData._id}
		>
			{schema.map((col, i) => (
				<td
					className="p-3 text-base font-medium text-gray-900 whitespace-nowrap"
					style={{
						maxWidth: col.size || 'auto',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
					key={i}
				>
					{col.render(rowData)}
				</td>
			))}
		</tr>
	));

	return (
		<>
			<div className="overflow-x-auto">
				<div className="inline-block min-w-full align-middle">
					<div className="overflow-hidden shadow">
						<table className="w-full divide-y divide-gray-200 table-fixed">
							<thead className="bg-gray-100">
								<tr>
									{schema.map((col) => (
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											width={col.size || 'auto'}
											key={col.header}
										>
											{col.header}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{tableLoadState ? (
									<tr>
										<td colSpan={schema.length}>
											<Loading height="200px" />
										</td>
									</tr>
								) : TableBody}
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
							{`${converNumber(start)} - ${converNumber(end)}`}
						</span>
						{' '}
						of
						{' '}
						<span className="font-semibold text-gray-900">
							{converNumber(total)}
						</span>
					</span>
				</div>
				<div className="flex items-center space-x-3">
					<button
						className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
						type="button"
						style={{ visibility: page === 1 ? 'hidden' : 'visible' }}
						onClick={() => {
							if (page > 1) {
								setPage(page - 1);
							}
						}}
					>
						<FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 mr-1 -ml-1" />
						Previous
					</button>
					<button
						href="#"
						className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
						type="button"
						style={{ visibility: page * PAGE_SIZE >= total ? 'hidden' : 'visible' }}
						onClick={() => {
							if (page * PAGE_SIZE < total) {
								setPage(page + 1);
							}
						}}
					>
						Next
						<FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1 -mr-1" />
					</button>
				</div>
			</div>
		</>
	);
}

export default TableData;
