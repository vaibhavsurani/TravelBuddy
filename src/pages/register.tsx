import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { destinations } from '@/data/destinations';
import { useEffect, useState } from 'react';

const RegistrationPage = () => {
  const router = useRouter();
  const { destinationId, packageId, date } = router.query;

  const [participants, setParticipants] = useState(1);
  const [formData, setFormData] = useState([ { firstName: '', lastName: '', mobile: '', birthDate: '', gender: ''} ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    console.log("Registration Data:", { destination, travelPackage, date, participants, formData });
    // Here you would handle OTP verification and final submission to a backend
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
        <main className="flex-grow container mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Registration Complete!</h1>
            <p className="text-xl text-gray-700">Thank you for booking your trip to {destination.name}.</p>
            <p className="mt-2 text-gray-600">A confirmation has been sent to your mobile number.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Register for {destination.name} - TravelBuddy</title>
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
            <div className="bg-orange-500 text-white p-6 rounded-t-lg">
                <h1 className="text-3xl font-bold">{destination.name} Calling</h1>
            </div>
            <div className="bg-white p-6 border-b">
                <p className="font-semibold">{travelPackage.departureCity} ({travelPackage.name})</p>
                <p className="text-gray-600">{date as string} ({travelPackage.duration})</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b-lg shadow-lg">
                <div className="mb-6">
                    <h3 className="font-bold mb-3">Select Participants</h3>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => setParticipants(num)}
                                className={`w-10 h-10 rounded font-bold transition-colors ${participants === num ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {formData.map((participant, index) => (
                    <div key={index} className="mb-8 border-t pt-6">
                        <h4 className="font-bold text-orange-600 mb-4">Participant {index + 1}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" value={participant.firstName} onChange={e => handleFormChange(index, 'firstName', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" value={participant.lastName} onChange={e => handleFormChange(index, 'lastName', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                                <input type="tel" value={participant.mobile} onChange={e => handleFormChange(index, 'mobile', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                                <input type="date" value={participant.birthDate} onChange={e => handleFormChange(index, 'birthDate', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select value={participant.gender} onChange={e => handleFormChange(index, 'gender', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white" required>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className="mt-6 border-t pt-6">
                     <div className="flex items-center mb-6">
                        <input id="terms" type="checkbox" className="h-4 w-4 text-orange-600 border-gray-300 rounded" required/>
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            I accept participation terms & conditions.
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors">
                        Register & Proceed
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
