import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { destinations } from '@/data/destinations';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';
import { Listbox } from '@headlessui/react';

const genderOptions = ["Male", "Female", "Other"];

const RegistrationPage = () => {
  const router = useRouter();
  const { destinationId, packageId, date } = router.query;

  const [participants, setParticipants] = useState(1);
  const [formData, setFormData] = useState([ { firstName: '', lastName: '', mobile: '', birthDate: '', gender: ''} ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);


  // Find the selected destination and package from the data
  const destination = destinations.find(d => d.id === destinationId);
  const travelPackage = destination?.packages.find(p => p.id === packageId);

  useEffect(() => {
    // Adjust the form data array based on the number of participants
    const newFormData = Array.from({ length: participants }, (_, i) => formData[i] || { firstName: '', lastName: '', mobile: '', birthDate: '', gender: '' });
    setFormData(newFormData);
  }, [participants]);

  const handleFormChange = (index: number, field: string, value: string) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [field]: value };
    setFormData(updatedFormData);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
        alert("Please accept the terms and conditions to proceed.");
        return;
    }
    console.log("Registration Data:", { destination, travelPackage, date, participants, formData });
    // Here you would handle final submission to a backend
    setIsSubmitted(true);
  };

  if (!destination || !travelPackage || !date) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
            <p>Loading booking details or invalid link...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (isSubmitted) {
    return (
       <div className="flex flex-col min-h-screen">
        <Header />
        <div className="bg-[#C2461C] py-6 h-[60vh] flex items-center -top-15 relative">
          <div className="max-w-6xl container mx-auto px-6">
              <h1 className="text-3xl font-semibold text-white">Registration</h1>
          </div>
        </div>
        <main className="flex-grow container mx-auto px-6 -mt-7 pb-12 text-center flex flex-col items-center justify-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Registration Complete!</h1>
            <p className="text-lg text-gray-600">Thank you for booking your trip to {destination.name}.</p>
            <p className="mt-2 text-gray-500">A confirmation has been sent to your primary mobile number.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 ">
      <Head>
        <title>Registration - {destination.name}</title>
      </Head>
      <Header />
      
      {/* Orange Header Bar */}
      <div className="bg-[#C2461C] py-6 h-[60vh] flex items-center -top-15 relative">
          <div className="max-w-6xl container mx-auto px-6">
              <h1 className="text-3xl font-semibold text-white">Registration</h1>
          </div>
      </div>

      <main className="flex-grow container mx-auto px-6 pb-12">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            
            {/* Booking Summary Section */}
            <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">{destination.name}</h2>
                <p className="text-gray-500 mt-1">{travelPackage.departureCity} ({travelPackage.name})</p>
                <p className="text-gray-500">{date as string} ({travelPackage.duration})</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8">
                
                {/* Participant Selection */}
                <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Select Participants</h3>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => setParticipants(num)}
                                className={`w-10 h-10 rounded-md font-semibold text-lg transition-colors border ${
                                    participants === num 
                                    ? 'bg-[#C2461C] text-white border-[#C2461C]' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
                                }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Participant Forms */}
                {formData.map((participant, index) => (
                    <div key={index} className="mb-8 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-orange-600 mb-6">Participant {index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                            {/* First Name */}
                            <div>
                                <label htmlFor={`firstName-${index}`} className="block text-sm font-medium text-gray-700">First Name</label>
                                <input id={`firstName-${index}`} type="text" value={participant.firstName} onChange={e => handleFormChange(index, 'firstName', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" required/>
                            </div>
                            {/* Last Name */}
                            <div>
                                <label htmlFor={`lastName-${index}`} className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input id={`lastName-${index}`} type="text" value={participant.lastName} onChange={e => handleFormChange(index, 'lastName', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" required/>
                            </div>
                            {/* Mobile */}
                            <div className="md:col-span-2">
                                <label htmlFor={`mobile-${index}`} className="block text-sm font-medium text-gray-700">Mobile</label>
                                <input id={`mobile-${index}`} type="tel" value={participant.mobile} onChange={e => handleFormChange(index, 'mobile', e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" required/>
                            </div>
                            {/* Birth Date */}
                            <div className="relative">
                                <label htmlFor={`birthDate-${index}`} className="block text-sm font-medium text-gray-700">Birth Date</label>
                                <Calendar className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                                <input id={`birthDate-${index}`} type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} placeholder="Select Date" value={participant.birthDate} onChange={e => handleFormChange(index, 'birthDate', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" required/>
                            </div>
                            {/* Gender */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">
                                    Gender
                                </label>

                                <Listbox
                                    value={participant.gender}
                                    onChange={(val) => handleFormChange(index, "gender", val)}
                                >
                                    <div className="relative mt-1">
                                    <Listbox.Button className="w-full border border-gray-300 rounded-md py-2 px-3 text-left bg-white focus:ring-1 focus:ring-orange-500">
                                        {participant.gender || "Select Gender"}
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-10">
                                        {genderOptions.map((gender, i) => (
                                        <Listbox.Option
                                            key={i}
                                            value={gender}
                                            className={({ active }) =>
                                            `cursor-pointer select-none py-2 px-3 ${
                                                active ? "bg-[#C2461C] text-white" : "text-gray-700"
                                            }`
                                            }
                                        >
                                            {gender}
                                        </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                    </div>
                                </Listbox>
                                </div>

                        </div>
                    </div>
                ))}
                
                {/* Submission Section */}
                <div className="mt-6 border-t border-gray-200 pt-8">
                    <div className="flex items-center mb-6">
                        <input id="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                        <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">
                            I accept participation terms & conditions.
                            <a href="#" className="ml-1 text-orange-600 hover:underline font-medium">(View)</a>
                        </label>
                    </div>
                    <button type="submit" className="w-auto bg-[#C2461C] hover:bg-orange-700 text-white font-semibold py-2 px-3 rounded-lg text-base transition-colors flex items-center justify-center">
                        Register
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;