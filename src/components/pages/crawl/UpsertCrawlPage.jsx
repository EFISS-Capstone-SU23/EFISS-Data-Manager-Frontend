import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '@uiw/react-textarea-code-editor';

import Breadcrumb from '../../forms/Breadcrumb';
import { CrawIcon } from '../../../icons';
import { codeEditorStyle } from '../../../config';
import { getTemplateByID } from '../../../api/templateAPI';

function UpsertCrawlPage() {
	const { id } = useParams();
	const isCreate = id === 'new';

	const [template, setTemplate] = useState({});
	const [website, setWebsite] = useState();
	const [ignoreUrlPatterns, setIgnoreUrlPatterns] = useState([]);
	const [numInstance, setNumInstance] = useState(1);

	const breadcrumbList = [
		{
			text: 'Crawl',
			path: '/crawl',
			icon: CrawIcon,
		},
		{
			text: isCreate ? 'Start new crawl' : `Settings for crawl ${id}`,
		},
	];

	const fetchTemplate = (templateId) => {
		getTemplateByID(templateId)
			.then((res) => {
				const { template: templateData, website: websiteData } = res.data.template;

				setIgnoreUrlPatterns(templateData.ignoreUrlPatterns);
				delete templateData.ignoreUrlPatterns;
				setTemplate(templateData);
				setWebsite(websiteData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (isCreate) {
			// get templateId query in url
			const urlParams = new URLSearchParams(window.location.search);
			const templateId = urlParams.get('templateId');
			fetchTemplate(templateId);
		}
	}, []);

	return (
		<>
			<Breadcrumb breadcrumbList={breadcrumbList} />
			<div className="px-4">
				<div className="grid grid-cols-3 gap-4">
					<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
						<h3 className="mb-4 text-xl font-semibold">
							Template Data -
							{' '}
							{website}
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
								padding={15}
								style={codeEditorStyle}
								minHeight="25rem"
								disabled
								value={JSON.stringify(template, null, 4)}
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
								value={JSON.stringify(ignoreUrlPatterns, null, 4)}
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
									min="1"
									value={numInstance}
									onChange={(e) => setNumInstance(e.target.value)}
								/>

								<div className="flex justify-end mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									>
										Save
									</button>
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-orange-400 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50"
										disabled={isCreate}
									>
										Resume
									</button>
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50"
										disabled={isCreate}
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
