export default function fileToBase64(
	fileBuffer: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string },
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	headers: { [x: string]: any }
) {
	const contentType = headers['content-type'];
	const disposition = headers['content-disposition'];
	const fileName = disposition.match(/filename=([^;]+)/)[1];
	const fileDataBase64 = Buffer.from(fileBuffer, 'binary').toString('base64');
	return { fileData: fileDataBase64, fileName, contentType };
}
