'use client';

import { useAuth } from '@clerk/nextjs';

const AuthDebug = () => {
  const { userId, isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="font-bold">Auth Debug Info:</h2>
      <pre className="mt-2">
        {JSON.stringify(
          {
            userId,
            isSignedIn,
            isLoaded,
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
};

export default AuthDebug;
