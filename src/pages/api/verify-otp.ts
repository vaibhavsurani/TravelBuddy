import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

// Use a non-null assertion or type casting to tell TypeScript that these are strings.
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID as string;

// Add this check to ensure environment variables are loaded for production safety.
if (!accountSid || !authToken || !verifySid) {
  throw new Error('TWILIO credentials are not set in environment variables.');
}

const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { mobileNumber, otp } = req.body;

  try {
    const verificationCheck = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: `+91${mobileNumber}`,
      code: otp,
    });

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, error: 'Failed to verify OTP' });
  }
}