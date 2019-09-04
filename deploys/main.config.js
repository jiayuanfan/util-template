import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const paths = require('../configs/paths'),
	modName = require(paths.config).modName;

export default {
	input: './src/index.ts',
	output: {
		file: 'umd/index.js',
		name: modName,
		format: 'umd',
		exports: 'named',
	},
	plugins: [
		json(),
		typescript(),
		commonjs(),
		resolve(),
		babel(),
		replace({
			'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV || 'production'),
			'process.env.MODNAME': JSON.stringify(modName),
		}),
		uglify(),
	],
};
