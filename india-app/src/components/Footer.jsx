import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBalanceScale,
  FaGavel,
  FaRegFileAlt,
  FaShieldAlt,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-8">
      <div className="container mx-auto px-4 space-y-6">
        
        {/* Top Links Section */}
        <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm font-medium">
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaPhoneAlt /> <span>Contact Us</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaMapMarkerAlt /> <span>Locate Us</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaBalanceScale /> <span>Rates & Charges</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaGavel /> <span>Regulatory Policies</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaRegFileAlt /> <span>Regulatory Disclosures</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaShieldAlt /> <span>Secure Usage Guidelines</span>
            </a>
          </li>
        </ul>

        {/* Divider */}
        <div className="border-t border-blue-500"></div>

        {/* Bottom Navigation */}
        <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm">
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaHome /> <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaInfoCircle /> <span>About</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-gray-200">
              <FaEnvelope /> <span>Contact</span>
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-gray-200">
          Copyright ©2021-2025 <span className="font-semibold">YES BANK</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
