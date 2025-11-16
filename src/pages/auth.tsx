import { useState, useEffect } from 'react';
// Corrected the import path to be relative, as aliases can be problematic.
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext'; // Assuming this path is correct
import Head from 'next/head';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useUser();
  const { destinationId, packageId, date } = router.query;

  // If user is already logged in, redirect them to the profile page
  useEffect(() => {
    if (user) {
      router.push(`/register?destinationId=${destinationId}&packageId=${packageId}&date=${date}`);
    }
  }, [user, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      if (isLoginView) {
        // Handle Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // The UserContext will handle the redirect if there's a pending booking
        router.push('/'); // Go to home page after login
      } else {
        // Handle Sign Up
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              avatar_url: '',
            },
          },
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    // Updated background color
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Head>
        <title>{isLoginView ? 'Login' : 'Sign Up'} - TravelBuddy</title>
      </Head>
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        {/* Updated card styling */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md w-full">
          {/* Updated title styling */}
          <h2 className="text-2xl font-bold text-[#C2461C] mb-2">
            {isLoginView ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          {/* Added subtitle */}
          <p className="text-sm text-gray-500 mb-6">
            {isLoginView
              ? 'Sign in to continue.'
              : 'Enter your details to get started.'}
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLoginView && (
              <div>
                {/* Updated label styling */}
                <label
                  htmlFor="fullName"
                  className="block text-md font-medium text-gray-700"
                >
                  Full Name
                </label>
                {/* Updated input styling */}
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  placeholder="your name"
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            )}
            <div>
              {/* Updated label styling */}
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700"
              >
                Email
              </label>
              {/* Updated input styling */}
              <input
                type="email"
                id="email"
                value={email}
                placeholder="youremail@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              {/* Updated label styling */}
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700"
              >
                Password
              </label>
              {/* Updated input styling */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Updated button styling */}
            <button
              type="submit"
              className="bg-[#C2461C] text-white py-2 px-3 rounded-lg hover:bg-[#C2461C]/80 transition text-md focus:outline-none focus:ring-4 focus:ring-[#E9743C]/50"
            >
              {isLoginView ? 'Log In' : 'Sign Up'}
            </button>

            {/* Updated error/message styling */}
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                {error}
              </p>
            )}
            {message && (
              <p className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">
                {message}
              </p>
            )}

            <p className="text-center text-sm text-gray-500 pt-2">
              {isLoginView
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  setError(null); // Clear errors on view toggle
                  setMessage(null); // Clear messages on view toggle
                }}
                // Updated link styling
                className="text-[#C2461C] hover:underline font-medium"
              >
                {isLoginView ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;