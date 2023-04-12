/* eslint-disable import/unambiguous */

const execSync = require('child_process').execSync;
const { globPlugin } = require('esbuild-plugin-glob');

execSync('npx rimraf ./dist && mkdir dist');

require('esbuild')
  .build({
    entryPoints: ['./src/**/*.js', './src/**/*.json'],
    bundle: false,
    outdir: './dist',
    platform: 'node',
    target: 'node16.0',
    format: 'cjs',
    minify: false,
    sourcemap: true,
    keepNames: true,
    loader: {
      '.json': 'copy',
    },
    plugins: [globPlugin()],
  })
  .catch(() => process.exit(1));
