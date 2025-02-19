import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import Header from './index';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    // Reset usePathname mock
    (usePathname as Mock).mockReset();
  });

  it('renders logo and navigation links', () => {
    (usePathname as Mock).mockReturnValue('/');
    render(<Header />);

    // Check logo
    expect(screen.getByText('JobTasker')).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Analysis')).toBeInTheDocument();
  });

  it('highlights active navigation item', () => {
    (usePathname as Mock).mockReturnValue('/projects');
    render(<Header />);

    const projectsLink = screen.getByText('Projects').closest('a');
    const tasksLink = screen.getByText('Tasks').closest('a');

    expect(projectsLink).toHaveClass('text-primary');
    expect(tasksLink).toHaveClass('text-muted-foreground');
  });

  it('renders new project button', () => {
    (usePathname as Mock).mockReturnValue('/');
    render(<Header />);

    const newProjectButton = screen.getByText('New Project').closest('a');

    expect(newProjectButton).toHaveAttribute('href', '/projects?new=true');
  });

  it('is responsive with hidden navigation on mobile', () => {
    (usePathname as Mock).mockReturnValue('/');
    render(<Header />);

    const nav = screen.getByText('Projects').closest('div');

    expect(nav).toHaveClass('hidden', 'md:flex');
  });
});
