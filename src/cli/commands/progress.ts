import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs/promises';
import { 
  ProgressStorage,
  ProgressFormatter,
  TaskType,
  TaskComplexity,
  TaskStatus,
  ProgressConfig 
} from '../../core/progress/index';

const defaultConfig: ProgressConfig = {
  storage: {
    path: '.pbs/progress',
    format: 'json'
  },
  reporting: {
    progressFile: 'PROGRESS.md',
    roadmapFile: 'ROADMAP.md',
    sprintReportsPath: 'docs/sprints'
  }
};

export function createProgressCommand(): Command {
  const progress = new Command('progress')
    .description('Manage project progress and documentation');

  // Add entry command
  progress
    .command('add')
    .description('Add a new progress entry')
    .argument('<title>', 'Entry title')
    .option('-t, --type <type>', 'Entry type (feature|fix|docs|test|refactor|chore)')
    .option('-c, --complexity <complexity>', 'Task complexity (easy|medium|hard|critical)')
    .option('-s, --status <status>', 'Task status (done|in-progress|planned|blocked)')
    .option('-d, --description <description>', 'Detailed description')
    .option('--sprint <sprint>', 'Sprint ID')
    .option('--tags <tags...>', 'Tags for the entry')
    .action(async (title, options) => {
      try {
        const storage = new ProgressStorage(defaultConfig);
        await storage.load();

        const entry = await storage.addEntry({
          title,
          type: (options.type || 'feature') as TaskType,
          complexity: (options.complexity || 'medium') as TaskComplexity,
          status: (options.status || 'planned') as TaskStatus,
          description: options.description,
          sprint: options.sprint,
          tags: options.tags
        });

        console.log(chalk.green('✓ Added new entry:'));
        console.log(ProgressFormatter.formatEntry(entry));

        // Update progress files
        await updateProgressFiles(storage);

      } catch (error) {
        console.error(chalk.red('Error adding entry:'), error);
        process.exit(1);
      }
    });

  // Update status command
  progress
    .command('status')
    .description('Update entry status')
    .argument('<id>', 'Entry ID')
    .argument('<status>', 'New status (done|in-progress|planned|blocked)')
    .action(async (id, status) => {
      try {
        const storage = new ProgressStorage(defaultConfig);
        await storage.load();

        const entry = await storage.updateEntry(id, { 
          status: status as TaskStatus 
        });

        console.log(chalk.green('✓ Updated entry status:'));
        console.log(ProgressFormatter.formatEntry(entry));

        await updateProgressFiles(storage);

      } catch (error) {
        console.error(chalk.red('Error updating status:'), error);
        process.exit(1);
      }
    });

  // Sprint commands
  progress
    .command('sprint')
    .description('Manage sprints')
    .command('start')
    .description('Start a new sprint')
    .argument('<name>', 'Sprint name')
    .option('-g, --goals <goals...>', 'Sprint goals')
    .action(async (name, options) => {
      try {
        const storage = new ProgressStorage(defaultConfig);
        await storage.load();

        const sprint = await storage.createSprint({
          name,
          startDate: new Date().toISOString(),
          goals: options.goals || [],
          completedGoals: [],
          blockers: []
        });

        // Set as current sprint
        storage.getData().currentSprint = sprint.id;
        await storage.save();

        console.log(chalk.green('✓ Started new sprint:'));
        console.log(ProgressFormatter.formatSprint(sprint, []));

        await updateProgressFiles(storage);

      } catch (error) {
        console.error(chalk.red('Error starting sprint:'), error);
        process.exit(1);
      }
    });

  return progress;
}

async function updateProgressFiles(storage: ProgressStorage): Promise<void> {
  const { entries, sprints, currentSprint } = storage.getData();
  const { progressFile, roadmapFile } = defaultConfig.reporting;

  // Update PROGRESS.md
  const progressReport = ProgressFormatter.generateProgressReport(entries, sprints, currentSprint);
  await fs.writeFile(progressFile, progressReport, 'utf8');

  // Update ROADMAP.md
  const roadmap = ProgressFormatter.generateRoadmap(entries);
  await fs.writeFile(roadmapFile, roadmap, 'utf8');

  console.log(chalk.blue('\nUpdated documentation files:'));
  console.log(`- ${progressFile}`);
  console.log(`- ${roadmapFile}`);
}
