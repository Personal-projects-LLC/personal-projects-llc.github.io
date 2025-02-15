import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import yaml from 'yaml';

export interface PBSConfig {
  version: string;
  templates: {
    path: string;
    component: string;
    page: string;
    feature: string;
  };
  documentation: {
    path: string;
    format: 'md' | 'mdx' | 'yaml';
  };
  validation: {
    strict: boolean;
    ignorePatterns: string[];
  };
  metrics: {
    output: string;
    thresholds: {
      complexity: number;
      coverage: number;
      duplications: number;
    };
  };
}

const defaultConfig: PBSConfig = {
  version: '0.1.0',
  templates: {
    path: './pbs/templates',
    component: 'component.template.tsx',
    page: 'page.template.tsx',
    feature: 'feature.template.tsx',
  },
  documentation: {
    path: './docs',
    format: 'md',
  },
  validation: {
    strict: true,
    ignorePatterns: ['node_modules/**', 'dist/**', '.next/**'],
  },
  metrics: {
    output: './docs/metrics',
    thresholds: {
      complexity: 10,
      coverage: 90,
      duplications: 5,
    },
  },
};

export async function createPBSConfig(): Promise<void> {
  const configPath = 'pbs.config.json';

  try {
    // Check if config already exists
    try {
      await fs.access(configPath);
      console.log('PBS config already exists, skipping creation');
      return;
    } catch {
      // File doesn't exist, continue with creation
    }

    // Create config file
    await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8');

    // Create necessary directories
    await fs.mkdir(defaultConfig.templates.path, { recursive: true });
    await fs.mkdir(defaultConfig.documentation.path, { recursive: true });
    await fs.mkdir(defaultConfig.metrics.output, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create PBS config: ${error}`);
  }
}

export async function loadPBSConfig(): Promise<PBSConfig> {
  try {
    const configPath = 'pbs.config.json';
    const configContent = await fs.readFile(configPath, 'utf8');
    return JSON.parse(configContent);
  } catch (error) {
    console.log('Failed to load PBS config:', error);
    throw new Error('PBS configuration not found. Run pbs init first.');
  }
}
