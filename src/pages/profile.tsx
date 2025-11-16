import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

const ProfilePage = () => {
  const { user, profile, loading } = useUser();
  const [fullName, setFullName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    setMessage('');
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Profile updated successfully!');
    }
    setIsUpdating(false);
  };

  if (loading) {
    return <div>Loading...</div>; // You can make this a nicer spinner
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold">Please log in</h1>
          <p>You must be logged in to view this page.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>My Profile - TravelBuddy</title>
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email || ''}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </button>
            {message && (
              <p className="text-center text-sm">{message}</p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;