import typescript from 'rollup-plugin-typescript2';
import { dts } from "rollup-plugin-dts";

const config = [
	{
		input: './src/index.tsx',
		output: {
			file: 'dist/index.js',
			format: 'esm',
			exports: 'named',
		},
		plugins: [typescript()]
	},
	{
		input: './dist/src/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		plugins: [dts()]
	}
];

export default config;
