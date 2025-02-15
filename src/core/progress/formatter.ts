import { ProgressEntry, Sprint, Blocker, COMPLEXITY_EMOJI, STATUS_EMOJI, TYPE_EMOJI } from './types';

export class ProgressFormatter {
  // Format a single progress entry
  static formatEntry(entry: ProgressEntry): string {
    const complexity = COMPLEXITY_EMOJI[entry.complexity];
    const status = STATUS_EMOJI[entry.status];
    const type = TYPE_EMOJI[entry.type];

    return [
      `${status} ${type} ${entry.title} ${complexity}`,
      entry.description ? `   ${entry.description}` : '',
      entry.tags?.length ? `   Tags: ${entry.tags.join(', ')}` : '',
      entry.blockedBy?.length ? `   🚫 Blocked by: ${entry.blockedBy.join(', ')}` : '',
      ''
    ].filter(Boolean).join('\n');
  }

  // Format a sprint summary
  static formatSprint(sprint: Sprint, entries: ProgressEntry[]): string {
    const sprintEntries = entries.filter(e => e.sprint === sprint.id);
    const completionRate = sprint.completedGoals.length / sprint.goals.length * 100;

    return [
      `# ${sprint.name}`,
      '',
      `📅 ${sprint.startDate} - ${sprint.endDate || 'Ongoing'}`,
      '',
      '## Goals',
      ...sprint.goals.map(goal => {
        const completed = sprint.completedGoals.includes(goal);
        return `${completed ? '✅' : '⏳'} ${goal}`;
      }),
      '',
      `Completion Rate: ${completionRate.toFixed(1)}%`,
      '',
      '## Progress',
      ...sprintEntries.map(entry => ProgressFormatter.formatEntry(entry)),
      '',
      sprint.blockers.length ? [
        '## Blockers',
        ...sprint.blockers.map(ProgressFormatter.formatBlocker),
        ''
      ].join('\n') : '',
    ].filter(Boolean).join('\n');
  }

  // Format a blocker
  static formatBlocker(blocker: Blocker): string {
    const status = blocker.resolvedAt ? '✅' : '❌';
    return [
      `${status} ${blocker.feature}`,
      `   Reason: ${blocker.reason}`,
      `   Created: ${new Date(blocker.createdAt).toLocaleDateString()}`,
      blocker.resolvedAt ? `   Resolved: ${new Date(blocker.resolvedAt).toLocaleDateString()}` : '',
      ''
    ].filter(Boolean).join('\n');
  }

  // Generate full progress report
  static generateProgressReport(entries: ProgressEntry[], sprints: Sprint[], currentSprintId?: string): string {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentSprint = sprints.find(s => s.id === currentSprintId);

    const sections = [
      '# Progress Report',
      `Generated on: ${currentDate}`,
      '',
      currentSprint ? [
        '## Current Sprint',
        ProgressFormatter.formatSprint(currentSprint, entries),
        ''
      ].join('\n') : '',
      '## Recent Progress',
      ...entries
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10)
        .map(entry => ProgressFormatter.formatEntry(entry)),
      '',
      '## Sprint History',
      ...sprints
        .filter(s => s.id !== currentSprintId)
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .map(sprint => ProgressFormatter.formatSprint(sprint, entries))
    ];

    return sections.filter(Boolean).join('\n');
  }

  // Generate roadmap
  static generateRoadmap(entries: ProgressEntry[]): string {
    const grouped = entries.reduce((acc, entry) => {
      const status = entry.status;
      if (!acc[status]) acc[status] = [];
      acc[status].push(entry);
      return acc;
    }, {} as Record<string, ProgressEntry[]>);

    const sections = [
      '# Project Roadmap',
      `Last updated: ${new Date().toISOString().split('T')[0]}`,
      '',
      '## Overview',
      `Total tasks: ${entries.length}`,
      `Completed: ${entries.filter(e => e.status === 'done').length}`,
      `In progress: ${entries.filter(e => e.status === 'in-progress').length}`,
      `Planned: ${entries.filter(e => e.status === 'planned').length}`,
      `Blocked: ${entries.filter(e => e.status === 'blocked').length}`,
      '',
      '## Current Status',
      '',
      Object.entries(grouped).map(([status, statusEntries]) => [
        `### ${STATUS_EMOJI[status as keyof typeof STATUS_EMOJI]} ${status.toUpperCase()}`,
        ...statusEntries.map(entry => ProgressFormatter.formatEntry(entry)),
        ''
      ].join('\n')).join('\n')
    ];

    return sections.filter(Boolean).join('\n');
  }
}
