import typescript from 'rollup-plugin-typescript2';

const config = {
	input: './src/index.tsx',
	output: {
		file: 'dist/index.js',
		format: 'esm',
		sourcemap: true,
		exports: 'named',
	},
	plugins: [typescript()]
};

export default config;
