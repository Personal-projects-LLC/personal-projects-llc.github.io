/**
 * Parser types for PBS system
 */

import { PBSResult } from './core.types';

type TemplateVariableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | TemplateVariableValue[]
  | { [key: string]: TemplateVariableValue };

export interface Token {
  type: string;
  value: string;
  line: number;
  column: number;
}

export interface Node {
  type: string;
  children?: Node[];
  value?: TemplateVariableValue;
  position?: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
}

export interface AST {
  type: 'Program';
  body: Node[];
}

export interface Parser {
  parse(input: string): PBSResult<AST>;
  tokenize(input: string): PBSResult<Token[]>;
}

export interface ParserOptions {
  strict?: boolean;
  plugins?: string[];
  ignoreWarnings?: boolean;
}
