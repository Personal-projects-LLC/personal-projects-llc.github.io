import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/cli/index.ts',
  target: 'node',
  mode: 'production',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'pbs.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              compilerOptions: {
                module: 'esnext'
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
    mainFields: ['module', 'main']
  },
  externals: [nodeExternals()],
  experiments: {
    outputModule: false
  },
  target: 'node'
};
