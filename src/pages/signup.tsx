// pages/signup.tsx

import { useRouter } from 'next/router';
import { useState } from 'react';

const SignupPage = () => {
  const router = useRouter();
  const { destinationId, packageId, date } = router.query;

  // State to manage the steps of the flow
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  
  // State for mobile number and OTP
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await res.json();
      if (data.success) {
        setStep('otp');
      } else {
        setError(data.error || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, otp }),
      });

      const data = await res.json();
      if (data.success) {
        // OTP is correct, proceed to the registration form
        router.push(`/register?destinationId=${destinationId}&packageId=${packageId}&date=${date}&mobileNumber=${mobileNumber}`);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  // Add a type guard to ensure query parameters are strings
  if (typeof destinationId !== 'string' || typeof packageId !== 'string' || typeof date !== 'string') {
    return <div>Error: Missing required booking details.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">User Verification</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your mobile number and OTP to continue with your booking.
        </p>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {/* This form is always visible */}
        <form onSubmit={step === 'mobile' ? handleSendOtp : handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              maxLength={10}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={step === 'otp'} // Disable after OTP is sent
            />
          </div>

          {/* OTP field is conditionally rendered */}
          {step === 'otp' && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                An OTP has been sent to **{mobileNumber}**.
              </p>
              <label className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {step === 'mobile' ? 'Send OTP' : 'Verify & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;