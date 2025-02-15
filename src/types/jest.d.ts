import 'jest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): R;
    }
  }
}

type TemplateVariableValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined
  | TemplateVariableValue[]
  | { [key: string]: TemplateVariableValue };

declare module '@jest/globals' {
  export interface ExpectStatic {
    stringContaining(expected: string): TemplateVariableValue;
    any(constructor: TemplateVariableValue): TemplateVariableValue;
  }

  export interface Assertion {
    toBe(expected: TemplateVariableValue): void;
    toHaveBeenCalledWith(...args: TemplateVariableValue[]): void;
    toHaveBeenCalledTimes(count: number): void;
    toHaveBeenCalled(): void;
    rejects: {
      toThrow(message?: string | Error | undefined): Promise<void>;
    };
    resolves: {
      toBe(expected: TemplateVariableValue): Promise<void>;
      toThrow(message?: string | Error | undefined): Promise<void>;
    };
    toEqual(expected: TemplateVariableValue): void;
    toMatch(expected: string | RegExp): void;
    toContain(expected: TemplateVariableValue): void;
    toBeDefined(): void;
    toBeUndefined(): void;
    toBeNull(): void;
    toBeTruthy(): void;
    toBeFalsy(): void;
    toBeGreaterThan(expected: number): void;
    toBeLessThan(expected: number): void;
    toThrow(message?: string | Error | undefined): void;
  }
}

export {};
