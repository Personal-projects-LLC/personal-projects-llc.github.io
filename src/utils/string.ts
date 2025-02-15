/**
 * Converts a string to pascal case.
 * Example: "hello world" -> "HelloWorld"
 */
export function toPascalCase(str: string): string {
  return str
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Converts a string to camel case.
 * Example: "hello world" -> "helloWorld"
 */
export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
