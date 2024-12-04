module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,html,ttf,jpg,png,ico,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};