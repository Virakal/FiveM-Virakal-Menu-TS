const esbuild = require('esbuild');

const production = 	process.argv.findIndex((argItem) => argItem === '--mode=production') >= 0;

const server = {
	platform: 'node',
	target: ['node16'],
	format: 'cjs',
};

const client = {
	platform: 'browser',
	target: ['chrome93'],
	format: 'iife',
};

for (const context of ['client', 'server']) {
	esbuild[production ? 'build' : 'context']({
			bundle: true,
			entryPoints: [`${context}/${context}.ts`],
			outfile: `dist/${context}.js`,
			...(context === 'client' ? client : server),
		})
		.then((r) => {
			console.log(`[${context}]: Built successfully!`)

			if (!production) {
				r.watch()
					.then(() => console.log(`[${context}]: Watching for changes...`))
			}
		})
		.catch(() => process.exit(1));
}
