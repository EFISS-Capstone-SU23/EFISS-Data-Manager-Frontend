function UpsertTemplatePage() {
	return (
		<div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
			<div className="col-span-2">
				<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
					<h3 className="mb-4 text-xl font-semibold">
						General information
					</h3>
					<form action="#">
						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="first-name"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									First Name
								</label>
								<input
									type="text"
									name="first-name"
									id="first-name"
									className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									placeholder="Bonnie"
									required
								/>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="last-name"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Last Name
								</label>
								<input
									type="text"
									name="last-name"
									id="last-name"
									className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									placeholder="Green"
									required
								/>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="country"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Country
								</label>
								<input
									type="text"
									name="country"
									id="country"
									className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									placeholder="United States"
									required
								/>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="city"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									City
								</label>
								<input
									type="text"
									name="city"
									id="city"
									className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									placeholder="e.g. San Francisco"
									required
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="col-span-6 sm:col-full">
				<button
					className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					type="submit"
				>
					Save all
				</button>
			</div>
		</div>
	);
}

export default UpsertTemplatePage;
