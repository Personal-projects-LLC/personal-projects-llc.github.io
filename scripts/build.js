import { build } from 'esbuild';
import { chmod, writeFile } from 'fs/promises';
import { join } from 'path';

async function buildProject() {
  try {
    // Build the project
    await build({
      entryPoints: ['src/cli/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node16',
      outfile: 'dist/pbs.js',
      format: 'esm',
      banner: {
        js: '// @ts-nocheck\n#!/usr/bin/env node',
      },
      loader: {
        '.ts': 'ts'
      },
      sourcemap: true,
      minify: false,
      metafile: true,
    }).then(result => {
      console.log("Build successful, writing metafile...");
      return writeFile("meta.json", JSON.stringify(result.metafile, null, 2));
    }).catch(error => {
      console.error("Build failed:", error);
      process.exit(1);
    });

    // Make the output file executable
    await chmod(join(process.cwd(), 'dist/pbs.js'), 0o755);

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();
