import { createPBSConfig } from '../../core/config';
import { createDefaultTemplates } from '../../core/templates';
import chalk from 'chalk';

export async function init() {
  try {
    console.log(chalk.blue('Initializing PBS...'));
    
    // Create PBS configuration
    await createPBSConfig();
    console.log(chalk.green('✓ Created PBS configuration'));
    
    // Create default templates
    await createDefaultTemplates();
    console.log(chalk.green('✓ Created default templates'));
    
    console.log(chalk.green('\nPBS initialized successfully!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log('1. Review the generated pbs.config.json');
    console.log('2. Add your first documentation file');
    console.log('3. Run pbs generate to create code from documentation');
    
  } catch (error) {
    console.error(chalk.red('Error initializing PBS:'), error);
    process.exit(1);
  }
}
