import 'jest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): R;
    }
  }
}

declare module '@jest/globals' {
  export interface ExpectStatic {
    stringContaining(expected: string): any;
    any(constructor: any): any;
  }

  export interface Assertion {
    toBe(expected: any): void;
    toHaveBeenCalledWith(...args: any[]): void;
    toHaveBeenCalledTimes(count: number): void;
    toHaveBeenCalled(): void;
    rejects: {
      toThrow(message?: string | Error | undefined): Promise<void>;
    };
    resolves: {
      toBe(expected: any): Promise<void>;
      toThrow(message?: string | Error | undefined): Promise<void>;
    };
    toEqual(expected: any): void;
    toMatch(expected: string | RegExp): void;
    toContain(expected: any): void;
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
