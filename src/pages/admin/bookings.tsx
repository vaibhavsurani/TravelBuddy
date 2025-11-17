import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

// Define the type for a booking
interface Booking {
  id: string;
  created_at: string;
  destination_id: string;
  package_id: string;
  selected_date: string;
  participant_count: number;
  profiles: {
    full_name: string;
    email: string;
  }[];
}

const AdminBookings = () => {
  const { user, profile, loading } = useUser();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('bookings')
        .select(
          `
          id,
          created_at,
          destination_id,
          package_id,
          selected_date,
          participant_count,
          user_id,
          profiles:profiles!bookings_user_id_fkey (
            full_name,
            email
          )
        `
        )
        .order('created_at', { ascending: false });

      if (data) {
        setBookings(data as Booking[]);
      }
      if (error) {
        console.error('Error fetching bookings:', error);
      }
      setIsLoading(false);
    };

    if (profile?.role === 'admin') {
      fetchBookings();
    }
  }, [profile]);

  // Updated Loading Skeletons
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-gray-600">Loading user...</p>
      </div>
    );
  }

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

  return (
    // Updated background
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Head>
        <title>All Bookings</title>
      </Head>
      <Header />
        <div className="bg-[#C2461C] py-6 h-[60vh] flex items-center -top-15 relative">
          <div className="max-w-6xl container mx-auto px-6">
              <h1 className="text-3xl font-semibold text-white">Trip Bookings</h1>
          </div>
        </div>
      {/* Updated padding and flex-grow */}
      <main className="container mx-auto px-6 -mt-7 pb-12 flex-grow max-w-6xl">
        {/* Updated title styling */}
        <h1 className="text-3xl font-bold text-[#C2461C] mb-6">
          All User Bookings
        </h1>

        {/* Updated card styling */}
        <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-x-auto">
          {isLoading ? (
            <p className="p-6 text-center text-gray-600">Loading bookings...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              {/* Updated table header styling */}
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Booked On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#C2461C]/5">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.profiles && booking.profiles.length > 0 ? (
                          <>
                            <div className="text-sm font-medium text-gray-800">
                              {booking.profiles[0].full_name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {booking.profiles[0].email}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-gray-600">
                            User not found
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800">
                          {booking.destination_id}
                        </div>
                        <div className="text-sm text-gray-600">
                          Pkg ID: {booking.package_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {booking.selected_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">
                        {booking.participant_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminBookings;