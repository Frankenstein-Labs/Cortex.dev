/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

process.env.ESLINT_USE_FLAT_CONFIG = 'true';

const es = require('event-stream');
const vfs = require('vinyl-fs');
const { eslintFilter } = require('./filters');

function eslint() {
	const eslint = require('./gulp-eslint');
	return vfs
		.src(eslintFilter, { base: '.', follow: true, allowEmpty: true })
		.pipe(
			eslint((results) => {
				if (results.errorCount > 0) {
					throw new Error('eslint failed with errors');
				}
			})
		).pipe(es.through(function () { /* noop, important for the stream to end */ }));
}

if (require.main === module) {
	eslint().on('error', (err) => {
		console.error();
		console.error(err);
		process.exit(1);
	});
}
