import { readFile } from 'fs/promises';
import { toPascalCase } from '../../utils/string';

interface ComponentProp {
  name: string;
  type: string;
  description?: string;
  required?: boolean;
}

interface ComponentMetadata {
  name: string;
  description: string;
  props: ComponentProp[];
  examples: string[];
  styling?: string;
  bestPractices?: string[];
  accessibility?: string[];
}

export async function parseComponentDoc(filePath: string): Promise<ComponentMetadata> {
  const content = await readFile(filePath, 'utf8');
  const lines = content.split('\n');
  
  const metadata: ComponentMetadata = {
    name: '',
    description: '',
    props: [],
    examples: [],
    bestPractices: [],
    accessibility: []
  };

  let currentSection: string | null = null;
  let codeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;

    // Handle code blocks
    if (line.startsWith('```')) {
      codeBlock = !codeBlock;
      if (line.includes('tsx') && codeBlock) {
        currentSection = 'examples';
      }
      continue;
    }

    // Handle sections
    if (line.startsWith('# ')) {
      metadata.name = line.replace('# ', '').replace(' Component', '');
      continue;
    }

    if (line.startsWith('## ')) {
      currentSection = line.replace('## ', '').toLowerCase();
      continue;
    }

    // Process content based on current section
    switch (currentSection) {
      case 'description':
        if (!metadata.description) {
          metadata.description = line;
        }
        break;

      case 'props':
        if (line.startsWith('- ')) {
          const [propDef, ...descLines] = line.substring(2).split('\n');
          const [propName, propType] = propDef.split(':').map(s => s.trim());
          metadata.props.push({
            name: propName,
            type: propType,
            description: descLines.join(' ').trim(),
            required: !propType.includes('?')
          });
        }
        break;

      case 'examples':
        if (codeBlock && !line.startsWith('//')) {
          metadata.examples.push(line);
        }
        break;

      case 'best practices':
        if (line.match(/^\d+\./)) {
          metadata.bestPractices?.push(line.replace(/^\d+\.\s*/, ''));
        }
        break;

      case 'accessibility':
        if (line.startsWith('- ')) {
          metadata.accessibility?.push(line.substring(2));
        }
        break;

      case 'styling':
        if (!metadata.styling) {
          metadata.styling = line;
        }
        break;
    }
  }

  return metadata;
}

export function generateComponentCode(metadata: ComponentMetadata): string {
  const { name, props, description } = metadata;

  const imports = [
    "import { FC } from 'react';",
    "import clsx from 'clsx';",
  ].join('\n');

  const propsInterface = `interface ${name}Props {
  ${props.map(prop => `${prop.name}${prop.required ? '' : '?'}: ${prop.type};${prop.description ? ` // ${prop.description}` : ''}`).join('\n  ')}
}`;

  const componentCode = `
/**
 * ${description}
 */
export const ${name}: FC<${name}Props> = ({
  ${props.map(prop => prop.name).join(',\n  ')}
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        {
          'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
          'bg-secondary-600 text-white hover:bg-secondary-700': variant === 'secondary',
          'border-2 border-primary-600 text-primary-600 hover:bg-primary-50': variant === 'outline',
          'w-full': fullWidth,
          'opacity-50 cursor-not-allowed': disabled,
          'px-2.5 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
`;

  const fullCode = [
    imports,
    '',
    propsInterface,
    '',
    componentCode
  ].join('\n');

  return fullCode;
}
