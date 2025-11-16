import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Users, Plus, ClipboardList } from 'lucide-react';
import Head from 'next/head'; // Added Head for title

const AdminDashboard = () => {
  const { user, profile, loading } = useUser();
  const router = useRouter();

  // State for stats
  const [stats, setStats] = useState({ users: 0, bookings: 0 });

  useEffect(() => {
    // This function fetches counts from Supabase
    const fetchStats = async () => {
      // We use 'count: "exact"' to get the total count
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: bookingCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });

      setStats({ users: userCount || 0, bookings: bookingCount || 0 });
    };

    if (profile?.role === 'admin') {
      fetchStats();
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-gray-600">Loading user...</p>
      </div>
    );
  }

  // Gatekeeper logic: If not admin, redirect
  if (profile?.role !== 'admin') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-gray-600">Access Denied. Redirecting...</p>
      </div>
    );
  }

  // If we are here, the user is an admin
  return (
    // Updated background
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Header />
        <div className="bg-[#C2461C] py-6 h-[60vh] flex items-center -top-15 relative">
          <div className="max-w-6xl container mx-auto px-6">
              <h1 className="text-3xl font-semibold text-white">Details</h1>
          </div>
        </div>
      {/* Updated padding and flex-grow */}
      <main className="container mx-auto px-6 pb-12 flex-grow max-w-6xl">
        {/* Updated title styling */}
        <h1 className="text-3xl font-bold text-[#C2461C]">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Welcome, {profile.full_name}.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Updated card styling */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex items-center">
            {/* Updated icon styling */}
            <div className="bg-[#C2461C]/10 p-3 rounded-full">
              <Users className="h-10 w-10 text-[#C2461C]" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex items-center">
            <div className="bg-[#C2461C]/10 p-3 rounded-full">
              <ClipboardList className="h-10 w-10 text-[#C2461C]" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.bookings}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#C2461C] mb-6">Manage Site</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/add-trip"
              // Updated card and hover styling
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:bg-[#C2461C]/5 transition-shadow flex flex-col items-center justify-center text-center"
            >
              <Plus className="h-12 w-12 text-[#C2461C] mb-2" />
              <p className="text-xl font-semibold text-gray-800">
                Add New Trip
              </p>
              <p className="text-sm text-gray-600">
                Create a new destination package
              </p>
            </Link>

            <Link
              href="/admin/bookings"
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:bg-[#C2461C]/5 transition-shadow flex flex-col items-center justify-center text-center"
            >
              <ClipboardList className="h-12 w-12 text-[#C2461C] mb-2" />
              <p className="text-xl font-semibold text-gray-800">
                View All Bookings
              </p>
              <p className="text-sm text-gray-600">
                See all user registrations
              </p>
            </Link>

            {/* You can add more cards here, e.g., "Edit Trip" */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;