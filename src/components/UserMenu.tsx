'use client';

import { useState } from 'react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { user } = useUser();
  // const { signOut } = useSignOut();

  if (!user) {
    return null;
  }

  const initial = user.firstName?.[0] || user.username?.[0] || '?';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
      >
        {initial}
      </button>

      {isOpen && (
        <>
          <div
            role="button"
            tabIndex={0}
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsOpen(false);
              }
            }}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40 py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              {user.fullName || user.username}
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
