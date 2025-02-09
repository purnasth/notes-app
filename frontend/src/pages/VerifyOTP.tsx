import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyOTP } from '../utils/api';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { email } = location.state || {};
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData('text');
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      newOtp.forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = digit;
        }
      });
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    if (!email) {
      toast.error('No email associated with this verification');
      return;
    }

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter a 6-digit OTP code');
      return;
    }

    try {
      await verifyOTP(email, otpCode);
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
      <div className="w-full max-w-md space-y-16 p-6">
        <div className="space-y-5">
          <h2 className="text-center text-2xl font-bold text-dark md:text-3xl">
            Verify Your Email Address
          </h2>
          <p className="text-center text-base text-dark/60">
            We've sent a 6-digit code to{' '}
            <strong className="text-dark">{email}</strong>. Please enter it
            below to verify your account.
          </p>
        </div>

        <div className="space-y-12 text-center">
          <div className="space-y-3">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="size-12 rounded-xl border border-dark/10 bg-white text-center text-xl outline outline-2 outline-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 md:size-14 md:text-2xl"
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleVerifyOTP}
            className="transition-200 mx-auto flex w-full items-center justify-center rounded-full bg-amber-400 px-10 py-4 text-base font-medium text-dark hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Verify Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
