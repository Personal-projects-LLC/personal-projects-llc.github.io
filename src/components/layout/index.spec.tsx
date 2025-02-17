import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Layout from './index';

// Mock child components
vi.mock('../header', () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}));

vi.mock('../footer', () => ({
  Footer: () => <div data-testid="mock-footer">Footer</div>,
}));

describe('Layout', () => {
  it('renders header, main content and footer', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('wraps content in flex container', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const container = screen.getByText('Test Content').parentElement?.parentElement;

    expect(container).toHaveClass('min-h-screen', 'flex', 'flex-col');
  });

  it('applies flex-1 to main content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const main = screen.getByText('Test Content').parentElement;

    expect(main).toHaveClass('flex-1');
  });
});
