import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '@uiw/react-textarea-code-editor';

import Breadcrumb from '../../forms/Breadcrumb';
import { CrawIcon } from '../../../icons';
import { codeEditorStyle } from '../../../config';
import { getTemplateByID } from '../../../api/templateAPI';
import { upsertCrawl, getCrawlById } from '../../../api/crawlAPI';
import ModalManager from '../../../utils/ModalManager';
import FileUtil from '../../../utils/FileUtil';

const validateData = (data) => {
	console.log(data.ignoreUrlPatterns);
	if (!Array.isArray(data.ignoreUrlPatterns)) {
		return 'Ignore URL Patterns must be an array';
	}

	if (!data.numInstance) {
		return 'Number of instances is required';
	}

	if (data.numInstance < 1) {
		return 'Number of instances must be greater than 0';
	}

	return '';
};

function UpsertCrawlPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const isCreate = id === 'new';
	const templateId = new URLSearchParams(window.location.search).get('templateId');

	const [template, setTemplate] = useState({});
	const [website, setWebsite] = useState();
	const [formDisabled, setFormDisabled] = useState(false);
	const [ignoreUrlPatterns, setIgnoreUrlPatterns] = useState([]);
	const [isCurrentPaused, setIsCurrentPaused] = useState(false);

	const numInstanceRef = useRef(1);
	const statusRef = useRef('running');

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

	const fetchTemplate = () => {
		getTemplateByID(templateId)
			.then((res) => {
				const { template: templateData, website: websiteData } = res.data.template;

				setIgnoreUrlPatterns(JSON.stringify(templateData.ignoreUrlPatterns, null, 4));
				delete templateData.ignoreUrlPatterns;
				setTemplate(templateData);
				setWebsite(websiteData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchCrawl = (crawlId) => {
		getCrawlById(crawlId)
			.then((res) => {
				const { crawl } = res.data;
				const { ignoreUrlPatterns: ignoreUrlPatternsData } = crawl;

				setIgnoreUrlPatterns(JSON.stringify(ignoreUrlPatternsData, null, 4));
				delete crawl.templateData.ignoreUrlPatterns;

				setTemplate(crawl.templateData);
				setWebsite(crawl.website);
				numInstanceRef.current.value = crawl.numInstance;
				statusRef.current.value = crawl.status;

				if (crawl.status === 'stopped') {
					setFormDisabled(true);
				} else if (crawl.status === 'paused') {
					setIsCurrentPaused(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSave = () => {
		const data = {
			ignoreUrlPatterns: FileUtil.parseJSON(ignoreUrlPatterns || '[]'),
			numInstance: parseInt(numInstanceRef.current.value, 10),
			status: statusRef.current.value,
			templateId,
		};

		if (!isCreate) {
			data._id = id;
		}

		const error = validateData(data);

		if (error) {
			ModalManager.showError(error);
			return;
		}

		upsertCrawl(data)
			.then(() => {
				navigate('/crawl');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (isCreate) {
			// get templateId query in url
			fetchTemplate();
		} else {
			// get crawl by id
			fetchCrawl(id);
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
								value={ignoreUrlPatterns}
								onChange={(e) => setIgnoreUrlPatterns(e.target.value)}
								disabled={formDisabled}
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
									defaultValue={1}
									ref={numInstanceRef}
									disabled={isCreate ? false : (formDisabled || !isCurrentPaused)}
								/>
								<label
									htmlFor="status"
									className="block my-3 text-sm font-medium text-gray-900 dark:text-white"
								>
									Crawl status
								</label>
								<select
									name="status"
									className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									disabled={isCreate || formDisabled}
									defaultValue="running"
									ref={statusRef}
								>
									<option value="running">Running</option>
									{!isCreate && <option value="paused">Paused</option>}
									{!isCreate && <option value="stopped">Stopped</option>}
								</select>

								<div className="flex justify-end mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={handleSave}
										disabled={formDisabled}
									>
										Save
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
