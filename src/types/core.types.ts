/**
 * Core types for PBS system
 */

export interface PBSConfig {
  /** Base directory for source files */
  sourceDir: string;
  /** Output directory for generated files */
  outDir: string;
  /** Optional configuration overrides */
  options?: PBSOptions;
}

export interface PBSOptions {
  /** Whether to enable debug logging */
  debug?: boolean;
  /** Custom plugins to use */
  plugins?: string[];
  /** Whether to override existing files */
  overwrite?: boolean;
}

export interface PBSContext {
  /** Current working directory */
  cwd: string;
  /** Current configuration */
  config: PBSConfig;
  /** Optional metadata */
  meta?: Record<string, unknown>;
}

export type PBSResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: Error;
};
