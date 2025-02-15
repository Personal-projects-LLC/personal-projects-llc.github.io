import { loadPBSConfig } from '../../core/config';
import { parseComponentDoc, generateComponentCode } from '../../core/parser/component';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs/promises';

interface GenerateOptions {
  type?: string;
  path?: string;
}

const VALID_TYPES = ['component', 'page', 'feature'] as const;
type GenerateType = typeof VALID_TYPES[number];

function isValidType(type: string): type is GenerateType {
  return VALID_TYPES.includes(type as GenerateType);
}

export async function generate(options: GenerateOptions) {
  try {
    console.log(chalk.blue('Starting code generation...'));

    // Validate options
    if (!options.type) {
      throw new Error('Type is required. Use --type <type>');
    }

    if (!isValidType(options.type)) {
      throw new Error(`Invalid type. Must be one of: ${VALID_TYPES.join(', ')}`);
    }

    if (!options.path) {
      throw new Error('Documentation path is required. Use --path <path>');
    }

    // Load configuration
    const config = await loadPBSConfig();

    // Ensure documentation file exists
    const docPath = path.resolve(process.cwd(), options.path);
    try {
      await fs.access(docPath);
    } catch {
      throw new Error(`Documentation file not found: ${docPath}`);
    }

    // Generate code based on type
    let generatedCode = '';
    let outputPath = '';

    switch (options.type) {
      case 'component': {
        console.log(chalk.yellow('Parsing component documentation...'));
        const metadata = await parseComponentDoc(docPath);
        generatedCode = generateComponentCode(metadata);
        outputPath = path.join(
          process.cwd(),
          'src/components',
          `${metadata.name}.tsx`
        );
        break;
      }
      case 'page':
      case 'feature':
        throw new Error(`Generation for type '${options.type}' not yet implemented`);
    }

    // Create output directory if it doesn't exist
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write generated code to file
    await fs.writeFile(outputPath, generatedCode, 'utf8');

    console.log(chalk.green('\nCode generation completed!'));
    console.log(chalk.blue('\nGenerated file:'), outputPath);
    console.log(chalk.blue('\nNext steps:'));
    console.log('1. Review the generated code');
    console.log('2. Add any necessary tests');
    console.log('3. Test the component in your application');

  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('Error generating code:'), error.message);
    } else {
      console.error(chalk.red('An unknown error occurred'));
    }
    process.exit(1);
  }
}
