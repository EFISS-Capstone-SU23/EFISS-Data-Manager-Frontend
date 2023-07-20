import { useRef } from 'react';
import { FileInput, Button } from 'flowbite-react';
import CodeEditor from '@uiw/react-textarea-code-editor';

import Breadcrumb from '../../forms/Breadcrumb';
import Input from '../../forms/Input';
import { TemplateIcon } from '../../../icons';

function UpsertTemplatePage() {
	const breadcrumbList = [{
		text: 'Templates',
		path: '/template',
		icon: TemplateIcon,
	}, {
		text: 'Create new template',
	}];

	const startUrlRef = useRef('');
	const titleXPathRef = useRef('');
	const priceXPathRef = useRef('');
	const descriptionXPathRef = useRef('');
	const imageContainerXPathRef = useRef('');
	const paginationButtonXPathRef = useRef('');
	const metadataXPathRef = useRef('');
	const ignoreUrlPatternsRef = useRef('');
	const fileInputRef = useRef('');

	return (
		<div className="px-4">
			<Breadcrumb
				breadcrumbList={breadcrumbList}
			/>
			<div className="grid pt-4 grid-cols-4 gap-4">
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
								style={{
									fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
									fontSize: 12,
								}}
								ref={metadataXPathRef}
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
								style={{
									fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
									fontSize: 12,
								}}
								ref={ignoreUrlPatternsRef}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="">
				<Button
					className="col-span-1 bg-primary-700 hover:bg-primary-800 px-2 py-1"
				>
					Save Template
				</Button>
			</div>
		</div>
	);
}

export default UpsertTemplatePage;
