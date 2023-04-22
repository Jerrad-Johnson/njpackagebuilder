import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default {
    input: 'stripped/index.js',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
            name: 'react-lib',
        },
    ],
    plugins: [
        external(),
        resolve(),
        commonjs({transformMixedEsModules:true}),
        terser(),
    ]
}