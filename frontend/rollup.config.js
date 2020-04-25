import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import livereload from 'rollup-plugin-livereload'
import { uglify } from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'
import copy from 'rollup-plugin-copy'
import scss from 'rollup-plugin-scss'

const namedExports = {}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
function addReplace(packName) {
    // eslint-disable-next-line
    const pack = require(packName)

    namedExports[packName] = Object.keys(pack)
}

addReplace('react')
addReplace('react-dom')
addReplace('react-is')
addReplace('prop-types')

const isProd = process.env.NODE_ENV === 'production'

const config = {
    input: 'src/index.tsx',
    output: {
        file: 'dist/bundle.js',
    },
    watch: {
        include: [
            'static/**/*',
            'src/**/*',
        ],
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        }),
        resolve({
            extensions: ['.js', '.ts', '.tsx'],
            preferBuiltins: true,
            browser: true,
        }),
        commonjs({
            include: /node_modules/,
            namedExports,
        }),
        typescript({
            tsconfig: './tsconfig.json',
        }),
        json(),
        scss({
            output: 'dist/bundle.css',
        }),
    ],
}

if (!isProd) {
    config.plugins = [
        ...config.plugins,
        serve({
            open: false,
            contentBase: ['dist', 'static'],
            historyApiFallback: '/index.html',
        }),
        livereload(),
    ]
} else {
    config.plugins = [
        ...config.plugins,
        uglify({
            sourcemap: false,
        }),
        copy({
            targets: [
                { src: 'static/**/*', dest: 'dist' },
            ],
        }),
    ]
}


export default config
