const { globPlugin } = require('esbuild-plugin-glob');

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
      '.json': 'json',
    },
    plugins: [globPlugin()],
  })
  .catch(() => process.exit(1));