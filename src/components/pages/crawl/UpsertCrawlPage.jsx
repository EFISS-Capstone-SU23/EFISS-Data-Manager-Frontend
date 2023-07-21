import CodeEditor from '@uiw/react-textarea-code-editor';

import Breadcrumb from '../../forms/Breadcrumb';
import { CrawIcon } from '../../../icons';
import { codeEditorStyle } from '../../../config';

function UpsertCrawlPage() {
	const breadcrumbList = [
		{
			text: 'Crawl',
			path: '/crawl',
			icon: CrawIcon,
		},
		{
			text: 'Start new crawl',
		},
	];

	return (
		<>
			<Breadcrumb breadcrumbList={breadcrumbList} />
			<div className="px-4">
				<div className="grid grid-cols-3 gap-4">
					<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
						<h3 className="mb-4 text-xl font-semibold">Template Data</h3>

						<div
							data-color-mode="light"
							style={{
								maxHeight: '25rem',
								overflow: 'auto',
							}}
						>
							<CodeEditor
								language="json"
								padding={15}
								style={codeEditorStyle}
								minHeight="25rem"
								disabled
							/>
						</div>
					</div>

					<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
						<h3 className="mb-4 text-xl font-semibold">
							Ignore URL Patterns
						</h3>

						<div
							data-color-mode="light"
							style={{
								maxHeight: '25rem',
								overflow: 'auto',
							}}
						>
							<CodeEditor
								language="json"
								placeholder="Enter your URL patterns here..."
								padding={15}
								style={codeEditorStyle}
								minHeight="25rem"
							/>
						</div>
					</div>

					<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
						<h3 className="mb-4 text-xl font-semibold">Settings</h3>
						<div className="w-full mt-4 mb-2 block">
							<div className="">
								<label
									htmlFor="num-instance"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Number of instances
								</label>
								<input
									type="number"
									name="num-instance"
									className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
								/>

								{/* 3 button save, resume and stop */}
								<div className="flex justify-end mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									>
										Save
									</button>
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-orange-400 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									>
										Resume
									</button>
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									>
										Stop
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default UpsertCrawlPage;
