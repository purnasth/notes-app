import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyOTP } from '../utils/api';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const { email } = location.state || {};

  const handleVerifyOTP = async () => {
    if (!email) {
      toast.error('No email associated with this verification');
      return;
    }

    try {
      await verifyOTP(email, otp);
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error;
      switch (errorMessage) {
        case 'Invalid OTP':
          toast.error('Invalid OTP code');
          break;
        case 'OTP expired':
          toast.error('OTP has expired. Please request a new one');
          break;
        case 'Registration session expired':
          toast.error('Registration session expired. Please register again');
          navigate('/register');
          break;
        default:
          toast.error('Verification failed');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Verify OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 6-digit code to {email}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 text-lg focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            onClick={handleVerifyOTP}
            className="flex w-full justify-center rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Verify Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;