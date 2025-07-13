const esbuild = require('esbuild');

const production =
	process.argv.findIndex((argItem) => argItem === '--mode=production') >= 0;

const contexts = {
	server: {
		platform: 'node',
		target: ['node16'],
		format: 'cjs',
	},
	client: {
		platform: 'browser',
		target: ['chrome93'],
		format: 'iife',
	},
};

for (const [context, contextOptions] of Object.entries(contexts)) {
	esbuild[production ? 'build' : 'context']({
		bundle: true,
		entryPoints: [`${context}/${context}.ts`],
		outfile: `dist/${context}.js`,
		...contextOptions,
	})
		.then((r) => {
			console.log(`[${context}]: Built successfully!`);

			if (!production) {
				r.watch().then(() =>
					console.log(`[${context}]: Watching for changes...`),
				);
			}
		})
		.catch(() => process.exit(1));
}
