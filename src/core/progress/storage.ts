import fs from 'fs/promises';
import path from 'path';
import yaml from 'yaml';
import { ProgressData, ProgressConfig, ProgressEntry, Blocker, Sprint } from './types';

export class ProgressStorage {
  private config: ProgressConfig;
  private data: ProgressData;

  constructor(config: ProgressConfig) {
    this.config = config;
    this.data = {
      entries: [],
      sprints: [],
      blockers: []
    };
  }

  private getStoragePath(): string {
    return path.join(process.cwd(), this.config.storage.path, 'progress-data.json');
  }

  async load(): Promise<void> {
    const filePath = this.getStoragePath();
    try {
      const content = await fs.readFile(filePath, 'utf8');
      this.data = this.config.storage.format === 'json'
        ? JSON.parse(content)
        : yaml.parse(content);
    } catch (error) {
      // If file doesn't exist, use empty data structure
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        this.data = {
          entries: [],
          sprints: [],
          blockers: []
        };
        await this.save(); // Create initial file
      } else {
        throw error;
      }
    }
  }

  async save(): Promise<void> {
    const filePath = this.getStoragePath();
    const dir = path.dirname(filePath);
    
    // Ensure directory exists
    await fs.mkdir(dir, { recursive: true });

    // Convert data to string based on format
    const content = this.config.storage.format === 'json'
      ? JSON.stringify(this.data, null, 2)
      : yaml.stringify(this.data);

    await fs.writeFile(filePath, content, 'utf8');
  }

  // Progress Entry Methods
  async addEntry(entry: Omit<ProgressEntry, 'id' | 'timestamp'>): Promise<ProgressEntry> {
    const newEntry: ProgressEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };
    
    this.data.entries.push(newEntry);
    await this.save();
    return newEntry;
  }

  async updateEntry(id: string, updates: Partial<ProgressEntry>): Promise<ProgressEntry> {
    const index = this.data.entries.findIndex(e => e.id === id);
    if (index === -1) throw new Error(`Entry not found: ${id}`);

    this.data.entries[index] = {
      ...this.data.entries[index],
      ...updates
    };

    await this.save();
    return this.data.entries[index];
  }

  // Sprint Methods
  async createSprint(sprint: Omit<Sprint, 'id'>): Promise<Sprint> {
    const newSprint: Sprint = {
      ...sprint,
      id: crypto.randomUUID()
    };

    this.data.sprints.push(newSprint);
    await this.save();
    return newSprint;
  }

  async updateSprint(id: string, updates: Partial<Sprint>): Promise<Sprint> {
    const index = this.data.sprints.findIndex(s => s.id === id);
    if (index === -1) throw new Error(`Sprint not found: ${id}`);

    this.data.sprints[index] = {
      ...this.data.sprints[index],
      ...updates
    };

    await this.save();
    return this.data.sprints[index];
  }

  // Blocker Methods
  async addBlocker(blocker: Omit<Blocker, 'id' | 'createdAt'>): Promise<Blocker> {
    const newBlocker: Blocker = {
      ...blocker,
      id: this.data.blockers.length + 1,
      createdAt: new Date().toISOString()
    };

    this.data.blockers.push(newBlocker);
    await this.save();
    return newBlocker;
  }

  async resolveBlocker(id: number): Promise<Blocker> {
    const index = this.data.blockers.findIndex(b => b.id === id);
    if (index === -1) throw new Error(`Blocker not found: ${id}`);

    this.data.blockers[index].resolvedAt = new Date().toISOString();
    await this.save();
    return this.data.blockers[index];
  }

  // Query Methods
  getEntries(filter?: Partial<ProgressEntry>): ProgressEntry[] {
    if (!filter) return this.data.entries;

    return this.data.entries.filter((entry: ProgressEntry) => {
      return Object.entries(filter).every(([key, value]: [string, unknown]) => {
        return entry[key as keyof ProgressEntry] === value;
      });
    });
  }

  getCurrentSprint(): Sprint | undefined {
    if (!this.data.currentSprint) return undefined;
    return this.data.sprints.find((sprint: Sprint) => sprint.id === this.data.currentSprint);
  }

  getActiveBlockers(): Blocker[] {
    return this.data.blockers.filter((blocker: Blocker) => !blocker.resolvedAt);
  }

  getData() {
    return this.data;
  }
}
