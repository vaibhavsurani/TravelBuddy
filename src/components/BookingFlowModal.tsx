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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all duration-300">
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
            <X size={24} />
          </button>
          
          {step === 'package' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Package for {destination.name}</h2>
              <p className="text-gray-600 mb-4">First, select your departure city:</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {departureCities.map(city => (
                  <button 
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${selectedCity === city ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {filteredPackages.length > 0 ? filteredPackages.map(pkg => (
                  <div key={pkg.id} onClick={() => handlePackageSelect(pkg)} className="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="font-bold text-lg">{pkg.name}</h3>
                      <p className="text-gray-500 text-sm">{pkg.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-blue-600">₹{pkg.price.toLocaleString()}</p>
                      <span className="text-sm text-gray-500 flex items-center gap-1">Select <ArrowRight size={14}/></span>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-gray-500 py-8">No packages available from {selectedCity}.</p>
                )}
              </div>
            </div>
          )}

          {step === 'date' && selectedPackage && (
            <div>
              <button onClick={() => setStep('package')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4">
                <ArrowLeft size={16} /> Back to Packages
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Date</h2>
              <p className="text-gray-600 mb-6">For package: <span className="font-semibold">{selectedPackage.name}</span></p>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {selectedPackage.availableDates.map(date => (
                  <div key={date} onClick={() => handleDateSelect(date)} className="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-blue-50">
                    <p className="font-semibold text-lg">{date}</p>
                    <ArrowRight size={20} className="text-gray-500"/>
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
