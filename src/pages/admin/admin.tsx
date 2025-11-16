import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const AdminDashboard = () => {
  const { user, profile, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return <div>Loading user...</div>;
  }

  // Gatekeeper logic
  if (!user) {
    router.push('/auth'); // Not logged in, send to login page
    return <div>Redirecting...</div>;
  }
  
  if (profile?.role !== 'admin') {
    router.push('/'); // Not an admin, send to home page
    return <div>Access Denied.</div>;
  }

  // If we are here, the user is an admin
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-lg">Welcome, {profile.full_name}.</p>
        
        <div className="mt-8">
          <Link href="/admin/add-trip" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600">
            + Add New Trip
          </Link>
        </div>
        
        {/* We can add a list of existing trips to edit here later */}
        
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;