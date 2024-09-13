import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-teal-600">
      <div className="flex-grow flex flex-col justify-between">
        <header className="p-4 flex justify-center">
          <img src="/api/placeholder/150/50" alt="LandVista Logo" className="h-12" />
        </header>
        
        <svg className="w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50L60 45.8333C120 41.6667 240 33.3333 360 29.1667C480 25 600 25 720 33.3333C840 41.6667 960 58.3333 1080 62.5C1200 66.6667 1320 58.3333 1380 54.1667L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
        </svg>
        
      </div>
       
      <main className="flex-grow flex flex-col md:flex-row justify-center items-center text-white px-4 bg-white space-y-8 md:space-x-16 md:space-y-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-custom-orange text-4xl md:text-5xl">WELCOME </span>
          <span className="text-teal-600 text-4xl md:text-5xl">TO </span>
          <span className="text-custom-orange text-4xl md:text-5xl">LANDVISTA</span>
        </h1>

        <div className="text-center">
          <p className="text-sm md:text-lg max-w-2xl mb-8 text-teal-600 mx-auto text-justify">
            LandVista simplifies understanding flood risks by combining advanced weather data with detailed land maps. We analyze factors like rainfall, elevation, and soil types to predict potential flooding, focusing specifically on Nairobi. With our insights, you can confidently assess the flood risk of any property, making informed decisions whether you're buying, selling, or developing land. Discover how LandVista can safeguard your investments today!
          </p>

          <Link href="/map" className="text-xl md:text-2xl px-6 py-3 bg-custom-orange text-white rounded-md text-center hover:bg-[#D77A54] transition-colors">
            Discover
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
