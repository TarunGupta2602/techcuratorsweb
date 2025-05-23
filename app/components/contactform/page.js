"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ContactForm = () => {
  const services = [
    "Content Writing",
    "Design Services",
    "Video Animation",
    "Translation",
    "Blog writing",
    "SOP Content Writing",
    "Voiceover",
    "SEO Content Writing",
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectDetails, setProjectDetails] = useState('');

  const handleCheckboxChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      name,
      email,
      project_details: projectDetails,
      services: selectedServices,
    };

    try {
      // Insert data into the contactdata table
      const { data, error } = await supabase
        .from('contactdata')
        .insert([formData]);

      if (error) {
        console.error('Error inserting data:', error);
        alert('Failed to submit the form. Please try again.');
        return;
      }

      console.log('Data inserted successfully:', data);
      alert('Form submitted successfully!');

      // Reset form fields after successful submission
      setName('');
      setEmail('');
      setProjectDetails('');
      setSelectedServices([]);
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 md:mt-22 rounded-xl border border-[#d9e9dd] flex flex-col md:flex-row overflow-hidden">
      {/* Left Panel */}
      <div className="bg-[#D9E9DD] md:w-1/3 p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-8">Reach out to Us at</h2>
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 mr-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:+917678144482" className="text-gray-700 text-base">+91 7678144482</a>
          </div>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:contact@transcurators.com" className="text-gray-700 text-base">contact@transcurators.com</a>
          </div>
        </div>
       <div className="flex mt-16 space-x-6">
        
          <a href="https://www.instagram.com/transcurators/?hl=en" className="text-gray-700 hover:text-pink-500 transition">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/transcurators/" className="text-gray-700 hover:text-blue-700 transition">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right Panel */}
      <form className="md:w-2/3 p-8 flex flex-col space-y-5 text-[#969696]" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-1/2 border border-[#B3D3BB] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 shadow-sm text-[#969696] placeholder-[#969696]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-1/2 border border-[#B3D3BB] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 shadow-sm text-[#969696] placeholder-[#969696]"
          />
        </div>
        <textarea
          placeholder="About the Project"
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          className="w-full border border-[#B3D3BB] rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-200 shadow-sm text-[#969696] placeholder-[#969696]"
        />
        <div className="border border-[#B3D3BB] rounded-lg p-4 shadow-sm">
          <span className="block mb-3 text-[#969696]">Our Help</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {services.map((service) => (
              <label key={service} className="flex items-center space-x-2 cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedServices.includes(service) ? 'bg-[#B3D3BB] border-[#B3D3BB]' : 'border-[#B3D3BB]'}`}>
                    {selectedServices.includes(service) && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="white">
                        <path d="M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.41L7 14.17z" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-[#969696]">{service}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#B3D3BB] text-gray-700 px-6 py-2 rounded-xl border border-[#B3D3BB] hover:bg-[#B3D3BB] transition"
          >
            Let's get started
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;