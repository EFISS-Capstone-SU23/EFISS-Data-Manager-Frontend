import { useEffect, useRef, useState } from 'react';
import { FileInput, Button } from 'flowbite-react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumb from '../../forms/Breadcrumb';
import Input from '../../forms/Input';
import { TemplateIcon } from '../../../icons';
import FileUtil from '../../../utils/FileUtil';
import ModalManager from '../../../utils/ModalManager';
import { upsertTemplate, getTemplateByID } from '../../../api/templateAPI';

const codeEditorStyle = {
	fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
	fontSize: 12,
};

const validateData = (data) => {
	if (!data.startUrl) {
		return 'Start URL is required';
	}

	// check if start url is valid
	try {
		// eslint-disable-next-line no-new
		new URL(data.startUrl);
	} catch (err) {
		return 'Start URL is invalid';
	}

	if (!data.xPath.title) {
		return 'Title XPath is required';
	}

	if (!data.xPath.price) {
		return 'Price XPath is required';
	}

	if (!data.xPath.description) {
		return 'Description XPath is required';
	}

	if (!data.xPath.imageContainer) {
		return 'Image Container XPath is required';
	}

	if (data.xPath.metadata === null) {
		return 'Metadata XPath is invalid';
	}

	if (typeof data.xPath.metadata !== 'object') {
		return 'Metadata XPath must be an object';
	}

	if (!Array.isArray(data.ignoreUrlPatterns)) {
		return 'Ignore URL Patterns must be an array';
	}

	return '';
};

function UpsertTemplatePage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const isCreateNew = id === 'new';

	const breadcrumbList = [{
		text: 'Templates',
		path: '/template',
		icon: TemplateIcon,
	}, {
		text: isCreateNew ? 'Create new template' : 'Edit template',
	}];

	const startUrlRef = useRef('');
	const titleXPathRef = useRef('');
	const priceXPathRef = useRef('');
	const descriptionXPathRef = useRef('');
	const imageContainerXPathRef = useRef('');
	const paginationButtonXPathRef = useRef('');
	const fileInputRef = useRef('');

	const [metadataXPath, setMetadataXPath] = useState('{}');
	const [ignoreUrlPatterns, setIgnoreUrlPatterns] = useState('[]');

	const updateFormByTemplate = (jsonTemplate) => {
		const { xPath } = jsonTemplate;

		startUrlRef.current.value = jsonTemplate.startUrl || startUrlRef.current.value;
		titleXPathRef.current.value = xPath.title || titleXPathRef.current.value;
		priceXPathRef.current.value = xPath.price || priceXPathRef.current.value;
		descriptionXPathRef.current.value = xPath.description || descriptionXPathRef.current.value;
		imageContainerXPathRef.current.value = xPath.imageContainer || imageContainerXPathRef.current.value;
		paginationButtonXPathRef.current.value = xPath.paginationButton || paginationButtonXPathRef.current.value;

		setMetadataXPath(JSON.stringify(xPath.metadata || {}, null, 4));
		setIgnoreUrlPatterns(JSON.stringify(jsonTemplate.ignoreUrlPatterns || [], null, 4));
	};

	useEffect(() => {
		if (isCreateNew) {
			return;
		}

		getTemplateByID(id)
			.then((res) => {
				updateFormByTemplate(res.data.template.template);
			})
			.catch((err) => {
				ModalManager.showError(err.response.data.message);
			});
	}, []);

	const handleImport = async () => {
		const file = fileInputRef.current.files[0];
		// name of file
		const content = await FileUtil.readFile(file);
		const jsonTemplate = FileUtil.parseJson(content);

		if (!jsonTemplate) {
			ModalManager.showError('Invalid JSON file');
			return;
		}

		updateFormByTemplate(jsonTemplate);
		fileInputRef.current.value = '';
	};

	const handleSave = () => {
		const data = {
			startUrl: startUrlRef.current.value,
			xPath: {
				title: titleXPathRef.current.value,
				price: priceXPathRef.current.value,
				description: descriptionXPathRef.current.value,
				imageContainer: imageContainerXPathRef.current.value,
				paginationButton: paginationButtonXPathRef.current.value,
				metadata: FileUtil.parseJson(metadataXPath || '{}'),
			},
			ignoreUrlPatterns: FileUtil.parseJson(ignoreUrlPatterns || '[]'),
		};

		const error = validateData(data);
		if (error) {
			ModalManager.showError(error);
			return;
		}

		if (!isCreateNew) {
			data._id = id;
		}

		// insert template
		upsertTemplate(data)
			.then(() => {
				navigate('/template');
			}).catch((err) => {
				ModalManager.showError(err.response.data.message);
			});
	};

	return (
		<>
			<Breadcrumb
				breadcrumbList={breadcrumbList}
			/>
			<div className="px-4">
				<div className="grid grid-cols-4 gap-4">
					<div className="col-span-2">
						<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
							<h3 className="mb-4 text-xl font-semibold">
								General information
							</h3>
							<Input
								label="Start URL"
								name="start-url"
								placeholder="https://www.example.com"
								ref={startUrlRef}
							/>

							<hr
								className="mt-5 border-gray-300"
							/>

							<div
								className="grid grid-cols-2 gap-x-4"
							>
								<Input
									label="Title XPath"
									name="title-xpath"
									placeholder="//*[@id='title']"
									ref={titleXPathRef}
								/>
								<Input
									label="Price XPath"
									name="price-xpath"
									placeholder="//*[@id='price']"
									ref={priceXPathRef}
								/>
								<Input
									label="Description XPath"
									name="description-xpath"
									placeholder="//*[@id='description']"
									ref={descriptionXPathRef}
								/>
								<Input
									label="Image Conatiner XPath"
									name="image-container-xpath"
									placeholder="//*[@id='image-container']"
									ref={imageContainerXPathRef}
								/>
								<Input
									label="Pagination Button XPath"
									name="pagination-button-xpath"
									placeholder="//*[@id='pagination-button']"
									ref={paginationButtonXPathRef}
								/>
							</div>
						</div>

						<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
							<h3 className="mb-4 text-xl font-semibold">
								Import from JSON file
							</h3>
							<div className="w-full grid grid-cols-6 gap-4">
								<FileInput
									className="col-span-5"
									accept=".json"
									ref={fileInputRef}
								/>

								<Button
									className="col-span-1 bg-orange-400 hover:bg-orange-600 px-2 py-1"
									onClick={handleImport}
								>
									Import
								</Button>
							</div>
						</div>
					</div>
					<div className="col-span-2 pb-8">
						<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6 h-1/2">
							<h3 className="mb-4 text-xl font-semibold">
								Metadata XPath
							</h3>
							<div
								data-color-mode="light"
								style={{
									maxHeight: 200,
									overflow: 'auto',
								}}
							>
								<CodeEditor
									language="json"
									placeholder="Enter your XPath here..."
									padding={15}
									style={codeEditorStyle}
									value={metadataXPath}
									onChange={(e) => setMetadataXPath(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6 h-1/2">
							<h3 className="mb-4 text-xl font-semibold">
								Ignore URL Patterns
							</h3>

							<div
								data-color-mode="light"
								style={{
									maxHeight: 200,
									overflow: 'auto',
								}}
							>
								<CodeEditor
									language="json"
									placeholder="Enter your URL patterns here..."
									padding={15}
									style={codeEditorStyle}
									value={ignoreUrlPatterns}
									onChange={(e) => setIgnoreUrlPatterns(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="">
					<Button
						className="col-span-1 bg-primary-700 hover:bg-primary-800 px-2 py-1"
						onClick={handleSave}
					>
						Save Template
					</Button>
				</div>
			</div>
		</>
	);
}

export default UpsertTemplatePage;
