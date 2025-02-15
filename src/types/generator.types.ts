/**
 * Generator types for PBS system
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

type HelperFunction = (
  context: TemplateVariableValue,
  options?: Record<string, TemplateVariableValue>
) => string | number | boolean | null | undefined;

export interface Template {
  name: string;
  content: string;
  variables?: Record<string, TemplateVariableValue>;
}

export interface GeneratorConfig {
  templates: Template[];
  outputPath: string;
  format?: boolean;
  overwrite?: boolean;
}

export interface Generator {
  generate(node: Node, config: GeneratorConfig): PBSResult<string>;
  validateTemplate(template: Template): PBSResult<boolean>;
  registerHelper(name: string, fn: HelperFunction): void;
}

export interface GeneratorPlugin {
  name: string;
  transform?: (content: string) => string;
  validate?: (content: string) => boolean;
  postProcess?: (content: string) => string;
}

export interface GeneratorContext {
  variables: Record<string, TemplateVariableValue>;
  helpers: Record<string, HelperFunction>;
  plugins: GeneratorPlugin[];
}
