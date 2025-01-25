import React from "react";
import { ArrowRight } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

type MagicSectionProps = {
  id?: string;
};

export function MagicSection({ id }: MagicSectionProps) {
  const words = `We provide a wide range of Pricing Plans for different use cases`;

  return (
    <section className="relative py-24 overflow-y-auto  bg-gradient-to-b from-black via-gray-800 to-black p-4 mb-20" id={id}>
      <div className="text-center px-4 sm:px-0 max-w-7xl mx-auto mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[6rem] font-bold  leading-tight mb-4">
          <span className="bg-cosmic-drift bg-clip-text text-transparent">
            Pricing
          </span>
          {" "}Ranges
        </h2>
        <TextGenerateEffect words={words} />
      </div>
    

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <div
          className="bg-black border border-gray-800 rounded-xl p-8 text-white 
          transition-all duration-300 hover:border-blue-600 hover:scale-105 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-4">Basic</h3>
          <p className="text-gray-400 mb-6">
            Perfect for individuals and startups
          </p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-gray-400 ml-2">/month</span>
          </div>
          <ul className="mb-8 space-y-4 text-gray-300">
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />1 User
              Account
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Basic Feature Access
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Community Support
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Email Notifications
            </li>
          </ul>
          <button className="w-full py-3 bg-gray-800 hover:bg-blue-700 rounded-lg transition-colors">
            Get Started
          </button>
        </div>

        {/* Pro Plan - Highlighted */}
        <div
          className="bg-black border border-gray-800 rounded-xl p-8 text-white 
          md:-translate-y-6 shadow-2xl shadow-blue-500/20 
          scale-105 z-10 relative
          transition-all duration-300 hover:border-blue-500 hover:scale-110"
        >
          <div className="absolute inset-0 bg-blue-900/10 blur-3xl -z-10"></div>
          <h3 className="text-2xl font-bold mb-4">Pro</h3>
          <p className="text-gray-400 mb-6">
            Ideal for growing teams and businesses
          </p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$15</span>
            <span className="text-gray-400 ml-2">/month</span>
          </div>
          <ul className="mb-8 space-y-4 text-gray-300">
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />5 User
              Accounts
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Advanced Features
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Priority Email Support
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Weekly Analytics
            </li>
          </ul>
          <button className="w-full py-3 bg-gray-800 hover:bg-blue-700 rounded-lg transition-colors">
            Get Started
          </button>
        </div>

        {/* Enterprise Plan */}
        <div
          className="bg-black border border-gray-800 rounded-xl p-8 text-white 
          transition-all duration-300 hover:border-blue-600 hover:scale-105 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
          <p className="text-gray-400 mb-6">
            Custom solution for large organizations
          </p>
          <div className="mb-6">
            <span className="text-4xl font-bold">Custom</span>
          </div>
          <ul className="mb-8 space-y-4 text-gray-300">
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Unlimited User Accounts
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Full Feature Access
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              24/7 Dedicated Support
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 w-4 h-4 text-green-500" />
              Custom Integrations
            </li>
          </ul>
          <button className="w-full py-3 bg-gray-800 hover:bg-blue-700 rounded-lg transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
