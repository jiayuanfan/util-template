import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const paths = require('../configs/paths');

export default {
	input: './src/start.ts',
	output: {
		file: 'umd/start.js',
		format: 'iife',
	},

	plugins: [
		typescript(),
		babel(),
		replace({
			'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV || 'production'),
			'process.env.PRELOAD_OPTS': JSON.stringify(require(paths.config)),
		}),
		uglify(),
	],
};
