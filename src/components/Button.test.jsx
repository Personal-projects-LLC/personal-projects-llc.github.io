import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<Button variant="primary" size="md">Click Me</Button>);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
  });

  it('applies variant styles correctly', () => {
    const { rerender, getByRole } = render(
      <Button variant="primary" size="md">Button</Button>
    );
    let button = getByRole('button');
    expect(button.className).toContain('bg-primary-600');

    rerender(<Button variant="secondary" size="md">Button</Button>);
    button = getByRole('button');
    expect(button.className).toContain('bg-secondary-600');

    rerender(<Button variant="outline" size="md">Button</Button>);
    button = getByRole('button');
    expect(button.className).toContain('border-primary-600');
  });

  it('handles size prop correctly', () => {
    const { rerender, getByRole } = render(
      <Button variant="primary" size="sm">Button</Button>
    );
    let button = getByRole('button');
    expect(button.className).toContain('text-sm');

    rerender(<Button variant="primary" size="md">Button</Button>);
    button = getByRole('button');
    expect(button.className).toContain('text-base');

    rerender(<Button variant="primary" size="lg">Button</Button>);
    button = getByRole('button');
    expect(button.className).toContain('text-lg');
  });

  it('handles disabled state', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Button variant="primary" size="md" disabled onClick={onClick}>
        Button
      </Button>
    );
    const button = getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button.className).toContain('cursor-not-allowed');
    
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Button variant="primary" size="md" onClick={onClick}>
        Button
      </Button>
    );
    const button = getByRole('button');
    
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies full width style when fullWidth is true', () => {
    const { getByRole } = render(
      <Button variant="primary" size="md" fullWidth>
        Button
      </Button>
    );
    const button = getByRole('button');
    expect(button.className).toContain('w-full');
  });
});
