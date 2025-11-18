import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Destination,
  TravelPackage,
  ItineraryDay,
  DepartureCity,
  DestinationAttraction,
} from '@/data/destinations';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, X } from 'lucide-react';
import Head from 'next/head';

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface SelectDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
}

export const SelectDropdown = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select",
}: SelectDropdownProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full border border-gray-300 rounded-md py-2 px-3 text-left bg-white focus:outline-none focus:ring-1 focus:ring-orange-500">
            <span className="block truncate">
              {value || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-10">
            {options.map((opt, i) => (
              <Listbox.Option
                key={i}
                value={opt}
                className={({ active }) =>
                  `cursor-pointer select-none py-2 px-3 ${
                    active ? "bg-[#C2461C] text-white" : "text-gray-700"
                  }`
                }
              >
                {opt}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};


// --- "DRAFT" TYPES ---
interface DraftItineraryDay extends Omit<ItineraryDay, 'imageUrl'> {
  imageUrl: string | File;
}
interface DraftAttraction extends Omit<DestinationAttraction, 'imageUrl'> {
  imageUrl: string | File;
}
interface DraftDepartureCity extends Omit<DepartureCity, 'imageUrl'> {
  imageUrl: string | File;
}
interface DraftPackage extends Omit<TravelPackage, 'itinerary'> {
  itinerary: DraftItineraryDay[];
}
interface DraftDestination
  extends Omit<
    Destination,
    'packages' | 'attractions' | 'departureCities' | 'carouselImages'
  > {
  packages: DraftPackage[];
  attractions: DraftAttraction[];
  departureCities: DraftDepartureCity[];
  carouselImages: { src: string | File; alt: string }[];
}

// --- HELPER FUNCTIONS FOR BLANK OBJECTS ---
const createBlankPackage = (destinationId: string): DraftPackage => ({
  id: uuidv4(),
  destinationId,
  name: '',
  price: 0,
  duration: '',
  departureCity: 'Ahmedabad',
  availableDates: [],
  itinerary: [],
});

const createBlankItineraryDay = (): DraftItineraryDay => ({
  day: 1,
  title: '',
  description: '',
  imageUrl: '',
});

const createBlankAttraction = (): DraftAttraction => ({
  name: '',
  imageUrl: '',
});

const createBlankDepartureCity = (): DraftDepartureCity => ({
  name: 'Ahmedabad',
  imageUrl: '',
  price: 0,
  duration: '',
});

// --- BLANK FORM STATE ---
const blankDestination: Partial<DraftDestination> = {
  id: '',
  name: '',
  subtitle: '',
  basePrice: 0,
  category: 'Trekking',
  keyStats: { duration: '', difficulty: 'Easy', ageGroup: '', maxAltitude: '' },
  longDescription: '',
  importantUpdate: '',
  inclusions: [],
  exclusions: [],
  attractions: [],
  departureCities: [],
  packages: [],
  carouselImages: [],
  availableDates: [],
};

// --- MAIN COMPONENT ---
const AdminAddTrip = () => {
  const { user, profile, loading } = useUser();
  const router = useRouter();

  const [destination, setDestination] = useState<Partial<DraftDestination>>(
    () => {
      if (typeof window === 'undefined') {
        return blankDestination;
      }
      try {
        const savedDraft = window.localStorage.getItem('draftTrip');
        if (savedDraft) {
          console.log('Found saved draft!');
          return JSON.parse(savedDraft);
        }
      } catch (err) {
        console.error('Failed to parse draft:', err);
      }
      return blankDestination;
    }
  );

  // State for file objects
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [carouselImageFiles, setCarouselImageFiles] = useState<File[]>([]);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  // Loading/Error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('draftTrip', JSON.stringify(destination));
    }
  }, [destination]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-gray-600">Loading user...</p>
      </div>
    );
  }
  if (!user || profile?.role !== 'admin') {
    if (typeof window !== 'undefined') router.push('/');
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-gray-600">Access Denied. Redirecting...</p>
      </div>
    );
  }

  // --- FORM HANDLERS ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDestination((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyStatChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDestination((prev) => ({
      ...prev,
      keyStats: {
        ...prev.keyStats,
        [name]: value,
      } as Destination['keyStats'],
    }));
  };

  const addListItem = (key: 'inclusions' | 'exclusions', value: string) => {
    if (!value) return;
    setDestination((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), value],
    }));
  };

  const removeListItem = (key: 'inclusions' | 'exclusions', index: number) => {
    setDestination((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_, i) => i !== index),
    }));
  };

  const addDynamicItem = (
    key: 'attractions' | 'departureCities' | 'packages'
  ) => {
    let newItem: DraftAttraction | DraftDepartureCity | DraftPackage;

    if (key === 'attractions') newItem = createBlankAttraction();
    if (key === 'departureCities') newItem = createBlankDepartureCity();
    if (key === 'packages')
      newItem = createBlankPackage(destination.id || 'new-trip');

    setDestination((prev) => ({
      ...prev,
      [key]: [...((prev[key] as any[]) || []), newItem],
    }));
  };

  const removeDynamicItem = (
    key: 'attractions' | 'departureCities' | 'packages',
    index: number
  ) => {
    setDestination((prev) => ({
      ...prev,
      [key]: (prev[key] as any[] || []).filter((_, i) => i !== index),
    }));
  };

  const handleDynamicItemChange = (
    key: 'attractions' | 'departureCities',
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDestination((prev) => {
      const list = [...(prev[key] as any[])];
      list[index] = {
        ...list[index],
        [name]: name === 'price' ? parseFloat(value) : value,
      };
      return { ...prev, [key]: list };
    });
  };

  const handleDynamicFileChange = (
    key: 'attractions' | 'departureCities',
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDestination((prev) => {
        const list = [...(prev[key] as any[])];
        list[index] = { ...list[index], imageUrl: file };
        return { ...prev, [key]: list };
      });
    }
  };

  // --- NESTED HANDLERS (Packages > Itinerary) ---
  const handlePackageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDestination((prev) => {
      const packages = [...(prev.packages || [])];
      packages[index] = {
        ...packages[index],
        [name]: name === 'price' ? parseFloat(value) : value,
      };
      return { ...prev, packages };
    });
  };

  const handlePackageDateChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const dates = e.target.value.split(',').map((d) => d.trim());
    setDestination((prev) => {
      const packages = [...(prev.packages || [])];
      packages[index] = { ...packages[index], availableDates: dates };
      return { ...prev, packages };
    });
  };

  const addItineraryDay = (pkgIndex: number) => {
    const newDay = createBlankItineraryDay();
    setDestination((prev) => {
      const packages = [...(prev.packages || [])];
      const itinerary = [...(packages[pkgIndex].itinerary || [])];
      newDay.day = itinerary.length + 1;
      itinerary.push(newDay);
      packages[pkgIndex] = { ...packages[pkgIndex], itinerary };
      return { ...prev, packages };
    });
  };

  const removeItineraryDay = (pkgIndex: number, dayIndex: number) => {
    setDestination((prev) => {
      const packages = [...(prev.packages || [])];
      const itinerary = packages[pkgIndex].itinerary.filter(
        (_, i) => i !== dayIndex
      );
      itinerary.forEach((day, i) => (day.day = i + 1));
      packages[pkgIndex] = { ...packages[pkgIndex], itinerary };
      return { ...prev, packages };
    });
  };

  const handleItineraryChange = (
    pkgIndex: number,
    dayIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDestination((prev) => {
      const packages = [...(prev.packages || [])];
      const itinerary = [...packages[pkgIndex].itinerary];
      itinerary[dayIndex] = { ...itinerary[dayIndex], [name]: value };
      packages[pkgIndex] = { ...packages[pkgIndex], itinerary };
      return { ...prev, packages };
    });
  };

  const handleItineraryFileChange = (
    pkgIndex: number,
    dayIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDestination((prev) => {
        const packages = [...(prev.packages || [])];
        const itinerary = [...packages[pkgIndex].itinerary];
        itinerary[dayIndex] = { ...itinerary[dayIndex], imageUrl: file };
        packages[pkgIndex] = { ...packages[pkgIndex], itinerary };
        return { ...prev, packages };
      });
    }
  };

  // --- UPLOAD HELPER ---
  const uploadFile = async (file: File, path: string): Promise<string> => {
    const { error: uploadError } = await supabase.storage
      .from('trip-images')
      .upload(path, file);
    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
    const { data: urlData } = supabase.storage
      .from('trip-images')
      .getPublicUrl(path);
    return urlData.publicUrl;
  };

  // --- HANDLE SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.id) {
      setError('Trip ID (slug) is required.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const tripId = destination.id;
    try {
      const finalData: Destination = {
        ...destination,
      } as unknown as Destination;

      setUploadProgress('Uploading hero image...');
      if (heroImageFile) {
        const path = `destinations/${tripId}/hero-${uuidv4()}`;
        finalData.imageUrl = await uploadFile(heroImageFile, path);
      }

      setUploadProgress('Uploading carousel images...');
      if (carouselImageFiles.length > 0) {
        const carouselUrls = await Promise.all(
          carouselImageFiles.map((file, i) => {
            const path = `destinations/${tripId}/carousel-${i}-${uuidv4()}`;
            return uploadFile(file, path);
          })
        );
        finalData.carouselImages = carouselUrls.map((url, i) => ({
          src: url,
          alt: `${tripId} carousel ${i}`,
        }));
      }

      setUploadProgress('Uploading brochure...');
      if (brochureFile) {
        const path = `destinations/${tripId}/brochure-${uuidv4()}`;
        finalData.brochureUrl = await uploadFile(brochureFile, path);
      }

      setUploadProgress('Uploading attraction images...');
      const attractionPromises = (destination.attractions || []).map(
        async (attraction, i) => {
          if (attraction.imageUrl instanceof File) {
            const path = `destinations/${tripId}/attraction-${i}-${uuidv4()}`;
            const url = await uploadFile(attraction.imageUrl, path);
            return { ...attraction, imageUrl: url };
          }
          return attraction as DestinationAttraction;
        }
      );
      finalData.attractions = await Promise.all(attractionPromises);

      setUploadProgress('Uploading city images...');
      const cityPromises = (destination.departureCities || []).map(
        async (city, i) => {
          if (city.imageUrl instanceof File) {
            const path = `destinations/${tripId}/city-${i}-${uuidv4()}`;
            const url = await uploadFile(city.imageUrl, path);
            return { ...city, imageUrl: url };
          }
          return city as DepartureCity;
        }
      );
      finalData.departureCities = await Promise.all(cityPromises);

      setUploadProgress('Uploading itinerary images...');
      const packagePromises = (destination.packages || []).map(
        async (pkg, pkgIndex) => {
          const itineraryPromises = pkg.itinerary.map(async (day, dayIndex) => {
            if (day.imageUrl instanceof File) {
              const path = `destinations/${tripId}/pkg-${
                pkg.id
              }/day-${day.day}-${uuidv4()}`;
              const url = await uploadFile(day.imageUrl, path);
              return { ...day, imageUrl: url };
            }
            return day as ItineraryDay;
          });
          const newItinerary = await Promise.all(itineraryPromises);
          return { ...pkg, itinerary: newItinerary };
        }
      );
      finalData.packages = await Promise.all(packagePromises);

      setUploadProgress('Saving to database...');
      finalData.shortDescription =
        finalData.longDescription?.substring(0, 100) + '...' || '';

      const { error: insertError } = await supabase.from('destinations').insert({
        id: finalData.id!,
        name: finalData.name,
        category: finalData.category,
        basePrice: finalData.basePrice,
        data: finalData as unknown as Destination,
      });
      if (insertError) throw insertError;

      setUploadProgress(null);
      setIsLoading(false);
      window.localStorage.removeItem('draftTrip');
      router.push('/admin');
    } catch (error: any) {
      console.error('Error creating trip:', error);
      setError(error.message);
      setUploadProgress(null);
      setIsLoading(false);
    }
  };

  const getFileName = (file: File | string) => {
    if (file instanceof File) return file.name;
    if (typeof file === 'string' && file.length > 0)
      return 'Uploaded (URL)';
    return 'No file selected';
  };

  // --- JSX ---
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Head>
        <title>Add New Trip</title>
      </Head>
      <Header />
      <div className="h-[65vh] bg-[url('/images/home1.jpg')] w-full bg-cover -top-15 relative bg-center flex flex-col justify-center items-center text-white px-4">
        <div className="max-w-6xl w-full px-6">
          <h1 className="text-4xl font-bold text-[#C2461C]">
            Add New Trip
          </h1>
          <p className="mt-4 text-lg text-white">
            Create and manage exciting travel experiences for your users.
          </p>
        </div>
      </div>
      <main className="container max-w-6xl mx-auto px-6 -mt-7 pb-6 flex-grow">
        <h1 className="text-3xl font-bold text-[#C2461C] mb-8">
          Create a New Trip 
        </h1>
        <form onSubmit={handleSubmit} className="space-y-0">
          <fieldset className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 space-y-6 mb-8">
            <legend className="text-2xl font-semibold mb-4 text-[#C2461C]">
              Main Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="id"
                  className="block text-md font-medium text-gray-700"
                >
                  Trip ID (slug)
                </label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={destination.id || ''}
                  placeholder="e.g., 'kerala-calling'"
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
                  value={destination.name || ''}
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
                  value={destination.subtitle || ''}
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
                  Base Price
                </label>
                <input
                  type="number"
                  name="basePrice"
                  id="basePrice"
                  value={destination.basePrice || 0}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700">Category</label>

                <Listbox
                  value={destination.category}
                  onChange={(value) =>
                    handleChange({ target: { name: "category", value } } as any)
                  }
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-left bg-white focus:outline-none focus:ring-1 focus:ring-orange-500">
                      <span>{destination.category || "Select Category"}</span>
                      <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </Listbox.Button>

                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
                      {["Trekking", "Mountain", "Beach", "Historical", "City", "Adventure"].map(
                        (cat) => (
                          <Listbox.Option
                            key={cat}
                            value={cat}
                            className={({ active }) =>
                              `px-3 py-2 cursor-pointer ${
                                active ? "bg-[#C2461C] text-white" : "text-gray-700"
                              }`
                            }
                          >
                            {cat}
                          </Listbox.Option>
                        )
                      )}
                    </Listbox.Options>
                  </div>
                </Listbox>

              </div>
              <div>
                <label
                  htmlFor="bestTimeToVisit"
                  className="block text-md font-medium text-gray-700"
                >
                  Best Time to Visit
                </label>
                <input
                  type="text"
                  name="bestTimeToVisit"
                  id="bestTimeToVisit"
                  value={destination.bestTimeToVisit || ''}
                  placeholder="e.g., 'September to March'"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
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
                value={destination.longDescription || ''}
                rows={5}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="importantUpdate"
                className="block text-md font-medium text-gray-700"
              >
                Important Update
              </label>
              <input
                type="text"
                name="importantUpdate"
                id="importantUpdate"
                value={destination.importantUpdate || ''}
                placeholder="e.g., 'WhatsApp us for flights...'"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </fieldset>

          <fieldset className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 space-y-4 mb-8">
            <legend className="text-2xl font-semibold mb-4 text-[#C2461C]">
              Key Stats
            </legend>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label
                  htmlFor="duration"
                  className="block text-md font-medium text-gray-700"
                >
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={destination.keyStats?.duration || ''}
                  placeholder="e.g., '6 days / 5 nights'"
                  onChange={handleKeyStatChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-md font-medium text-gray-700"
                >
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  id="difficulty"
                  value={destination.keyStats?.difficulty}
                  onChange={handleKeyStatChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
                >
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="ageGroup"
                  className="block text-md font-medium text-gray-700"
                >
                  Age Group
                </label>
                <input
                  type="text"
                  name="ageGroup"
                  id="ageGroup"
                  value={destination.keyStats?.ageGroup || ''}
                  placeholder="e.g., '8-40 years'"
                  onChange={handleKeyStatChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="maxAltitude"
                  className="block text-md font-medium text-gray-700"
                >
                  Max Altitude
                </label>
                <input
                  type="text"
                  name="maxAltitude"
                  id="maxAltitude"
                  value={destination.keyStats?.maxAltitude || ''}
                  placeholder="e.g., '6,100 ft'"
                  onChange={handleKeyStatChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 space-y-4 mb-8">
            <legend className="text-2xl font-semibold mb-4 text-[#C2461C]">
              Images & Files
            </legend>
            <div>
              <label
                htmlFor="heroImage"
                className="block text-md font-medium text-gray-700"
              >
                Main Hero Image (Old `imageUrl`)
              </label>
              <input
                type="file"
                name="heroImage"
                id="heroImage"
                onChange={(e) =>
                  setHeroImageFile(e.target.files ? e.target.files[0] : null)
                }
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#C2461C] hover:file:bg-orange-100"
              />
            </div>
            <div>
              <label
                htmlFor="carouselImages"
                className="block text-md font-medium text-gray-700"
              >
                Carousel Images (Multiple)
              </label>
              <input
                type="file"
                name="carouselImages"
                id="carouselImages"
                onChange={(e) =>
                  setCarouselImageFiles(Array.from(e.target.files || []))
                }
                multiple
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#C2461C] hover:file:bg-orange-100"
              />
            </div>
            <div>
              <label
                htmlFor="brochureFile"
                className="block text-md font-medium text-gray-700"
              >
                Brochure (PDF)
              </label>
              <input
                type="file"
                name="brochureFile"
                id="brochureFile"
                onChange={(e) =>
                  setBrochureFile(e.target.files ? e.target.files[0] : null)
                }
                accept="application/pdf"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#C2461C] hover:file:bg-orange-100"
              />
            </div>
          </fieldset>

          <fieldset className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 space-y-4 mb-8">
            <legend className="text-2xl font-semibold mb-4 text-[#C2461C]">
              Inclusions & Exclusions
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DynamicListInput
                title="Inclusions"
                items={destination.inclusions || []}
                onAdd={(value) => addListItem('inclusions', value)}
                onRemove={(i) => removeListItem('inclusions', i)}
              />
              <DynamicListInput
                title="Exclusions"
                items={destination.exclusions || []}
                onAdd={(value) => addListItem('exclusions', value)}
                onRemove={(i) => removeListItem('exclusions', i)}
              />
            </div>
          </fieldset>

          <fieldset className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 space-y-4 mb-8">
            <legend className="text-2xl font-semibold mb-4 text-[#C2461C]">
              Attractions
            </legend>
            {(destination.attractions || []).map((attraction, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-[#C2461C]/30 border-2 rounded-md relative"
              >
                <input
                  type="text"
                  name="name"
                  value={attraction.name}
                  onChange={(e) => handleDynamicItemChange('attractions', index, e)}
                  placeholder="Attraction Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="file"
                  name="imageUrl"
                  onChange={(e) =>
                    handleDynamicFileChange('attractions', index, e)
                  }
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#C2461C] hover:file:bg-orange-100"
                />
                <p className="text-xs text-gray-500 md:col-span-2">
                  {getFileName(attraction.imageUrl)}
                </p>
                <button
                  type="button"
                  onClick={() => removeDynamicItem('attractions', index)}
                  className="absolute -top-3 -right-3 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicItem('attractions')}
              className="text-sm font-medium text-[#C2461C] hover:text-[#C2461C]/80"
            >
              + Add Attraction
            </button>
          </fieldset>

          <fieldset className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 space-y-4 mb-8">
            <legend className="text-2xl font-semibold mb-4 text-[#C2461C]">
              Departure Cities
            </legend>
            {(destination.departureCities || []).map((city, index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border  border-[#C2461C]/30 border-2rounded-md relative"
              >
                <input
                  type="text"
                  name="name"
                  value={city.name}
                  onChange={(e) =>
                    handleDynamicItemChange('departureCities', index, e)
                  }
                  placeholder="City Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="number"
                  name="price"
                  value={city.price}
                  onChange={(e) =>
                    handleDynamicItemChange('departureCities', index, e)
                  }
                  placeholder="Price"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="text"
                  name="duration"
                  value={city.duration}
                  onChange={(e) =>
                    handleDynamicItemChange('departureCities', index, e)
                  }
                  placeholder="Duration"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="file"
                  name="imageUrl"
                  onChange={(e) =>
                    handleDynamicFileChange('departureCities', index, e)
                  }
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#C2461C] hover:file:bg-orange-100"
                />
                <p className="text-xs text-gray-500 md:col-span-4">
                  {getFileName(city.imageUrl)}
                </p>
                <button
                  type="button"
                  onClick={() => removeDynamicItem('departureCities', index)}
                  className="absolute -top-3 -right-3 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicItem('departureCities')}
              className="text-sm font-medium text-[#C2461C] hover:text-[#C2461C]/80"
            >
              + Add Departure City
            </button>
          </fieldset>

          <fieldset className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 space-y-4 mb-8">
            <legend className="text-2xl font-semibold mb-4 text-[#C2461C]">
              Travel Packages
            </legend>
            {(destination.packages || []).map((pkg, pkgIndex) => (
              <div
                key={pkg.id}
                className="p-4 border-2 border-[#C2461C]/30 rounded-lg space-y-4 relative"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Package {pkgIndex + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(pkgIndex, e)}
                    placeholder="Package Name (e.g., 'Non AC Sleeper')"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <input
                    type="number"
                    name="price"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(pkgIndex, e)}
                    placeholder="Package Price"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <input
                    type="text"
                    name="duration"
                    value={pkg.duration}
                    onChange={(e) => handlePackageChange(pkgIndex, e)}
                    placeholder="Package Duration"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium text-gray-700">
                    Departure City
                  </label>
                  <select
                    name="departureCity"
                    value={pkg.departureCity}
                    onChange={(e) => handlePackageChange(pkgIndex, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  >
                    <option>Ahmedabad</option>
                    <option>Kochi</option>
                    <option>Mumbai</option>
                    <option>Baroda/Surat</option>
                    <option>Polo Forest</option>
                    <option>Delhi</option>
                    <option>Chandigarh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-md font-medium text-gray-700">
                    Available Dates (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="availableDates"
                    value={pkg.availableDates.join(', ')}
                    onChange={(e) => handlePackageDateChange(pkgIndex, e)}
                    placeholder="e.g., Sep 26 - Oct 3, Oct 3 - Oct 10"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="p-4 border border-gray-300 rounded-md space-y-3">
                  <h4 className="text-md font-semibold text-gray-700">
                    Itinerary for this Package
                  </h4>
                  {(pkg.itinerary || []).map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="p-3 bg-slate-50 rounded-md space-y-2 relative"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        Day {dayIndex + 1}
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={day.title}
                        onChange={(e) =>
                          handleItineraryChange(pkgIndex, dayIndex, e)
                        }
                        placeholder="Day Title (e.g., 'Arrive in Kochi')"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <textarea
                        name="description"
                        value={day.description}
                        onChange={(e) =>
                          handleItineraryChange(pkgIndex, dayIndex, e)
                        }
                        placeholder="Day Description..."
                        rows={2}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <input
                        type="file"
                        name="imageUrl"
                        onChange={(e) =>
                          handleItineraryFileChange(pkgIndex, dayIndex, e)
                        }
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#C2461C] hover:file:bg-orange-100"
                      />
                      <p className="text-xs text-gray-500">
                        {getFileName(day.imageUrl)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItineraryDay(pkgIndex, dayIndex)}
                        className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItineraryDay(pkgIndex)}
                    className="text-sm font-medium text-[#C2461C] hover:text-[#C2461C]/80"
                  >
                    + Add Itinerary Day
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeDynamicItem('packages', pkgIndex)}
                  className="absolute -top-3 -right-3 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicItem('packages')}
              className="text-sm font-medium text-[#C2461C] hover:text-[#C2461C]/80"
            >
              + Add Package
            </button>
          </fieldset>

          <div className="flex flex-col">
            {uploadProgress && (
              <p className="text-gray-600 font-medium mb-2">
                {uploadProgress}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md mb-4 w-full max-w-md">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-md bg-[#C2461C] text-white font-bold py-3 px-3 rounded-lg hover:bg-[#C2461C]/80 transition text-md focus:outline-none focus:ring-4 focus:ring-[#E9743C]/50 disabled:bg-gray-400"
            >
              {isLoading ? 'SAVING...' : 'SAVE AND PUBLISH TRIP'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

// --- HELPER COMPONENT FOR INCLUSIONS/EXCLUSIONS ---
interface DynamicListInputProps {
  title: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}

const DynamicListInput: React.FC<DynamicListInputProps> = ({
  title,
  items,
  onAdd,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue(''); // Clear input after adding
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-md font-medium text-gray-700">{title}</label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              readOnly
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Add new ${title.slice(0, -1).toLowerCase()}`}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="p-2 bg-[#C2461C] text-white rounded-md hover:bg-[#C2461C]/80 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdminAddTrip;