// #!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init';
import { generate } from './commands/generate';
import { validate } from './commands/validate';
import { metrics } from './commands/metrics';
import { createProgressCommand } from './commands/progress';
import { createViewCommand } from './commands/view';

const program = new Command();

program
  .name('pbs')
  .description('Project Building System - Documentation driven development')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize PBS in the current project')
  .action(init);

program
  .command('generate')
  .description('Generate code from documentation')
  .option('-t, --type <type>', 'Type of code to generate (component, page, feature)')
  .option('-p, --path <path>', 'Path to documentation file')
  .action(generate);

program
  .command('validate')
  .description('Validate code against documentation')
  .option('-p, --path <path>', 'Path to validate (defaults to current directory)')
  .action(validate);

program
  .command('metrics')
  .description('Generate project metrics')
  .option('-t, --type <type>', 'Type of metrics (complexity, coverage, docs)')
  .option('-o, --output <path>', 'Output path for metrics report')
  .action(metrics);

// Add management commands
program.addCommand(createProgressCommand());
program.addCommand(createViewCommand());

program.parse();
