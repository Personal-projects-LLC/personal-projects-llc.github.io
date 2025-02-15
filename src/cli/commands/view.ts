import { Command } from 'commander';
import chalk from 'chalk';
import { ProgressStorage, ProgressFormatter, ProgressConfig } from '../../core/progress/index';

const defaultConfig: ProgressConfig = {
  storage: {
    path: '.pbs/progress',
    format: 'json' as const
  },
  reporting: {
    progressFile: 'PROGRESS.md',
    roadmapFile: 'ROADMAP.md',
    sprintReportsPath: 'docs/sprints'
  }
};

export function createViewCommand(): Command {
  const view = new Command('view')
    .description('View project progress and status');

  view
    .command('sprint')
    .description('View current sprint status')
    .action(async () => {
      try {
        const storage = new ProgressStorage(defaultConfig);
        await storage.load();

        const currentSprint = storage.getCurrentSprint();
        if (!currentSprint) {
          console.log(chalk.yellow('No active sprint found.'));
          return;
        }

        const entries = storage.getEntries({ sprint: currentSprint.id });
        console.log(ProgressFormatter.formatSprint(currentSprint, entries));

        // Display summary
        const stats = {
          done: entries.filter(e => e.status === 'done').length,
          inProgress: entries.filter(e => e.status === 'in-progress').length,
          planned: entries.filter(e => e.status === 'planned').length,
          blocked: entries.filter(e => e.status === 'blocked').length
        };

        console.log('\nSprint Summary:');
        console.log('──────────────────────');
        console.log(`✅ Done: ${stats.done}`);
        console.log(`🚧 In Progress: ${stats.inProgress}`);
        console.log(`⏳ Planned: ${stats.planned}`);
        console.log(`❌ Blocked: ${stats.blocked}`);
        console.log('──────────────────────');
        
        const progress = (stats.done / entries.length) * 100;
        console.log(`Sprint Progress: ${progress.toFixed(1)}%`);

      } catch (error) {
        console.error(chalk.red('Error viewing sprint:'), error);
        process.exit(1);
      }
    });

  view
    .command('status')
    .description('View overall project status')
    .action(async () => {
      try {
        const storage = new ProgressStorage(defaultConfig);
        await storage.load();

        const entries = storage.getEntries();
        const blockers = storage.getActiveBlockers();

        console.log(chalk.blue('\nProject Status Overview'));
        console.log('═══════════════════════\n');

        // Display active blockers
        if (blockers.length > 0) {
          console.log(chalk.red('Active Blockers:'));
          blockers.forEach(blocker => {
            console.log(ProgressFormatter.formatBlocker(blocker));
          });
        }

        // Group tasks by type
        const byType = entries.reduce((acc, entry) => {
          if (!acc[entry.type]) acc[entry.type] = [];
          acc[entry.type].push(entry);
          return acc;
        }, {} as Record<string, typeof entries>);

        // Display tasks by type
        Object.entries(byType).forEach(([type, typeEntries]) => {
          console.log(chalk.cyan(`\n${type.toUpperCase()}:`));
          typeEntries.forEach(entry => {
            console.log(ProgressFormatter.formatEntry(entry));
          });
        });

        // Display summary
        const total = entries.length;
        const done = entries.filter(e => e.status === 'done').length;
        const progress = (done / total) * 100;

        console.log(chalk.blue('\nOverall Progress:'));
        console.log('───────────────────');
        console.log(`Total Tasks: ${total}`);
        console.log(`Completed: ${done}`);
        console.log(`Progress: ${progress.toFixed(1)}%`);

      } catch (error) {
        console.error(chalk.red('Error viewing status:'), error);
        process.exit(1);
      }
    });

  return view;
}
