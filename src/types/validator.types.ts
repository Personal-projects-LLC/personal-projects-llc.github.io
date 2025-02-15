/**
 * Validator types for PBS system
 */

import { PBSResult } from './core.types';
import { Node } from './parser.types';

type TemplateVariableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | TemplateVariableValue[]
  | { [key: string]: TemplateVariableValue };

export interface ValidationRule {
  id: string;
  severity: 'error' | 'warning' | 'info';
  validate: (node: Node, context?: ValidationContext) => ValidationResult[];
  fix?: (node: Node, context?: ValidationContext) => Node;
}

export interface ValidationResult {
  ruleId: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  location: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
  fix?: () => void;
}

export interface ValidationContext {
  rules: ValidationRule[];
  config: ValidationConfig;
  customData?: Record<string, TemplateVariableValue>;
}

export interface ValidationConfig {
  rules: Record<string, boolean | object>;
  ignorePatterns?: string[];
  extends?: string[];
  plugins?: string[];
}

export interface Validator {
  validate(node: Node, context?: ValidationContext): PBSResult<ValidationResult[]>;
  addRule(rule: ValidationRule): void;
  removeRule(ruleId: string): void;
  setConfig(config: ValidationConfig): void;
}
