import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
  return (
    <div className="bg-harvest-cream min-h-[70vh] flex items-center justify-center p-4">
      <Helmet>
        <title>Page Not Found | Harvest Farm Machineries</title>
      </Helmet>
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100">
        <h1 className="text-8xl font-black text-harvest-green mb-4">404</h1>
        <h2 className="text-3xl font-black text-harvest-brown mb-4 tracking-tight">This page has gone to the shamba!</h2>
        <p className="text-gray-600 mb-8 font-medium">
          The machine or page you're looking for doesn't seem to exist. It might have been moved or removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-harvest-green text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-colors shadow-lg hover:-translate-y-1">
            Back to Home
          </Link>
          <Link to="/shop" className="bg-white text-harvest-brown border-2 border-harvest-brown px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-harvest-brown hover:text-white transition-colors">
            Shop Machinery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
