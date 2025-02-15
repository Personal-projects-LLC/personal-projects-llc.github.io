import fs from 'fs/promises';
import path from 'path';
import { loadPBSConfig } from '../config';

const componentTemplate = `import { FC } from 'react';

interface {{name}}Props {
  // Props will be generated from documentation
}

export const {{name}}: FC<{{name}}Props> = (props) => {
  return (
    <div>
      {/* Component content will be generated from documentation */}
    </div>
  );
};
`;

const pageTemplate = `import { NextPage } from 'next';
import Head from 'next/head';

interface {{name}}PageProps {
  // Props will be generated from documentation
}

const {{name}}Page: NextPage<{{name}}PageProps> = (props) => {
  return (
    <>
      <Head>
        <title>{{name}}</title>
      </Head>
      <main>
        {/* Page content will be generated from documentation */}
      </main>
    </>
  );
};

export default {{name}}Page;
`;

const featureTemplate = `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface {{name}}State {
  // State interface will be generated from documentation
}

const initialState: {{name}}State = {
  // Initial state will be generated from documentation
};

export const {{name}}Slice = createSlice({
  name: '{{name}}',
  initialState,
  reducers: {
    // Reducers will be generated from documentation
  },
});

export const {{name}}Actions = {{name}}Slice.actions;
export default {{name}}Slice.reducer;
`;

export async function createDefaultTemplates(): Promise<void> {
  try {
    const config = await loadPBSConfig();
    const templatesPath = config.templates.path;

    // Create templates directory if it doesn't exist
    await fs.mkdir(templatesPath, { recursive: true });

    // Write component template
    await fs.writeFile(
      path.join(templatesPath, config.templates.component),
      componentTemplate,
      'utf8'
    );

    // Write page template
    await fs.writeFile(
      path.join(templatesPath, config.templates.page),
      pageTemplate,
      'utf8'
    );

    // Write feature template
    await fs.writeFile(
      path.join(templatesPath, config.templates.feature),
      featureTemplate,
      'utf8'
    );

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create templates: ${error.message}`);
    }
    throw new Error('Failed to create templates');
  }
}
