import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faClock } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import CodeEditor from '@uiw/react-textarea-code-editor';

import Breadcrumb from '../../forms/Breadcrumb';
import { CrawIcon } from '../../../icons';
import { codeEditorStyle } from '../../../config';

import './ViewCrawl.css';

function ViewCrawl() {
	const { id } = useParams();

	const breadcrumbList = [{
		text: 'Crawl',
		path: '/crawl',
		icon: CrawIcon,
	}, {
		text: `View Crawl ${id}`,
	}];

	return (
		<>
			<Breadcrumb
				breadcrumbList={breadcrumbList}
			/>
			<div className="px-4">
				<div className="grid gap-4 mb-6" id="view-crawl-conatiner">
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="number-panel"
					>
						<div className="w-full">
							<h3 className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">Crawled Products</h3>
							<span className="text-xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
								<FontAwesomeIcon icon={faFileArrowDown} className="mr-3" />
								2,340
							</span>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="time-panel"
					>
						<div className="w-full">
							<h3 className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">Time taken</h3>
							<span className="text-xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
								<FontAwesomeIcon icon={faClock} className="mr-3" />
								1h 20m
							</span>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="visited-panel"
					>
						<h3 className="mb-4 text-xl font-semibold">
							Visited URL List - 0
						</h3>
						<div
							data-color-mode="dark"
							style={{
								maxHeight: '28rem',
								overflow: 'auto',
							}}
						>
							<CodeEditor
								language="json"
								padding={15}
								style={codeEditorStyle}
								minHeight="28rem"
								disabled
							/>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="queue-panel"
					>
						<h3 className="mb-4 text-xl font-semibold">
							Current Queue - 0
						</h3>
						<div
							data-color-mode="dark"
							style={{
								maxHeight: '28rem',
								overflow: 'auto',
							}}
						>
							<CodeEditor
								language="json"
								padding={15}
								style={codeEditorStyle}
								minHeight="28rem"
								disabled
							/>
						</div>
					</div>
					<div
						className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
						id="log-panel"
					>
						<h3 className="mb-4 text-xl font-semibold">
							Log
						</h3>
						<div
							data-color-mode="dark"
							style={{
								maxHeight: '20rem',
								overflow: 'auto',
							}}
						>
							<CodeEditor
								language="json"
								padding={15}
								style={codeEditorStyle}
								minHeight="20rem"
								disabled
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ViewCrawl;
