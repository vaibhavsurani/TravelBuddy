// pages/signup.tsx

import { useRouter } from 'next/router';
import { useState } from 'react';

const SignupPage = () => {
  const router = useRouter();
  const { destinationId, packageId, date } = router.query;

  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber, otp }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/register?destinationId=${destinationId}&packageId=${packageId}&date=${date}&mobileNumber=${mobileNumber}`);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  if (typeof destinationId !== 'string' || typeof packageId !== 'string' || typeof date !== 'string') {
    return <div>Error: Missing required booking details.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#C2461C] mb-2 ">User Verification</h1>
        <p className="text-sm text-gray-500 mb-6 ">
          Enter your mobile number to continue with your booking.
        </p>

        {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded-md">{error}</p>}

        <form onSubmit={step === 'mobile' ? handleSendOtp : handleVerifyOtp} className="space-y-4">
          <div>
            <label htmlFor="mobile" className="block text-md font-medium text-gray-700">Phone Number</label>
            <input
              id="mobile"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={10}
              required
              placeholder="9876543210"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              disabled={step === 'otp'}
            />
            <p className="text-sm text-gray-500 mt-1">We'll send OTP (One Time Password) to this phone number to login to your account.</p>
          </div>

          {step === 'otp' && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                An OTP has been sent to <span className="font-semibold text-gray-800">{mobileNumber}</span>.
              </p>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={6}
                required
                placeholder="123456"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-[#C2461C] text-white font-normal py-2 px-3 rounded-lg hover:bg-[#C2461C]/80 transition text-md focus:outline-none focus:ring-4 focus:ring-[#E9743C]/50"
          >
            {step === 'mobile' ? 'Send OTP' : 'Verify & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;