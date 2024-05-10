interface FileEntry {
	[key: string]: File;
}

export default function superFormFilesToStructuredObject(formData: FormData) {
	// Initialize the final object
	const finalObject: { [key: string]: { [key: string]: FileEntry } } = {};

	// Convert the FormData entries iterator to an array
	const fileEntries = Array.from(formData.entries());

	fileEntries.forEach(([name, file]) => {
		// Extract the type, index, and elementName from the name
		const match = name.match(/^__superform_file_(\w+)\[(\d+)\]\.(\w+)/);
		if (match) {
			const type = match[1];
			const index = match[2];
			const elementName = match[3];

			// If the elementName is not yet in the finalObject, add it
			if (!finalObject[elementName]) {
				finalObject[elementName] = {};
			}

			// If the type is not yet in the elementName object, add it
			if (!finalObject[elementName][type]) {
				finalObject[elementName][type] = {};
			}

			// Assign the file to the appropriate elementName, type, and index
			finalObject[elementName][type][index] = file as File;
		}
	});

	return finalObject;
}
