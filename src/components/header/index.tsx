'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../../context/theme-toggle';
import Button from '../button';
import Container from '../container';
import UserMenu from '../UserMenu';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Analysis', href: '/analysis' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <div className="flex gap-8 items-center">
            <Link href="/" className="text-xl font-bold">
              JobTasker
            </Link>
            <div className="hidden md:flex gap-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="secondary" asChild>
              <Link href="/projects?new=true">New Project</Link>
            </Button>
            <UserMenu />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
