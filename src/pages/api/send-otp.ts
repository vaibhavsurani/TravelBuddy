// pages/api/send-otp.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

// Use 'as string' to explicitly cast the variable, ensuring its type is 'string'
// or use the non-null assertion operator '!'.
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID as string;

const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { mobileNumber } = req.body;

  try {
    const verification = await client.verify.v2.services(verifySid).verifications.create({
      to: `+91${mobileNumber}`,
      channel: 'sms',
    });

    res.status(200).json({ success: true, status: verification.status });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }
}