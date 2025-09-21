import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface BookingModalProps {
  destinationName: string;
  availableDates: string[]; // This prop will receive the dates
  onClose: () => void;
}

const BookingModal = ({ destinationName, availableDates, onClose }: BookingModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // State to hold the selected date from the dropdown
  const [selectedDate, setSelectedDate] = useState(availableDates[0] || '');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      destination: destinationName,
      name,
      email,
      date: selectedDate,
      message,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out">
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
          
          {isSubmitted ? (
             <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
                <p className="text-gray-700 text-lg">Your booking request for {destinationName} has been received.</p>
                <p className="text-gray-600 mt-2">We will contact you at {email} shortly.</p>
                <button 
                  onClick={onClose}
                  className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Trip</h2>
              <p className="text-gray-600 mb-6">You've chosen <span className="font-semibold text-blue-600">{destinationName}</span>. Please select a travel date.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                
                {/* This is the new dropdown for selecting a date */}
                <div>
                  <label htmlFor="travel-date" className="block text-sm font-medium text-gray-700 mb-1">Select Travel Date</label>
                  <select 
                    id="travel-date" 
                    value={selectedDate} 
                    onChange={e => setSelectedDate(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  >
                    {availableDates.map(date => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Send size={18} />
                    Submit Request
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

