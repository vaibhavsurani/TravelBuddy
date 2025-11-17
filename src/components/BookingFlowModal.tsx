import { useState } from 'react';
import { useRouter } from 'next/router'; // <-- RE-ADDED useRouter
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Destination, TravelPackage } from '@/data/destinations';

interface BookingFlowModalProps {
  destination: Destination;
  onClose: () => void;
  // --- REMOVED onDateSelect prop ---
}

const BookingFlowModal = ({ destination, onClose }: BookingFlowModalProps) => {
  const router = useRouter(); // <-- RE-ADDED
  
  const departureCities = destination.departureCities.map(city => city.name);

  const [step, setStep] = useState<'package' | 'date'>('package');
  
  const [selectedCity, setSelectedCity] = useState<TravelPackage['departureCity']>(
    (departureCities[0] || '') as TravelPackage['departureCity']
  );

  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);

  const filteredPackages = destination.packages.filter(p => p.departureCity === selectedCity);

  const handlePackageSelect = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setStep('date');
  };

  // --- REVERTED to original router.push logic ---
  const handleDateSelect = (date: string) => {
    if (!selectedPackage) return;
    // This will now navigate directly to the register page
    router.push(`/register?destinationId=${destination.id}&packageId=${selectedPackage.id}&date=${encodeURIComponent(date)}`);
  };

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-2xl w-full max-w-lg transform transition-all duration-300 h-[90vh] rounded-lg overflow-hidden">
        <div className="relative h-full flex flex-col">
          
          {step === 'package' && (
            <div className="flex flex-col h-full">
              {/* Header Section */}
              <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                <h2 className="text-lg font-medium text-gray-800">Select Package</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                  <X size={24} />
                </button>
              </div>

              {/* Departure City Selection */}
              <div className="px-4 py-5 flex-shrink-0">
                <p className="text-sm text-gray-700 font-medium mb-3">Join us from</p>
                <div className="flex flex-wrap gap-2">
                  {departureCities.map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city as TravelPackage['departureCity'])}
                      className={`
                        px-3 py-1.5 font-normal rounded-md text-sm transition-colors duration-200 border
                        ${selectedCity === city
                          ? 'bg-[#C2461C] text-white border-[#C2461C] shadow'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500 hover:text-orange-600'
                        }
                      `}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Packages List */}
              <div className="flex-grow space-y-3 p-4 pt-0 overflow-y-auto custom-scrollbar">
                {filteredPackages.length > 0 ? filteredPackages.map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg)}
                    className={`
                      relative flex items-center bg-white rounded-lg p-3 cursor-pointer transition-all duration-200
                      shadow-sm hover:shadow-lg hover:border-orange-500
                      ${selectedPackage?.id === pkg.id ? 'border-2 border-orange-500' : 'border border-gray-200'}
                    `}
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-md mr-4 flex-shrink-0 overflow-hidden">
                       <img src={pkg.itinerary[1]?.imageUrl as string || '/images/placeholder.jpg'} alt={pkg.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-base font-medium text-gray-800 mb-1">{pkg.name}</h3>
                      <p className="text-sm font-semibold text-gray-700">₹{pkg.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4 self-end">
                      <p className="text-gray-500 text-xs inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {pkg.duration}
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-gray-500 py-8">No packages available from {selectedCity}.</p>
                )}
              </div>
            </div>
          )}

          {step === 'date' && selectedPackage && (
            <div className="flex flex-col h-full">
              {/* Header Section */}
              <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                <h2 className="text-lg font-medium text-gray-800">Select Date</h2>
                <button onClick={() => setStep('package')} aria-label="Back to packages" className="p-1 rounded-full hover:bg-gray-100">
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Subtitle showing the selected package */}
              <p className="text-sm text-gray-600 my-4 px-4 flex-shrink-0">
                From <span className="font-semibold text-[#C2461C]">{selectedPackage.departureCity}</span>
              </p>

              {/* Dates List */}
              <div className="flex-grow overflow-y-auto custom-scrollbar border-t border-gray-200">
                {selectedPackage.availableDates.map((date, index) => (
                  <div
                    key={date}
                    onClick={() => handleDateSelect(date)}
                    className={`
                      flex justify-between items-center p-4 cursor-pointer hover:bg-orange-50/50 transition-colors
                      ${index < selectedPackage.availableDates.length - 1 ? 'border-b border-gray-200' : ''}
                    `}
                  >
                    <p className="font-medium text-gray-700 text-sm">{date}</p>
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