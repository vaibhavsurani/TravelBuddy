import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Destination } from '@/data/destinations'; // Import your data types
import { v4 as uuidv4 } from 'uuid'; // Import uuid to create unique file names
import Head from 'next/head'; // Added Head

const AdminAddTrip = () => {
  const { user, profile, loading } = useUser();
  const router = useRouter();

  const [tripData, setTripData] = useState<Partial<Destination>>({
    id: '',
    name: '',
    subtitle: '',
    basePrice: 0,
    category: 'Trekking',
    keyStats: {
      duration: '',
      difficulty: 'Easy',
      ageGroup: '',
      maxAltitude: '',
    },
    longDescription: '',
    importantUpdate: '',
    inclusions: [],
    exclusions: [],
    attractions: [],
    departureCities: [],
    packages: [],
  });

  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-gray-600">Loading user...</p>
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-gray-600">Access Denied. Redirecting...</p>
      </div>
    );
  }

  // Handle simple text changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle nested keyStats
    if (name.startsWith('keyStats.')) {
      const key = name.split('.')[1];
      setTripData((prev) => ({
        ...prev,
        keyStats: {
          ...prev.keyStats,
          [key]: value,
        } as Destination['keyStats'],
      }));
    } else {
      setTripData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHeroImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroImage || !tripData.id) {
      setError('Trip ID and Hero Image are required.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // 1. Upload the Hero Image
      const fileExt = heroImage.name.split('.').pop();
      const fileName = `${tripData.id}-hero-${uuidv4()}.${fileExt}`;
      const filePath = `destinations/${tripData.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('trip-images') // Your bucket name
        .upload(filePath, heroImage);

      if (uploadError) throw uploadError;

      // 2. Get the public URL for the uploaded image
      const { data: urlData } = supabase.storage
        .from('trip-images')
        .getPublicUrl(filePath);

      const publicHeroUrl = urlData.publicUrl;

      // 3. Prepare the final JSON data object
      const finalData: Destination = {
        ...tripData,
        id: tripData.id!,
        name: tripData.name!,
        imageUrl: publicHeroUrl,
        shortDescription:
          tripData.longDescription?.substring(0, 100) + '...' || '',
        carouselImages: [{ src: publicHeroUrl, alt: tripData.name! }],
        availableDates: [],
        packages: [],
        attractions: [],
        departureCities: [],
      } as Destination;

      // 4. Insert into the database
      const { error: insertError } = await supabase.from('destinations').insert({
        id: finalData.id,
        name: finalData.name,
        category: finalData.category,
        basePrice: finalData.basePrice,
        data: finalData, // Store the entire object in the JSONB column
      });

      if (insertError) throw insertError;

      // 5. Success!
      setIsUploading(false);
      router.push('/admin'); // Redirect back to admin dashboard
    } catch (error: any) {
      console.error('Error creating trip:', error);
      setError(error.message);
      setIsUploading(false);
    }
  };

  return (
    // Updated background
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Head>
        <title>Admin: Add New Trip</title>
      </Head>
      <Header />
        <div className="bg-[#C2461C] py-6 h-[60vh] flex items-center -top-15 relative">
          <div className="max-w-6xl container mx-auto px-6">
              <h1 className="text-3xl font-semibold text-white">New Trip</h1>
          </div>
        </div>
      {/* Updated padding and flex-grow */}
      <main className="container mx-auto px-6 pb-12 flex-grow max-w-6xl">
        {/* Updated title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#C2461C] mb-6">
          Add New Trip
        </h1>
        {/* Updated form card */}
        <form
          onSubmit={handleSubmit}
          className=" mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6"
        >
          <div>
            {/* Updated label */}
            <label
              htmlFor="id"
              className="block text-md font-medium text-gray-700"
            >
              Trip ID (Unique Slug)
            </label>
            {/* Updated input */}
            <input
              type="text"
              name="id"
              id="id"
              placeholder="e.g., 'kerala-calling' or 'manali-trek'"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700"
            >
              Trip Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g., 'Kerala Calling'"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="subtitle"
              className="block text-md font-medium text-gray-700"
            >
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              id="subtitle"
              placeholder="e.g., 'Venice of the East!'"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="basePrice"
              className="block text-md font-medium text-gray-700"
            >
              Base Price (e.g., 9999)
            </label>
            <input
              type="number"
              name="basePrice"
              id="basePrice"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-md font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              defaultValue="Trekking"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              <option>Trekking</option>
              <option>Mountain</option>
              <option>Beach</option>
              <option>Historical</option>
              <option>City</option>
              <option>Adventure</option>
            </select>
          </div>

          {/* Key Stats */}
          <fieldset className="border border-gray-300 p-4 rounded-md">
            <legend className="font-medium text-gray-700 px-1">
              Key Stats
            </legend>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label
                  htmlFor="keyStats.duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration
                </label>
                <input
                  type="text"
                  name="keyStats.duration"
                  id="keyStats.duration"
                  placeholder="e.g., '6 days / 5 nights'"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="keyStats.difficulty"
                  className="block text-sm font-medium text-gray-700"
                >
                  Difficulty
                </label>
                <select
                  name="keyStats.difficulty"
                  id="keyStats.difficulty"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
                >
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="keyStats.ageGroup"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age Group
                </label>
                <input
                  type="text"
                  name="keyStats.ageGroup"
                  id="keyStats.ageGroup"
                  placeholder="e.g., '8-40 years'"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="keyStats.maxAltitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Altitude
                </label>
                <input
                  type="text"
                  name="keyStats.maxAltitude"
                  id="keyStats.maxAltitude"
                  placeholder="e.g., '6,100 ft'"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="longDescription"
              className="block text-md font-medium text-gray-700"
            >
              About (Long Description)
            </label>
            <textarea
              name="longDescription"
              id="longDescription"
              rows={5}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="heroImage"
              className="block text-md font-medium text-gray-700"
            >
              Main Hero Image
            </label>
            {/* This file input is already styled well, keeping it */}
            <input
              type="file"
              name="heroImage"
              id="heroImage"
              onChange={handleImageChange}
              required
              accept="image/png, image/jpeg, image/webp"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
            />
          </div>

          {/* Updated error styling */}
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </p>
          )}

          <div>
            {/* Updated button styling */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-[#C2461C] text-white font-bold py-3 px-3 rounded-lg hover:bg-[#C2461C]/80 transition text-md focus:outline-none focus:ring-4 focus:ring-[#E9743C]/50 disabled:bg-gray-400"
            >
              {isUploading ? 'Saving...' : 'Save New Trip'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AdminAddTrip;