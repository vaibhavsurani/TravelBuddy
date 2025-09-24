import { useState } from 'react';
import { useRouter } from 'next/router';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Destination, TravelPackage } from '@/data/destinations';

interface BookingFlowModalProps {
  destination: Destination;
  onClose: () => void;
}

const departureCities: TravelPackage['departureCity'][] = ['Ahmedabad', 'Kochi', 'Mumbai', 'Baroda/Surat'];

const BookingFlowModal = ({ destination, onClose }: BookingFlowModalProps) => {
  const router = useRouter();
  const [step, setStep] = useState<'package' | 'date'>('package');
  const [selectedCity, setSelectedCity] = useState<TravelPackage['departureCity']>('Ahmedabad');
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);

  const filteredPackages = destination.packages.filter(p => p.departureCity === selectedCity);

  const handlePackageSelect = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setStep('date');
  };

  const handleDateSelect = (date: string) => {
  if (!selectedPackage) return;
  // Navigate to the signup page with the booking details
  router.push(`/signup?destinationId=${destination.id}&packageId=${selectedPackage.id}&date=${encodeURIComponent(date)}`);
};

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-2xl w-full max-w-lg transform transition-all duration-300 h-[90vh]">
        <div className="relative">
          
          
          {step === 'package' && (
            <div>
              {/* Header Section */}
              <div className="px-4 py-5 border-b border-gray-300 flex justify-between items-center">
                <h2 className="text-md font-normal text-gray-800">Select Package</h2>
                {/* The close button is outside this snippet, but would be here */}
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 z-10">
                  <X size={20} />
                </button>
              </div>

              {/* Departure City Selection */}
              <div className="px-4 py-5"> {/* Added px-1 for slight internal padding consistency */}
                <p className="text-sm text-gray-700 font-medium mb-2">Join us from</p>
                <div className="flex flex-wrap gap-2">
                  {departureCities.map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`
                        ml-2 px-2 py-1 font-normal rounded-sm text-sm transition-colors duration-300
                        ${selectedCity === city 
                          ? 'bg-[#C2461C] text-white shadow-md focus:outline-none focus:ring-3 focus:ring-[#E9743C]/50' // Darker orange for selected, with shadow
                          : 'bg-white text-orange-600 border hover:bg-orange-600 hover:text-white' // Lighter hover
                        }
                      `}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

          {/* Packages List */}
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {filteredPackages.length > 0 ? filteredPackages.map(pkg => (
              <div
                key={pkg.id}
                onClick={() => handlePackageSelect(pkg)}
                className={`
                  relative flex items-center bg-white rounded-lg p-3 ml-2 cursor-pointer transition-all duration-200
                  shadow-sm hover:shadow-md 
                  ${selectedPackage?.id === pkg.id ? 'border-2 border-orange-600' : 'border border-gray-200 hover:bg-gray-100'}
                `}
              >
                {/* Package Image Placeholder */}
                <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0 overflow-hidden">
                  {/* You would typically load an image here, e.g., <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover"/> */}
                  {/* For now, a placeholder to match the visual structure */}
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://via.placeholder.com/64?text=IMG')` }}></div>
                </div>

                {/* Package Details */}
                <div className="flex-grow">
                  <h3 className="text-base font-medium text-gray-800 mb-1">{pkg.name}</h3>
                  <p className="text-xs text-gray-500">₹{pkg.price.toLocaleString()}</p>
                </div>

                {/* Duration */}
                <div className="text-right flex-shrink-0 ml-4 mt-6">
                  <p className="text-gray-500 text-sm">
                      <span className="inline-flex items-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {/* Assuming duration already formatted as "X days / Y nights" from pkg.duration */}
                          {pkg.duration} 
                      </span>
                  </p>
                </div>
                {/* Arrow is implicitly handled by the hover state on the item itself, but can be added explicitly if needed */}
              </div>
            )) : (
              <p className="text-center text-gray-500 py-8">No packages available from {selectedCity}.</p>
            )}
          </div>
        </div>
      )}

          {step === 'date' && selectedPackage && (
            <div>
              {/* Header Section */}
              <div className="px-4 py-5 border-b border-gray-300 flex justify-between items-center">
                <h2 className="text-md font-normal text-gray-800">Select Date</h2>
                <button 
                  onClick={() => setStep('package')} 
                  className="mr-1 mb-1 rounded-full  transition-colors"
                  aria-label="Back to packages"
                >
                  <ArrowLeft size={20} className="text-gray-400 hover:text-gray-500" />
                </button>
              </div>

              {/* Subtitle showing the selected package */}
              <p className="text-sm text-gray-500 my-4 px-4">
                From <span className="font-semibold text-[#C2461C]">{selectedPackage.departureCity}</span>
              </p>

              {/* Dates List */}
              <div className="overflow-y-auto custom-scrollbar">
                {selectedPackage.availableDates.map((date, index) => (
                  <div 
                    key={date} 
                    onClick={() => handleDateSelect(date)} 
                    className={`
                      flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors
                      ${index < selectedPackage.availableDates.length - 1 ? 'border-b border-gray-200' : ''}
                    `}
                  >
                    <p className="font-medium text-gray-700 text-base">{date}</p>
                    <ArrowRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlowModal;
