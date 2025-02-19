'use client';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <SignUp
        appearance={{
          elements: {
            card: 'shadow-lg',
            socialButtonsBlockButton: 'max-w-full',
            formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </div>
  );
}
