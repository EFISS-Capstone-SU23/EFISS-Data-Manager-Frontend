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
import { codeEditorStyle } from '../../../config';

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

	// convert upper to use state
	const [startUrl, setStartUrl] = useState('');
	const [titleXPath, setTitleXPath] = useState('');
	const [priceXPath, setPriceXPath] = useState('');
	const [descriptionXPath, setDescriptionXPath] = useState('');
	const [imageContainerXPath, setImageContainerXPath] = useState('');
	const [paginationButtonXPath, setPaginationButtonXPath] = useState('');
	const fileInputRef = useRef('');

	const [metadataXPath, setMetadataXPath] = useState('{}');
	const [ignoreUrlPatterns, setIgnoreUrlPatterns] = useState('[]');

	const updateFormByTemplate = (jsonTemplate) => {
		const { xPath } = jsonTemplate;
		setStartUrl(jsonTemplate.startUrl || startUrl);
		setTitleXPath(xPath.title || titleXPath);
		setPriceXPath(xPath.price || priceXPath);
		setDescriptionXPath(xPath.description || descriptionXPath);
		setImageContainerXPath(xPath.imageContainer || imageContainerXPath);
		setPaginationButtonXPath(xPath.paginationButton || paginationButtonXPath);

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
		const jsonTemplate = FileUtil.parseJSON(content);

		if (!jsonTemplate) {
			ModalManager.showError('Invalid JSON file');
			return;
		}

		updateFormByTemplate(jsonTemplate);
		fileInputRef.current.value = '';
	};

	const handleSave = () => {
		const data = {
			startUrl,
			xPath: {
				title: titleXPath,
				price: priceXPath,
				description: descriptionXPath,
				imageContainer: imageContainerXPath,
				paginationButton: paginationButtonXPath,
				metadata: FileUtil.parseJSON(metadataXPath || '{}'),
			},
			ignoreUrlPatterns: FileUtil.parseJSON(ignoreUrlPatterns || '[]'),
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
								value={startUrl}
								onChange={(e) => setStartUrl(e.target.value)}
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
									value={titleXPath}
									onChange={(e) => setTitleXPath(e.target.value)}
								/>
								<Input
									label="Price XPath"
									name="price-xpath"
									placeholder="//*[@id='price']"
									value={priceXPath}
									onChange={(e) => setPriceXPath(e.target.value)}
								/>
								<Input
									label="Description XPath"
									name="description-xpath"
									placeholder="//*[@id='description']"
									value={descriptionXPath}
									onChange={(e) => setDescriptionXPath(e.target.value)}
								/>
								<Input
									label="Image Conatiner XPath"
									name="image-container-xpath"
									placeholder="//*[@id='image-container']"
									value={imageContainerXPath}
									onChange={(e) => setImageContainerXPath(e.target.value)}
								/>
								<Input
									label="Pagination Button XPath"
									name="pagination-button-xpath"
									placeholder="//*[@id='pagination-button']"
									value={paginationButtonXPath}
									onChange={(e) => setPaginationButtonXPath(e.target.value)}
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
				<div>
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
