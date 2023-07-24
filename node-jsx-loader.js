const babelOptions = {
	babelrc: false,
	ignore: [/\/(build|node_modules)\//],
	plugins: [["@babel/plugin-transform-react-js", { runtime: "automatic" }]],
}

export async function load(url, context, defaultLoad) {
	const result = await defaultLoad(url, context, defaultLoad)
	if (result.format === "module") {
		const opt = Object.assign({ filename: url }, babelOptions)
		const newResult = await babel.transformAsync(result.source, opt)
		if (!newResult) {
			if (typeof result.source === "string") {
				return result
			}
			return {
				source: Buffer.from(result.source).toString("utf-8"),
				format: "module",
			}
		}
		return { source: newResult.code, format: "module" }
	}
	return defaultLoad(url, context, defaultLoad)
}
