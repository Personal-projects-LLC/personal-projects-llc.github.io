import { toPascalCase, toCamelCase } from '../string';

describe('String utilities', () => {
  describe('toPascalCase', () => {
    it('should convert space-separated strings', () => {
      expect(toPascalCase('hello world')).toBe('HelloWorld');
    });

    it('should convert hyphen-separated strings', () => {
      expect(toPascalCase('hello-world')).toBe('HelloWorld');
    });

    it('should convert underscore-separated strings', () => {
      expect(toPascalCase('hello_world')).toBe('HelloWorld');
    });

    it('should handle multiple consecutive separators', () => {
      expect(toPascalCase('hello___world')).toBe('HelloWorld');
      expect(toPascalCase('hello   world')).toBe('HelloWorld');
      expect(toPascalCase('hello---world')).toBe('HelloWorld');
    });

    it('should handle mixed separators', () => {
      expect(toPascalCase('hello_world-example test')).toBe('HelloWorldExampleTest');
    });
  });

  describe('toCamelCase', () => {
    it('should convert space-separated strings', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
    });

    it('should convert hyphen-separated strings', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
    });

    it('should convert underscore-separated strings', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
    });

    it('should handle multiple consecutive separators', () => {
      expect(toCamelCase('hello___world')).toBe('helloWorld');
      expect(toCamelCase('hello   world')).toBe('helloWorld');
      expect(toCamelCase('hello---world')).toBe('helloWorld');
    });

    it('should handle mixed separators', () => {
      expect(toCamelCase('hello_world-example test')).toBe('helloWorldExampleTest');
    });
  });
});
