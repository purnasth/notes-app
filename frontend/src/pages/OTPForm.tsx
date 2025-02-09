import { useState } from 'react';
import axios from 'axios';

const OTPForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/auth/send-otp', { email });
      alert('OTP sent to your email.');
      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Error sending OTP');
      } else {
        alert('Error sending OTP');
      }
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post('http://localhost:5000/auth/verify-otp', { email, otp });
      alert('OTP verified successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Invalid OTP');
      } else {
        alert('Invalid OTP');
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-40 bg-white rounded-lg shadow-lg">
      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 w-full" onClick={sendOtp}>
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full mb-2"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="bg-green-500 text-white p-2 w-full" onClick={verifyOtp}>
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default OTPForm;
