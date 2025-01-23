import React from 'react';
import { ArrowRight } from 'lucide-react';

export function MagicSection() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Save your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">time</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Develop your project without the hassle of setting up infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-900 rounded-lg p-6 flex flex-col justify-between">
            <div className="aspect-video bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
              <img 
                src="/api/placeholder/600/400" 
                alt="Placeholder" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Seamless Development Environment</h3>
              <p className="text-gray-400 mb-4">
              Develop your project without the hassle of setting up infrastructure.
              </p>
              <button className="flex items-center text-white hover:text-blue-400 transition-colors">
                Learn More <ArrowRight className="ml-2" />
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 flex flex-col justify-between">
            <div className="aspect-video bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
              <img 
                src="/api/placeholder/600/400" 
                alt="Placeholder" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">IDE </h3>
              <p className="text-gray-400 mb-4">
              Develop your project without the hassle of setting up infrastructure.
              </p>
              <button className="flex items-center text-white hover:text-blue-400 transition-colors">
                Explore CLI <ArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}